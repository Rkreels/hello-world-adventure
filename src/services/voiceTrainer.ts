
export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  steps: TrainingStep[];
}

export interface TrainingStep {
  id: string;
  text: string;
  targetElement?: string;
  action?: 'click' | 'hover' | 'focus' | 'type';
  duration?: number;
  cursorPosition?: { x: number; y: number };
}

interface VoiceSettings {
  volume: number;
  speechRate: number;
}

class VoiceTrainerService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying = false;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private lastGuidedElement: string | null = null;
  private currentPage: string = '';
  private elementCache: Map<string, string> = new Map();
  private retryCount = 0;
  private maxRetries = 3;
  private settings: VoiceSettings = { volume: 0.9, speechRate: 1.0 };
  private guidanceQueue: string[] = [];
  private isProcessingQueue = false;

  constructor() {
    this.initializeVoice();
    this.currentPage = window.location.pathname;
  }

  private initializeVoice() {
    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      
      const preferredVoiceNames = [
        'Microsoft Aria Online (Natural) - English (United States)',
        'Microsoft Jenny Online (Natural) - English (United States)',
        'Google UK English Female',
        'Google US English',
        'Microsoft Zira - English (United States)',
        'Samantha',
        'Karen',
        'Alex'
      ];

      for (const voiceName of preferredVoiceNames) {
        const voice = voices.find(v => 
          v.name.includes(voiceName.split(' ')[1]) || 
          v.name === voiceName ||
          v.name.toLowerCase().includes(voiceName.toLowerCase())
        );
        if (voice) {
          this.preferredVoice = voice;
          break;
        }
      }

      if (!this.preferredVoice) {
        this.preferredVoice = voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
      }
    };

    if (speechSynthesis.getVoices().length > 0) {
      setVoice();
    } else {
      speechSynthesis.addEventListener('voiceschanged', setVoice);
    }
  }

  updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings };
  }

  private async processGuidanceQueue() {
    if (this.isProcessingQueue || this.guidanceQueue.length === 0) return;
    
    this.isProcessingQueue = true;
    const guidance = this.guidanceQueue.shift();
    
    if (guidance) {
      await this.speak(guidance);
    }
    
    this.isProcessingQueue = false;
    
    // Process next item in queue
    if (this.guidanceQueue.length > 0) {
      setTimeout(() => this.processGuidanceQueue(), 100);
    }
  }

  private queueGuidance(text: string) {
    this.guidanceQueue = [text]; // Replace queue with new guidance for immediate response
    this.processGuidanceQueue();
  }

  async speak(text: string): Promise<void> {
    this.stopCurrentSpeech();

    return new Promise((resolve, reject) => {
      try {
        if (!('speechSynthesis' in window)) {
          console.warn('Speech synthesis not supported');
          resolve();
          return;
        }

        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        if (this.preferredVoice) {
          this.currentUtterance.voice = this.preferredVoice;
        }
        
        this.currentUtterance.rate = this.settings.speechRate;
        this.currentUtterance.pitch = 1.0;
        this.currentUtterance.volume = this.settings.volume;

        this.currentUtterance.onstart = () => {
          this.isPlaying = true;
          this.retryCount = 0;
        };

        this.currentUtterance.onend = () => {
          this.isPlaying = false;
          this.currentUtterance = null;
          resolve();
        };

        this.currentUtterance.onerror = (event) => {
          this.isPlaying = false;
          this.currentUtterance = null;
          
          console.warn('Speech synthesis error:', event);
          
          if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            setTimeout(() => {
              this.speak(text).then(resolve).catch(reject);
            }, 500);
          } else {
            console.error('Speech synthesis failed after retries');
            resolve();
          }
        };

        speechSynthesis.speak(this.currentUtterance);
      } catch (error) {
        this.isPlaying = false;
        console.error('Speech synthesis setup error:', error);
        resolve();
      }
    });
  }

  stopCurrentSpeech() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
      this.guidanceQueue = [];
    }
  }

  getElementInfo(element: HTMLElement): string | null {
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const id = element.id;
    const text = element.textContent?.trim().substring(0, 50) || '';
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const dataTestId = element.getAttribute('data-testid');
    
    return `${tagName}-${id || dataTestId || className.split(' ')[0] || role || text.replace(/\s+/g, '-')}`;
  }

  async guideElement(element: HTMLElement) {
    const elementInfo = this.getElementInfo(element);
    
    if (elementInfo === this.lastGuidedElement) return;
    
    this.lastGuidedElement = elementInfo;
    
    const guidance = this.getElementGuidance(element);
    if (guidance) {
      this.queueGuidance(guidance);
    }
  }

  private getElementGuidance(element: HTMLElement): string | null {
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const text = element.textContent?.trim();
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const placeholder = element.getAttribute('placeholder');
    const type = element.getAttribute('type');
    const dataTestId = element.getAttribute('data-testid');
    const currentPath = window.location.pathname;

    // Enhanced guidance for specific order management components
    if (currentPath.includes('/admin/order')) {
      return this.getOrderManagementGuidance(element, dataTestId, className, text, tagName);
    }

    // Enhanced guidance for modals and popups
    if (element.closest('[role="dialog"]') || element.closest('.modal') || className.includes('modal')) {
      return this.getModalGuidance(element);
    }

    // Enhanced guidance for dropdowns
    if (element.closest('[role="menu"]') || element.closest('.dropdown') || className.includes('dropdown')) {
      return this.getDropdownGuidance(element);
    }

    // Enhanced guidance for sidebar elements
    if (element.closest('.sidebar') || element.closest('[data-sidebar]') || className.includes('sidebar')) {
      return this.getSidebarGuidance(element);
    }

    // Enhanced dashboard guidance
    if (currentPath.includes('/admin/dashboard')) {
      return this.getDashboardGuidance(element, dataTestId, className, text);
    }

    // Enhanced form guidance
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
      return this.getFormGuidance(element, type, placeholder);
    }

    // Enhanced button guidance
    if (tagName === 'button' || role === 'button') {
      return this.getButtonGuidance(element, text);
    }

    // Enhanced link guidance
    if (tagName === 'a' || role === 'link') {
      return this.getLinkGuidance(element, text);
    }

    return null;
  }

  private getOrderManagementGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Specific guidance for order management components
    if (dataTestId === 'order-management') {
      return 'Order Management System - Comprehensive order processing hub where you can view, filter, search, and manage all customer orders. Track order status, update shipping information, and handle customer communications efficiently.';
    }

    if (dataTestId === 'order-status-filter') {
      return 'Order Status Filter - Select different order statuses to filter the order list. Options include All Orders, Pending (awaiting processing), Processing (being prepared), Shipped (in transit), Delivered (completed), and Cancelled orders.';
    }

    if (dataTestId === 'order-search') {
      return 'Order Search - Enter order ID or customer name to quickly find specific orders. Search is real-time and filters results as you type for efficient order lookup.';
    }

    if (dataTestId === 'orders-table-card') {
      return 'Orders Table - Complete list of orders with detailed information including order ID, customer details, amount, date, current status, and tracking information. Click on any order to view full details or update status.';
    }

    if (dataTestId === 'view-order-btn') {
      return 'View Order Details - Click to open detailed order information including customer details, order items, shipping address, payment information, and order timeline for comprehensive order management.';
    }

    if (dataTestId === 'edit-order-btn') {
      return 'Edit Order - Modify order details, update status, add tracking information, or make changes to order items. This opens the order editor with full editing capabilities.';
    }

    if (dataTestId === 'order-detail-dialog') {
      return 'Order Detail Modal - Complete order information view with customer details, order items, shipping information, payment status, and order management tools. Use the status manager to update order progress.';
    }

    if (dataTestId === 'order-info-card') {
      return 'Order Information Card - displays essential order details including order ID, customer name, order date, total amount, current status, and tracking number if available.';
    }

    if (dataTestId === 'order-items-card') {
      return 'Order Items List - Complete list of products in this order with quantities, prices, and item details. Review what the customer ordered before processing or shipping.';
    }

    if (dataTestId === 'order-status-manager') {
      return 'Order Status Manager - Advanced tool for updating order status, adding tracking numbers, and managing order progression. Select new status, enter shipping details, and add notes for complete order management.';
    }

    // Table-specific guidance
    if (element.closest('table')) {
      if (tagName === 'th') {
        return `Table Header: ${text} - Click to sort orders by this column. Use sorting to organize orders by ${text?.toLowerCase()} for better order management and analysis.`;
      }
      if (tagName === 'td') {
        const headerIndex = Array.from(element.parentElement?.children || []).indexOf(element);
        const headers = ['Order ID', 'Customer', 'Amount', 'Date', 'Status', 'Tracking', 'Actions'];
        const header = headers[headerIndex];
        return `${header} cell for this order - ${this.getTableCellGuidance(header, text)}`;
      }
    }

    // Status badge guidance
    if (className.includes('badge') || element.closest('.badge')) {
      return `Order Status: ${text} - ${this.getStatusGuidance(text)}`;
    }

    // Tab navigation guidance
    if (element.closest('[role="tablist"]') || className.includes('tab')) {
      return `Order Filter Tab: ${text} - Switch to view ${text?.toLowerCase()} orders only. This filters the order list to show orders in this specific status category.`;
    }

    return null;
  }

  private getTableCellGuidance(header: string, text: string | undefined): string {
    switch (header) {
      case 'Order ID':
        return `Order ${text} - Unique identifier for tracking and referencing this specific customer order.`;
      case 'Customer':
        return `Customer: ${text} - Order placed by this customer. Click to view full customer details and order history.`;
      case 'Amount':
        return `Order Total: ${text} - Complete order value including items, taxes, and shipping costs.`;
      case 'Date':
        return `Order Date: ${text} - When this order was placed by the customer.`;
      case 'Status':
        return `Current Status - Order is currently ${text}. Status indicates where the order is in the fulfillment process.`;
      case 'Tracking':
        return text === '-' ? 'No tracking number assigned yet. Add tracking when order ships.' : `Tracking Number: ${text} - Customer can use this to track shipment progress.`;
      case 'Actions':
        return 'Order Actions - View detailed order information or edit order details and status.';
      default:
        return 'Order information for management and processing.';
    }
  }

  private getStatusGuidance(status: string | undefined): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Order is awaiting processing. Review order details and begin preparation for fulfillment.';
      case 'processing':
        return 'Order is being prepared for shipment. Items are being picked, packed, and prepared for shipping.';
      case 'shipped':
        return 'Order has been shipped and is in transit to the customer. Tracking information should be available.';
      case 'delivered':
        return 'Order has been successfully delivered to the customer. Order is complete.';
      case 'cancelled':
        return 'Order has been cancelled and will not be fulfilled. May require refund processing.';
      default:
        return 'Current order status in the fulfillment process.';
    }
  }

  private getModalGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.tagName.toLowerCase() === 'button') {
      if (text?.toLowerCase().includes('close') || text?.toLowerCase().includes('cancel')) {
        return 'Close Dialog - Click to dismiss this modal and return to the order list without saving changes.';
      }
      if (text?.toLowerCase().includes('save') || text?.toLowerCase().includes('confirm') || text?.toLowerCase().includes('update')) {
        return 'Save Changes - Click to confirm and save all modifications made to this order.';
      }
    }
    return 'Order Detail Modal - Complete order management interface with customer information, order items, and status management tools. Use Tab to navigate between sections.';
  }

  private getDropdownGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.getAttribute('role') === 'menuitem') {
      return `Dropdown Option: ${text} - Click to select this option and apply the filter or setting.`;
    }
    return 'Dropdown Menu - Select from available options to filter orders or change settings. Use arrow keys to navigate options or click to select.';
  }

  private getSidebarGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.tagName.toLowerCase() === 'a' || element.getAttribute('role') === 'button') {
      if (text?.toLowerCase().includes('order')) {
        return `Order Management Navigation - Click to access the order management system for viewing, processing, and tracking all customer orders.`;
      }
      return `Admin Navigation: ${text} - Click to navigate to the ${text?.toLowerCase()} section of the administration panel.`;
    }
    return 'Administrative Sidebar - Main navigation for accessing different sections of the admin panel including orders, products, customers, and reports.';
  }

  private getDashboardGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined): string | null {
    if (dataTestId === 'stats-cards' || className.includes('stats') || element.closest('[data-testid="stats-cards"]')) {
      return 'Business Dashboard Statistics - Real-time overview of key performance metrics including total revenue, order count, customer numbers, and product inventory. Monitor business health and growth trends.';
    }
    
    if (dataTestId === 'sales-chart' || className.includes('chart') || element.closest('[data-testid="sales-chart"]')) {
      return 'Sales Analytics Chart - Visual representation of revenue trends, sales patterns, and business performance over time. Analyze peak periods and growth opportunities for strategic planning.';
    }
    
    if (dataTestId === 'quick-actions' || element.closest('[data-testid="quick-actions"]')) {
      return 'Quick Actions Panel - Immediate access to frequently used administrative tasks including adding products, viewing reports, managing customers, and accessing system settings.';
    }
    
    if (dataTestId === 'low-stock-alerts' || element.closest('[data-testid="low-stock-alerts"]')) {
      return 'Inventory Alert System - Monitor products with low stock levels to prevent stockouts. Receive notifications when items fall below threshold levels and take immediate restocking action.';
    }

    if (text && element.tagName.toLowerCase() === 'button') {
      return this.getDashboardButtonGuidance(text.toLowerCase());
    }

    return null;
  }

  private getDashboardButtonGuidance(buttonText: string): string | null {
    if (buttonText.includes('add product')) {
      return 'Add New Product - Create new inventory items with comprehensive details including descriptions, pricing, images, and category assignments for your product catalog.';
    }
    if (buttonText.includes('view reports')) {
      return 'Business Reports - Access detailed analytics and reports including sales performance, customer insights, inventory reports, and financial summaries for data-driven decisions.';
    }
    if (buttonText.includes('restock')) {
      return 'Restock Inventory - Update stock levels for low-inventory items. Enter new quantities to maintain adequate supply and prevent customer disappointment.';
    }
    if (buttonText.includes('manage orders')) {
      return 'Order Management - Access the complete order processing system to view, update, and manage all customer orders from placement to delivery.';
    }
    return null;
  }

  private getFormGuidance(element: HTMLElement, type: string | null, placeholder: string | null): string {
    if (type === 'email') {
      return 'Email Address Field - Enter a valid email address for account access, notifications, or customer communications. Format: example@domain.com';
    }
    if (type === 'password') {
      return 'Password Field - Enter your secure password for account authentication. Use strong passwords with letters, numbers, and special characters.';
    }
    if (type === 'search') {
      return 'Search Field - Enter keywords to find specific orders, products, or customers. Search results update in real-time as you type.';
    }
    if (type === 'number') {
      return 'Numeric Input - Enter numerical values such as quantities, prices, or tracking numbers. Use number keys for accurate data entry.';
    }
    if (placeholder) {
      return `Input Field: ${placeholder} - Enter the required ${placeholder.toLowerCase()} information to proceed with the form submission.`;
    }
    return 'Form Input Field - Enter the required information in the correct format to proceed with your request.';
  }

  private getButtonGuidance(element: HTMLElement, text: string | undefined): string {
    if (!text) return 'Interactive Button - Click to perform the associated action or navigate to the next step.';
    
    const buttonText = text.toLowerCase();
    if (buttonText.includes('save') || buttonText.includes('submit') || buttonText.includes('update')) {
      return `Save Changes - Click to store all modifications and apply the updates to the system. Ensure all required fields are completed.`;
    }
    if (buttonText.includes('cancel') || buttonText.includes('close')) {
      return 'Cancel Action - Click to dismiss changes and return to the previous view without saving modifications.';
    }
    if (buttonText.includes('delete') || buttonText.includes('remove')) {
      return 'Delete Action - Click to permanently remove this item. Warning: This action cannot be undone. Confirm before proceeding.';
    }
    if (buttonText.includes('edit') || buttonText.includes('modify')) {
      return 'Edit Mode - Click to enable editing of existing information with full modification capabilities.';
    }
    if (buttonText.includes('view') || buttonText.includes('details')) {
      return 'View Details - Click to access comprehensive information and detailed view of this item.';
    }
    if (buttonText.includes('filter')) {
      return 'Apply Filter - Click to filter results based on selected criteria for more focused data viewing.';
    }
    return `${text} - Click to ${buttonText}. This action will ${this.getActionDescription(buttonText)}.`;
  }

  private getActionDescription(action: string): string {
    if (action.includes('process')) return 'begin processing the selected items';
    if (action.includes('ship')) return 'mark items as shipped and update tracking';
    if (action.includes('confirm')) return 'confirm and execute the pending action';
    if (action.includes('refresh')) return 'reload the current data and update the display';
    return 'perform the requested operation';
  }

  private getLinkGuidance(element: HTMLElement, text: string | undefined): string {
    if (!text) return 'Navigation Link - Click to navigate to another page or section of the application.';
    
    const linkText = text.toLowerCase();
    if (linkText.includes('order')) {
      return `Order Navigation: ${text} - Access order-related functionality including viewing, processing, and managing customer orders.`;
    }
    if (linkText.includes('customer')) {
      return `Customer Management: ${text} - Navigate to customer information, profiles, and relationship management tools.`;
    }
    if (linkText.includes('product')) {
      return `Product Management: ${text} - Access product catalog, inventory, and product information management.`;
    }
    return `Navigation: ${text} - Click to navigate to the ${linkText} section with relevant tools and information.`;
  }

  async handleElementClick(element: HTMLElement) {
    const guidance = this.getClickGuidance(element);
    if (guidance) {
      setTimeout(() => this.queueGuidance(guidance), 300);
    }
  }

  private getClickGuidance(element: HTMLElement): string | null {
    const text = element.textContent?.trim();
    const buttonText = text?.toLowerCase() || '';
    const dataTestId = element.getAttribute('data-testid');
    
    // Specific click feedback for order management
    if (dataTestId?.includes('order')) {
      if (dataTestId === 'view-order-btn') {
        return 'Order details opened successfully. Review customer information, order items, and use the status manager to update order progress.';
      }
      if (dataTestId === 'edit-order-btn') {
        return 'Order editor activated. Modify order details, update status, or add tracking information as needed.';
      }
    }
    
    if (buttonText.includes('restock')) {
      return 'Inventory restocking initiated. Stock levels updated successfully and low stock alert resolved.';
    }
    if (buttonText.includes('save') || buttonText.includes('submit') || buttonText.includes('update')) {
      return 'Changes saved successfully. All modifications have been stored and applied to the system.';
    }
    if (buttonText.includes('delete') || buttonText.includes('remove')) {
      return 'Item deleted successfully. The selected item has been permanently removed from the system.';
    }
    if (buttonText.includes('filter')) {
      return 'Filter applied successfully. Results updated to show items matching your selected criteria.';
    }
    if (buttonText.includes('search')) {
      return 'Search executed. Results displayed based on your search terms.';
    }
    
    return null;
  }

  async handlePageChange() {
    const newPage = window.location.pathname;
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.lastGuidedElement = null;
      this.elementCache.clear();
      this.guidanceQueue = [];
      
      this.stopCurrentSpeech();
      
      setTimeout(() => {
        this.initializePageGuidance();
      }, 200);
    }
  }

  async initializePageGuidance() {
    const page = window.location.pathname;
    const pageGuidance = this.getPageGuidance(page);
    
    if (pageGuidance) {
      this.queueGuidance(pageGuidance);
    }
  }

  private getPageGuidance(path: string): string | null {
    if (path.includes('/admin/dashboard')) {
      return 'Administrative Dashboard - Central command center for business management. Monitor key performance metrics, analyze sales trends, access quick action shortcuts, and review critical inventory alerts for comprehensive business oversight.';
    }
    if (path.includes('/admin/order')) {
      return 'Order Management System - Complete order processing hub for managing customer orders from placement to delivery. Filter orders by status, search for specific orders, view detailed order information, update order status, add tracking numbers, and manage the entire order fulfillment process.';
    }
    if (path.includes('/admin/products')) {
      return 'Product Management Center - Comprehensive product catalog management including adding new products, updating existing items, managing inventory levels, organizing categories, and maintaining product information for your store.';
    }
    if (path.includes('/admin/customers')) {
      return 'Customer Management System - Complete customer relationship management including customer profiles, order history, contact information, and customer analytics for building strong customer relationships.';
    }
    if (path.includes('/admin/reports')) {
      return 'Business Analytics and Reports - Detailed business intelligence including sales reports, customer analytics, inventory reports, and financial summaries for data-driven business decisions.';
    }
    
    return 'Administration Panel - Professional business management system with comprehensive tools for orders, products, customers, and business analytics. Navigate using the sidebar or hover over any element for detailed guidance and instructions.';
  }
}

export const voiceTrainer = new VoiceTrainerService();
