
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
    
    if (this.guidanceQueue.length > 0) {
      setTimeout(() => this.processGuidanceQueue(), 100);
    }
  }

  private queueGuidance(text: string) {
    this.guidanceQueue = [text];
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

    // Enhanced guidance for specific page routes
    if (currentPath.includes('/admin/transactions')) {
      return this.getTransactionsGuidance(element, dataTestId, className, text, tagName, type);
    }

    if (currentPath.includes('/admin/dashboard')) {
      return this.getDashboardGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/product-reviews')) {
      return this.getProductReviewsGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/order')) {
      return this.getOrderManagementGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/products')) {
      return this.getProductManagementGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/customers')) {
      return this.getCustomerManagementGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/inventory')) {
      return this.getInventoryGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/reports')) {
      return this.getReportsGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/settings')) {
      return this.getSettingsGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/marketing')) {
      return this.getMarketingGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/categories')) {
      return this.getCategoriesGuidance(element, dataTestId, className, text, tagName);
    }

    if (currentPath.includes('/admin/coupons')) {
      return this.getCouponsGuidance(element, dataTestId, className, text, tagName);
    }

    // Shop pages guidance
    if (currentPath.includes('/shop') || currentPath === '/' || currentPath === '/ecommerce') {
      return this.getShopGuidance(element, dataTestId, className, text, tagName);
    }

    // Enhanced modals and popups guidance
    if (element.closest('[role="dialog"]') || element.closest('.modal') || className.includes('modal')) {
      return this.getModalGuidance(element);
    }

    // Enhanced dropdowns guidance
    if (element.closest('[role="menu"]') || element.closest('.dropdown') || className.includes('dropdown')) {
      return this.getDropdownGuidance(element);
    }

    // Enhanced sidebar guidance
    if (element.closest('.sidebar') || element.closest('[data-sidebar]') || className.includes('sidebar')) {
      return this.getSidebarGuidance(element);
    }

    // General form guidance
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
      return this.getFormGuidance(element, type, placeholder);
    }

    // General button guidance
    if (tagName === 'button' || role === 'button') {
      return this.getButtonGuidance(element, text);
    }

    // General link guidance
    if (tagName === 'a' || role === 'link') {
      return this.getLinkGuidance(element, text);
    }

    return null;
  }

  private getTransactionsGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string, type: string | null): string | null {
    // Statistics cards guidance
    if (element.closest('.stats-card') || className.includes('stats') || element.closest('[class*="grid"]')?.querySelector('[class*="stats"]')) {
      const cardTitle = element.closest('[class*="card"]')?.querySelector('h3, .title')?.textContent;
      if (cardTitle?.includes('Revenue')) {
        return 'Total Revenue Analytics - Monitor overall business income and revenue trends. This metric shows total sales value including completed transactions, helping track business growth and financial performance over time.';
      }
      if (cardTitle?.includes('Completed')) {
        return 'Completed Transactions Counter - Track successfully processed payments and finished transactions. This metric indicates transaction processing efficiency and customer purchase completion rates.';
      }
      if (cardTitle?.includes('Pending')) {
        return 'Pending Transactions Monitor - View transactions awaiting processing or customer action. Monitor payment processing delays and identify transactions requiring attention or follow-up.';
      }
      if (cardTitle?.includes('Failed')) {
        return 'Failed Transactions Alert - Track unsuccessful payment attempts and processing errors. Analyze failure patterns to improve payment processing and reduce transaction abandonment rates.';
      }
      return 'Transaction Statistics - Key performance indicators for payment processing, revenue tracking, and transaction success rates. Use these metrics to monitor business health and payment system efficiency.';
    }

    // Payment method card guidance
    if (element.closest('.payment-method') || className.includes('payment') || text?.includes('Finocut')) {
      return 'Payment Method Configuration - Manage active payment processors and gateway settings. Configure Finocut payment system, monitor transaction volumes, and track revenue processed through this payment method.';
    }

    // Transaction table guidance
    if (element.closest('table') || element.closest('.transaction-table')) {
      if (tagName === 'th') {
        return `Transaction Table Header: ${text} - Sort transactions by ${text?.toLowerCase()}. Click to organize transaction data for better analysis and tracking of payment patterns.`;
      }
      if (tagName === 'td') {
        const cellText = text?.substring(0, 20) + (text && text.length > 20 ? '...' : '');
        return `Transaction Record: ${cellText} - Detailed transaction information including customer data, payment method, amount, and processing status for comprehensive payment tracking.`;
      }
      return 'Transaction Records Table - Complete transaction history with customer details, payment amounts, processing methods, and transaction status. Use for financial reconciliation and payment analysis.';
    }

    // Filter and search guidance
    if (type === 'search' || placeholder?.includes('search')) {
      return 'Transaction Search - Find specific transactions by customer name, transaction ID, or payment details. Real-time search helps locate transactions quickly for customer support and reconciliation.';
    }

    if (tagName === 'select' || className.includes('filter')) {
      return 'Transaction Filter - Filter transactions by status, payment method, date range, or amount. Use filters to analyze specific transaction types and identify patterns in payment processing.';
    }

    return null;
  }

  private getDashboardGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    if (dataTestId === 'stats-cards' || className.includes('stats') || element.closest('[data-testid="stats-cards"]')) {
      const cardContent = element.closest('[class*="card"]')?.textContent;
      if (cardContent?.includes('Revenue')) {
        return 'Revenue Analytics Dashboard - Monitor total business income, revenue trends, and financial growth. Track sales performance with real-time updates and percentage changes for strategic business decisions.';
      }
      if (cardContent?.includes('Orders')) {
        return 'Order Tracking Dashboard - Overview of total orders processed, order volume trends, and order management statistics. Monitor customer demand and sales activity patterns.';
      }
      if (cardContent?.includes('Customers')) {
        return 'Customer Analytics Dashboard - Track total customer base, new customer acquisition, and customer growth metrics. Analyze customer engagement and retention patterns.';
      }
      if (cardContent?.includes('Products')) {
        return 'Product Inventory Dashboard - Monitor active product count, inventory levels, and product performance metrics. Track product availability and catalog management statistics.';
      }
      return 'Business Performance Dashboard - Key performance indicators including revenue, orders, customers, and products. Real-time metrics for comprehensive business monitoring and strategic decision making.';
    }
    
    if (dataTestId === 'sales-chart' || className.includes('chart') || element.closest('[data-testid="sales-chart"]')) {
      return 'Sales Analytics Visualization - Interactive chart displaying revenue trends, sales patterns, and business performance over time. Analyze peak sales periods, seasonal trends, and growth opportunities for strategic planning.';
    }
    
    if (dataTestId === 'quick-actions' || element.closest('[data-testid="quick-actions"]')) {
      const actionText = text?.toLowerCase() || '';
      if (actionText.includes('add product')) {
        return 'Quick Add Product - Rapidly create new inventory items with essential details. Streamlined product creation for efficient catalog management and immediate inventory updates.';
      }
      if (actionText.includes('view reports')) {
        return 'Quick Reports Access - Instant access to business analytics, sales reports, and performance metrics. Generate comprehensive business insights and data-driven reports.';
      }
      if (actionText.includes('manage orders')) {
        return 'Quick Order Management - Direct access to order processing system for immediate order handling, status updates, and customer service actions.';
      }
      return 'Quick Action Center - Frequently used administrative functions for efficient business management. Access common tasks without navigating through multiple menus.';
    }
    
    if (dataTestId === 'low-stock-alerts' || element.closest('[data-testid="low-stock-alerts"]')) {
      return 'Inventory Alert System - Critical stock level monitoring with automated alerts for low inventory items. Prevent stockouts and maintain adequate inventory levels for continuous sales.';
    }

    // Recent orders section
    if (element.closest('.recent-orders') || className.includes('recent-orders')) {
      return 'Recent Order Activity - Latest customer orders with real-time updates. Monitor recent sales activity, customer purchases, and order processing status for immediate business insights.';
    }

    // Top selling products section
    if (element.closest('.top-products') || className.includes('top-selling')) {
      return 'Top Performing Products - Best-selling items with performance metrics and growth indicators. Identify successful products for inventory planning and marketing focus.';
    }

    return null;
  }

  private getProductReviewsGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Tab navigation for reviews
    if (element.closest('.tabs') || className.includes('tab')) {
      const tabText = text?.toLowerCase() || '';
      if (tabText.includes('all')) {
        return 'All Reviews Tab - Complete list of customer product reviews across all statuses. View comprehensive feedback for overall product assessment and customer satisfaction analysis.';
      }
      if (tabText.includes('published')) {
        return 'Published Reviews Tab - Customer reviews approved and visible on product pages. Monitor public feedback that influences customer purchasing decisions and brand reputation.';
      }
      if (tabText.includes('pending')) {
        return 'Pending Reviews Tab - Customer reviews awaiting moderation approval. Review and approve legitimate feedback while filtering inappropriate or spam content.';
      }
      if (tabText.includes('rejected')) {
        return 'Rejected Reviews Tab - Reviews marked as inappropriate or spam. Maintain review quality standards and protect customers from misleading or harmful content.';
      }
      return 'Review Status Navigation - Filter customer reviews by approval status for efficient review management and quality control of customer feedback.';
    }

    // Search functionality
    if (element.closest('.search') || tagName === 'input' && (element.getAttribute('placeholder')?.includes('search') || element.getAttribute('type') === 'search')) {
      return 'Review Search System - Find specific customer reviews by product name, customer details, or review content. Quickly locate reviews for customer service responses and quality management.';
    }

    // Filter controls
    if (className.includes('filter') || text?.toLowerCase().includes('filter')) {
      return 'Review Filter Controls - Sort and filter reviews by rating, date, product category, or customer type. Organize feedback for targeted analysis and efficient review management.';
    }

    // Review table and individual reviews
    if (element.closest('table') || element.closest('.review-item')) {
      if (tagName === 'th') {
        return `Review Table Header: ${text} - Sort customer reviews by ${text?.toLowerCase()}. Organize feedback for systematic review management and quality assessment.`;
      }
      
      // Rating stars
      if (className.includes('star') || element.closest('.rating')) {
        return 'Customer Rating Display - Visual representation of customer satisfaction level. Star ratings provide quick assessment of product quality and customer experience.';
      }
      
      // Review actions (approve/reject buttons)
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('approve')) {
          return 'Approve Review Action - Publish customer review to product page. Make positive feedback visible to help other customers make informed purchasing decisions.';
        }
        if (buttonText.includes('reject')) {
          return 'Reject Review Action - Remove inappropriate or spam reviews. Maintain review quality standards and protect customers from misleading feedback.';
        }
        return 'Review Management Action - Moderate customer feedback by approving legitimate reviews and rejecting inappropriate content for quality control.';
      }
      
      return 'Customer Review Entry - Individual customer feedback including rating, written review, product details, and customer information. Assess feedback quality and customer satisfaction.';
    }

    // Pagination
    if (element.closest('.pagination') || className.includes('pagination')) {
      return 'Review Pagination - Navigate through multiple pages of customer reviews. Efficient browsing of large volumes of customer feedback for comprehensive review management.';
    }

    return null;
  }

  private getOrderManagementGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
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

  private getProductManagementGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Product form guidance
    if (element.closest('.product-form') || element.closest('[class*="form"]')) {
      if (tagName === 'input') {
        const inputType = element.getAttribute('type');
        const inputName = element.getAttribute('name');
        const placeholder = element.getAttribute('placeholder');
        
        if (inputName?.includes('name') || placeholder?.includes('name')) {
          return 'Product Name Field - Enter descriptive product title that customers will see. Use clear, searchable keywords for better product discovery and customer understanding.';
        }
        if (inputName?.includes('price') || inputType === 'number') {
          return 'Product Price Field - Set competitive product pricing including base price, discounts, and currency. Consider market rates and profit margins for optimal pricing strategy.';
        }
        if (inputName?.includes('sku') || placeholder?.includes('SKU')) {
          return 'Product SKU Field - Unique stock keeping unit identifier for inventory tracking. Use consistent SKU format for efficient inventory management and order processing.';
        }
        return 'Product Information Field - Enter accurate product details for catalog management and customer information display.';
      }
      
      if (tagName === 'textarea') {
        return 'Product Description Field - Write comprehensive product information including features, benefits, specifications, and usage instructions. Detailed descriptions help customers make informed purchase decisions.';
      }
      
      if (tagName === 'select') {
        return 'Product Category Selection - Choose appropriate product category for organization and customer browsing. Proper categorization improves product discoverability and site navigation.';
      }
    }

    // Product list/grid guidance
    if (element.closest('.product-grid') || element.closest('.product-list')) {
      return 'Product Catalog View - Browse and manage all products with visual thumbnails, pricing, and status information. Use grid or list view for efficient product catalog management.';
    }

    // Product card guidance
    if (element.closest('.product-card') || className.includes('product-card')) {
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('edit')) {
          return 'Edit Product - Modify product information including name, description, price, images, and inventory details. Update product information to maintain accurate catalog.';
        }
        if (buttonText.includes('delete')) {
          return 'Delete Product - Permanently remove product from catalog. Warning: This action will remove the product from active listings and cannot be undone.';
        }
        if (buttonText.includes('duplicate')) {
          return 'Duplicate Product - Create copy of existing product with similar details. Useful for creating product variants or similar items with minor differences.';
        }
      }
      return 'Product Management Card - Individual product overview with key details and management actions. Access product editing, duplication, and removal functions.';
    }

    // Inventory management
    if (className.includes('inventory') || text?.toLowerCase().includes('stock')) {
      return 'Inventory Management - Monitor and update product stock levels, set low stock alerts, and manage inventory across multiple locations for optimal stock control.';
    }

    // Image upload/management
    if (element.closest('.image-upload') || tagName === 'input' && element.getAttribute('type') === 'file') {
      return 'Product Image Upload - Add high-quality product photos from multiple angles. Good product images significantly improve conversion rates and customer satisfaction.';
    }

    return null;
  }

  private getCustomerManagementGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Customer list/table guidance
    if (element.closest('table') || element.closest('.customer-list')) {
      if (tagName === 'th') {
        return `Customer Table Header: ${text} - Sort customers by ${text?.toLowerCase()}. Organize customer data for better relationship management and analysis.`;
      }
      if (tagName === 'td') {
        return 'Customer Information - Individual customer details including contact information, order history, and account status for comprehensive customer relationship management.';
      }
      return 'Customer Database - Complete customer information with contact details, order history, preferences, and account status for effective customer relationship management.';
    }

    // Customer profile/details
    if (element.closest('.customer-profile') || className.includes('customer-detail')) {
      return 'Customer Profile - Comprehensive customer information including personal details, order history, preferences, and communication history for personalized customer service.';
    }

    // Customer analytics
    if (className.includes('analytics') || className.includes('stats')) {
      return 'Customer Analytics - Customer behavior metrics, purchase patterns, lifetime value, and engagement statistics for strategic customer relationship management and marketing.';
    }

    // Customer communication tools
    if (tagName === 'button' && text?.toLowerCase().includes('message')) {
      return 'Customer Communication - Send direct messages, notifications, or promotional content to customers for enhanced customer service and relationship building.';
    }

    // Customer search and filters
    if (tagName === 'input' && element.getAttribute('type') === 'search') {
      return 'Customer Search - Find specific customers by name, email, phone number, or order history. Quick customer lookup for support and service requests.';
    }

    if (className.includes('filter') || tagName === 'select') {
      return 'Customer Filter - Sort customers by registration date, order frequency, total spent, or account status for targeted customer analysis and segmentation.';
    }

    return null;
  }

  private getInventoryGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Stock level displays
    if (className.includes('stock') || text?.toLowerCase().includes('stock')) {
      const stockText = text?.toLowerCase() || '';
      if (stockText.includes('low') || stockText.includes('alert')) {
        return 'Low Stock Alert - Critical inventory warning requiring immediate attention. Restock these items to prevent stockouts and maintain customer satisfaction.';
      }
      if (stockText.includes('out of stock')) {
        return 'Out of Stock Item - Product currently unavailable for sale. Urgent restocking needed to resume sales and prevent lost revenue.';
      }
      return 'Inventory Stock Level - Current product availability and stock quantity. Monitor levels to maintain optimal inventory and prevent stockouts.';
    }

    // Inventory adjustment forms
    if (element.closest('.inventory-form') || element.closest('.stock-adjustment')) {
      if (tagName === 'input' && element.getAttribute('type') === 'number') {
        return 'Stock Quantity Adjustment - Update product inventory levels for accurate stock tracking. Enter new quantities for inventory reconciliation and stock management.';
      }
      return 'Inventory Management Form - Update stock levels, add new inventory, or adjust quantities for accurate inventory tracking and availability management.';
    }

    // Restock actions
    if (tagName === 'button' && text?.toLowerCase().includes('restock')) {
      return 'Restock Inventory - Add new stock quantities to replenish inventory levels. Ensure adequate stock availability for continued sales and customer satisfaction.';
    }

    // Inventory reports
    if (className.includes('report') || text?.toLowerCase().includes('report')) {
      return 'Inventory Reports - Detailed analysis of stock levels, inventory turnover, and restocking needs. Use reports for strategic inventory planning and purchasing decisions.';
    }

    // Barcode/SKU scanners
    if (className.includes('scanner') || text?.toLowerCase().includes('scan')) {
      return 'Barcode Scanner - Scan product barcodes for quick inventory updates and product identification. Streamlines inventory management and reduces manual data entry errors.';
    }

    return null;
  }

  private getReportsGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Report type selection
    if (element.closest('.report-selector') || className.includes('report-type')) {
      const reportText = text?.toLowerCase() || '';
      if (reportText.includes('sales')) {
        return 'Sales Reports - Comprehensive revenue analysis, sales trends, and performance metrics. Track sales by period, product, or customer for strategic business planning.';
      }
      if (reportText.includes('inventory')) {
        return 'Inventory Reports - Stock level analysis, inventory turnover, and reorder recommendations. Monitor inventory health and optimize stock management strategies.';
      }
      if (reportText.includes('customer')) {
        return 'Customer Reports - Customer behavior analysis, lifetime value, and segmentation data. Understand customer patterns for improved marketing and service strategies.';
      }
      if (reportText.includes('financial')) {
        return 'Financial Reports - Revenue, profit margins, and financial performance analysis. Track business financial health and identify growth opportunities.';
      }
      return 'Business Report Selection - Choose from various analytical reports for comprehensive business insights and data-driven decision making.';
    }

    // Date range selectors
    if (element.closest('.date-range') || className.includes('date')) {
      return 'Report Date Range - Select time period for report generation. Choose specific dates, months, or quarters for targeted business analysis and comparison.';
    }

    // Export/download buttons
    if (tagName === 'button' && (text?.toLowerCase().includes('export') || text?.toLowerCase().includes('download'))) {
      return 'Export Report - Download report data in various formats (PDF, Excel, CSV) for offline analysis, sharing with stakeholders, or record keeping.';
    }

    // Chart/graph areas
    if (element.closest('.chart') || className.includes('chart') || element.closest('svg')) {
      return 'Report Visualization - Interactive charts and graphs displaying business data trends. Analyze patterns, identify opportunities, and track performance visually.';
    }

    // Report filters
    if (className.includes('filter') || tagName === 'select') {
      return 'Report Filters - Refine report data by specific criteria such as product categories, customer segments, or geographic regions for focused analysis.';
    }

    return null;
  }

  private getSettingsGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // General settings sections
    if (element.closest('.settings-section')) {
      const sectionTitle = element.closest('.settings-section')?.querySelector('h2, h3, .title')?.textContent?.toLowerCase() || '';
      
      if (sectionTitle.includes('general')) {
        return 'General Settings - Basic system configuration including site name, contact information, timezone, and default language settings for overall system management.';
      }
      if (sectionTitle.includes('payment')) {
        return 'Payment Settings - Configure payment gateways, processing fees, currency settings, and payment method preferences for customer transactions.';
      }
      if (sectionTitle.includes('shipping')) {
        return 'Shipping Configuration - Set up shipping zones, rates, delivery methods, and carrier integrations for efficient order fulfillment and customer delivery.';
      }
      if (sectionTitle.includes('notification')) {
        return 'Notification Settings - Configure email templates, SMS notifications, and alert preferences for customer communications and admin notifications.';
      }
      if (sectionTitle.includes('security')) {
        return 'Security Settings - Manage user permissions, password policies, two-factor authentication, and access controls for system security and data protection.';
      }
      if (sectionTitle.includes('tax')) {
        return 'Tax Configuration - Set up tax rates, exemptions, and calculation methods for different regions and customer types to ensure compliance.';
      }
    }

    // API/Integration settings
    if (className.includes('api') || text?.toLowerCase().includes('api')) {
      return 'API Integration Settings - Configure third-party service connections, webhooks, and API keys for external system integrations and data synchronization.';
    }

    // Backup/maintenance settings
    if (text?.toLowerCase().includes('backup') || text?.toLowerCase().includes('maintenance')) {
      return 'System Maintenance - Configure automated backups, system updates, and maintenance schedules to ensure data safety and optimal system performance.';
    }

    // User management within settings
    if (className.includes('user') || text?.toLowerCase().includes('user')) {
      return 'User Management Settings - Manage admin accounts, user roles, permissions, and access levels for secure system administration and team collaboration.';
    }

    // Form inputs in settings
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
      return 'Configuration Field - Enter or select appropriate values for system configuration. Changes will be applied after saving settings.';
    }

    return null;
  }

  private getMarketingGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Campaign management
    if (element.closest('.campaign') || className.includes('campaign')) {
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('create')) {
          return 'Create Marketing Campaign - Design new promotional campaigns with target audiences, messaging, and timing for effective customer engagement and sales growth.';
        }
        if (buttonText.includes('launch')) {
          return 'Launch Campaign - Activate marketing campaign to reach target customers. Monitor performance metrics and engagement rates for optimization.';
        }
        if (buttonText.includes('pause')) {
          return 'Pause Campaign - Temporarily stop campaign execution while preserving settings. Resume when ready or make adjustments before reactivation.';
        }
      }
      return 'Marketing Campaign Management - Create, manage, and analyze promotional campaigns including email marketing, social media promotion, and targeted advertising.';
    }

    // Email marketing
    if (className.includes('email') || text?.toLowerCase().includes('email')) {
      return 'Email Marketing Tools - Design and send promotional emails, newsletters, and automated email sequences for customer engagement and retention.';
    }

    // Discount/coupon management
    if (className.includes('coupon') || className.includes('discount') || text?.toLowerCase().includes('coupon')) {
      return 'Promotional Coupon Management - Create discount codes, promotional offers, and special deals to incentivize purchases and increase customer loyalty.';
    }

    // Social media integration
    if (className.includes('social') || text?.toLowerCase().includes('social')) {
      return 'Social Media Marketing - Integrate with social platforms for cross-platform promotion, social commerce, and customer engagement through social channels.';
    }

    // Analytics and performance
    if (className.includes('analytics') || className.includes('performance')) {
      return 'Marketing Analytics - Track campaign performance, customer engagement metrics, conversion rates, and ROI for data-driven marketing optimization.';
    }

    return null;
  }

  private getCategoriesGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Category tree/hierarchy
    if (element.closest('.category-tree') || className.includes('hierarchy')) {
      return 'Category Hierarchy - Organize products in logical category structure for improved navigation and customer browsing experience. Drag and drop to reorder categories.';
    }

    // Category form
    if (element.closest('.category-form')) {
      if (tagName === 'input') {
        const inputName = element.getAttribute('name') || element.getAttribute('placeholder') || '';
        if (inputName.toLowerCase().includes('name')) {
          return 'Category Name Field - Enter descriptive category title that clearly identifies the product group. Use customer-friendly names for better site navigation.';
        }
        if (inputName.toLowerCase().includes('description')) {
          return 'Category Description - Write helpful description explaining what products belong in this category. Good descriptions improve SEO and customer understanding.';
        }
      }
      return 'Category Configuration - Set up product categories with names, descriptions, and organization structure for improved product discovery and site navigation.';
    }

    // Category management actions
    if (tagName === 'button') {
      const buttonText = text?.toLowerCase() || '';
      if (buttonText.includes('add')) {
        return 'Add New Category - Create new product category for better organization and customer browsing. Plan category structure for logical product grouping.';
      }
      if (buttonText.includes('edit')) {
        return 'Edit Category - Modify category information including name, description, and hierarchy position. Update categories to improve site navigation.';
      }
      if (buttonText.includes('delete')) {
        return 'Delete Category - Remove category from system. Warning: Products in this category will need reassignment before deletion can proceed.';
      }
    }

    // Category list/grid
    if (element.closest('.category-list') || element.closest('.category-grid')) {
      return 'Category Management List - Overview of all product categories with management options. Organize categories for optimal customer browsing and product discovery.';
    }

    return null;
  }

  private getCouponsGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Coupon form fields
    if (element.closest('.coupon-form')) {
      if (tagName === 'input') {
        const inputType = element.getAttribute('type');
        const inputName = element.getAttribute('name') || element.getAttribute('placeholder') || '';
        
        if (inputName.toLowerCase().includes('code')) {
          return 'Coupon Code Field - Create unique coupon code that customers will enter at checkout. Use memorable codes that align with your promotion theme.';
        }
        if (inputName.toLowerCase().includes('discount') || inputType === 'number') {
          return 'Discount Amount Field - Set discount value as percentage or fixed amount. Consider profit margins and promotional goals when setting discount levels.';
        }
        if (inputType === 'date') {
          return 'Coupon Validity Period - Set start and end dates for coupon availability. Time-limited offers create urgency and drive customer action.';
        }
        if (inputName.toLowerCase().includes('usage')) {
          return 'Usage Limit Field - Set maximum number of times this coupon can be used. Control promotion costs and create exclusivity for special offers.';
        }
      }
      
      if (tagName === 'select') {
        return 'Coupon Type Selection - Choose discount type (percentage, fixed amount, free shipping) and applicable products or categories for targeted promotions.';
      }
      
      return 'Coupon Configuration - Create promotional discount codes with specific terms, validity periods, and usage restrictions for effective marketing campaigns.';
    }

    // Coupon management table
    if (element.closest('table') || element.closest('.coupon-list')) {
      if (tagName === 'th') {
        return `Coupon Table Header: ${text} - Sort coupons by ${text?.toLowerCase()}. Organize promotional codes for efficient campaign management and performance tracking.`;
      }
      if (tagName === 'td') {
        return 'Coupon Details - Individual coupon information including code, discount amount, validity period, and usage statistics for promotion management.';
      }
      return 'Coupon Management Table - Complete list of promotional codes with details, status, and performance metrics for effective discount campaign management.';
    }

    // Coupon actions
    if (tagName === 'button') {
      const buttonText = text?.toLowerCase() || '';
      if (buttonText.includes('activate')) {
        return 'Activate Coupon - Enable coupon for customer use. Active coupons will be available for customers to apply during checkout process.';
      }
      if (buttonText.includes('deactivate')) {
        return 'Deactivate Coupon - Disable coupon to prevent further use. Deactivated coupons will not be accepted during checkout but remain in system for records.';
      }
      if (buttonText.includes('duplicate')) {
        return 'Duplicate Coupon - Create copy of existing coupon with similar settings. Useful for creating similar promotions or seasonal campaigns.';
      }
    }

    // Coupon analytics
    if (className.includes('analytics') || className.includes('usage')) {
      return 'Coupon Performance Analytics - Track coupon usage rates, revenue impact, and customer engagement metrics for promotional campaign optimization.';
    }

    return null;
  }

  private getShopGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined, tagName: string): string | null {
    // Navigation elements
    if (element.closest('nav') || element.closest('.navigation')) {
      if (tagName === 'a' || role === 'link') {
        const linkText = text?.toLowerCase() || '';
        if (linkText.includes('shop')) {
          return 'Shop Navigation - Browse complete product catalog with categories, filters, and search functionality for comprehensive shopping experience.';
        }
        if (linkText.includes('cart')) {
          return 'Shopping Cart - View selected items, adjust quantities, and proceed to checkout. Review your purchases before completing the order.';
        }
        if (linkText.includes('account') || linkText.includes('profile')) {
          return 'Customer Account - Access personal information, order history, preferences, and account settings for personalized shopping experience.';
        }
        return 'Site Navigation - Navigate to different sections of the online store for browsing products, managing account, and completing purchases.';
      }
      return 'Main Navigation - Primary site navigation for accessing product categories, shopping features, and customer account functions.';
    }

    // Product displays
    if (element.closest('.product-card') || className.includes('product')) {
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('add to cart')) {
          return 'Add to Cart - Add this product to your shopping cart for purchase. Select quantity and options before adding to cart.';
        }
        if (buttonText.includes('wishlist')) {
          return 'Add to Wishlist - Save product for later consideration. Wishlist items can be purchased later or shared with others.';
        }
        if (buttonText.includes('quick view')) {
          return 'Quick View - See product details in popup window without leaving current page. Quick way to check product information and specifications.';
        }
      }
      return 'Product Display - Product information with images, pricing, and purchase options. Compare products and read details before making purchase decisions.';
    }

    // Search functionality
    if (tagName === 'input' && (element.getAttribute('type') === 'search' || element.getAttribute('placeholder')?.includes('search'))) {
      return 'Product Search - Find products by name, category, or keywords. Search suggestions and filters help you find exactly what you need.';
    }

    // Category browsing
    if (element.closest('.categories') || className.includes('category')) {
      return 'Product Categories - Browse products by category for easier shopping. Categories help you find specific types of products quickly and efficiently.';
    }

    // Shopping cart elements
    if (element.closest('.cart') || className.includes('cart')) {
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('remove')) {
          return 'Remove from Cart - Delete this item from your shopping cart. Item will no longer be included in your order total.';
        }
        if (buttonText.includes('update')) {
          return 'Update Cart - Apply quantity changes and recalculate order total. Ensure your cart reflects the correct items and quantities.';
        }
        if (buttonText.includes('checkout')) {
          return 'Proceed to Checkout - Continue to payment and shipping information to complete your purchase. Review cart contents before proceeding.';
        }
      }
      return 'Shopping Cart Management - Review selected items, adjust quantities, and manage your order before proceeding to checkout for purchase completion.';
    }

    // Customer reviews on shop pages
    if (element.closest('.reviews') || className.includes('review')) {
      return 'Customer Reviews - Read feedback from other customers about product quality, fit, and satisfaction. Reviews help inform your purchase decisions.';
    }

    // Promotional banners
    if (className.includes('banner') || className.includes('promotion')) {
      return 'Promotional Banner - Special offers, discounts, and featured products. Take advantage of current promotions and limited-time deals.';
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
        return 'Close Dialog - Click to dismiss this modal and return to the previous view without saving changes.';
      }
      if (text?.toLowerCase().includes('save') || text?.toLowerCase().includes('confirm') || text?.toLowerCase().includes('update')) {
        return 'Save Changes - Click to confirm and save all modifications made in this dialog.';
      }
    }
    return 'Modal Dialog - Overlay window with additional information or actions. Use Tab to navigate between elements or click outside to close.';
  }

  private getDropdownGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.getAttribute('role') === 'menuitem') {
      return `Dropdown Option: ${text} - Click to select this option and apply the setting or navigate to the selected function.`;
    }
    return 'Dropdown Menu - Select from available options to change settings or access additional functions. Use arrow keys to navigate or click to select.';
  }

  private getSidebarGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.tagName.toLowerCase() === 'a' || element.getAttribute('role') === 'button') {
      if (text?.toLowerCase().includes('dashboard')) {
        return 'Dashboard Navigation - Access the main administrative overview with key metrics, recent activity, and quick actions for business management.';
      }
      if (text?.toLowerCase().includes('order')) {
        return 'Order Management Navigation - Access comprehensive order processing system for viewing, updating, and managing all customer orders.';
      }
      if (text?.toLowerCase().includes('product')) {
        return 'Product Management Navigation - Access product catalog management including adding products, updating inventory, and organizing categories.';
      }
      if (text?.toLowerCase().includes('customer')) {
        return 'Customer Management Navigation - Access customer database, profiles, and relationship management tools for customer service and analytics.';
      }
      if (text?.toLowerCase().includes('transaction')) {
        return 'Transaction Management Navigation - Access payment processing, transaction history, and financial reporting for business accounting.';
      }
      if (text?.toLowerCase().includes('report')) {
        return 'Reports Navigation - Access business analytics, sales reports, and performance metrics for data-driven decision making.';
      }
      if (text?.toLowerCase().includes('setting')) {
        return 'Settings Navigation - Access system configuration, user management, and administrative preferences for system customization.';
      }
      return `Administrative Navigation: ${text} - Click to access the ${text?.toLowerCase()} section of the administration panel with relevant management tools.`;
    }
    return 'Administrative Sidebar - Main navigation for accessing different sections of the admin panel including orders, products, customers, and business management tools.';
  }

  private getFormGuidance(element: HTMLElement, type: string | null, placeholder: string | null): string {
    if (type === 'email') {
      return 'Email Address Field - Enter a valid email address for account access, notifications, or customer communications. Format: example@domain.com';
    }
    if (type === 'password') {
      return 'Password Field - Enter your secure password for account authentication. Use strong passwords with letters, numbers, and special characters.';
    }
    if (type === 'search') {
      return 'Search Field - Enter keywords to find specific items. Search results update in real-time as you type for efficient information lookup.';
    }
    if (type === 'number') {
      return 'Numeric Input - Enter numerical values such as quantities, prices, or measurements. Use number keys for accurate data entry.';
    }
    if (type === 'tel') {
      return 'Phone Number Field - Enter contact phone number for customer communication and order updates. Include area code for complete contact information.';
    }
    if (type === 'url') {
      return 'Website URL Field - Enter complete web address including http:// or https://. Ensure URL is valid and accessible for proper linking.';
    }
    if (placeholder) {
      return `Input Field: ${placeholder} - Enter the required ${placeholder.toLowerCase()} information to proceed with the form submission.`;
    }
    return 'Form Input Field - Enter the required information in the correct format to proceed with your request or data submission.';
  }

  private getButtonGuidance(element: HTMLElement, text: string | undefined): string {
    if (!text) return 'Interactive Button - Click to perform the associated action or navigate to the next step in the process.';
    
    const buttonText = text.toLowerCase();
    if (buttonText.includes('save') || buttonText.includes('submit') || buttonText.includes('update')) {
      return `Save Changes - Click to store all modifications and apply the updates to the system. Ensure all required fields are completed before saving.`;
    }
    if (buttonText.includes('cancel') || buttonText.includes('close')) {
      return 'Cancel Action - Click to dismiss changes and return to the previous view without saving any modifications made.';
    }
    if (buttonText.includes('delete') || buttonText.includes('remove')) {
      return 'Delete Action - Click to permanently remove this item from the system. Warning: This action cannot be undone, confirm before proceeding.';
    }
    if (buttonText.includes('edit') || buttonText.includes('modify')) {
      return 'Edit Mode - Click to enable editing of existing information with full modification capabilities and form controls.';
    }
    if (buttonText.includes('view') || buttonText.includes('details')) {
      return 'View Details - Click to access comprehensive information and detailed view of this item with complete specifications.';
    }
    if (buttonText.includes('filter')) {
      return 'Apply Filter - Click to filter results based on selected criteria for more focused data viewing and analysis.';
    }
    if (buttonText.includes('export') || buttonText.includes('download')) {
      return 'Export Data - Click to download information in various formats for offline analysis, reporting, or record keeping.';
    }
    if (buttonText.includes('refresh') || buttonText.includes('reload')) {
      return 'Refresh Data - Click to reload current information and update the display with the latest data from the system.';
    }
    if (buttonText.includes('search')) {
      return 'Execute Search - Click to perform search operation based on entered criteria and display matching results.';
    }
    return `${text} Button - Click to ${buttonText}. This action will ${this.getActionDescription(buttonText)} based on current settings and selections.`;
  }

  private getActionDescription(action: string): string {
    if (action.includes('process')) return 'begin processing the selected items according to defined workflows';
    if (action.includes('ship')) return 'mark items as shipped and update tracking information for customer notification';
    if (action.includes('confirm')) return 'confirm and execute the pending action with all specified parameters';
    if (action.includes('refresh')) return 'reload the current data and update the display with latest information';
    if (action.includes('generate')) return 'create new content or reports based on current data and settings';
    if (action.includes('sync')) return 'synchronize data with external systems or update information across platforms';
    return 'perform the requested operation according to current configuration and user permissions';
  }

  private getLinkGuidance(element: HTMLElement, text: string | undefined): string {
    if (!text) return 'Navigation Link - Click to navigate to another page or section of the application with relevant information.';
    
    const linkText = text.toLowerCase();
    if (linkText.includes('order')) {
      return `Order Navigation: ${text} - Access order-related functionality including viewing, processing, and managing customer orders with comprehensive tools.`;
    }
    if (linkText.includes('customer')) {
      return `Customer Management: ${text} - Navigate to customer information, profiles, and relationship management tools for customer service excellence.`;
    }
    if (linkText.includes('product')) {
      return `Product Management: ${text} - Access product catalog, inventory, and product information management with full editing capabilities.`;
    }
    if (linkText.includes('report')) {
      return `Business Reports: ${text} - Navigate to analytical reports and business intelligence tools for data-driven decision making.`;
    }
    if (linkText.includes('setting')) {
      return `System Settings: ${text} - Access configuration options and administrative preferences for system customization and management.`;
    }
    return `Navigation Link: ${text} - Click to navigate to the ${linkText} section with relevant tools, information, and management capabilities.`;
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
    const currentPath = window.location.pathname;
    
    // Page-specific click feedback
    if (currentPath.includes('/admin/transactions')) {
      if (buttonText.includes('filter')) {
        return 'Transaction filter applied successfully. Results updated to show transactions matching your selected criteria for focused analysis.';
      }
      if (buttonText.includes('export')) {
        return 'Transaction data export initiated. Download will begin shortly with complete transaction information for your records.';
      }
    }

    if (currentPath.includes('/admin/dashboard')) {
      if (buttonText.includes('quick action')) {
        return 'Quick action executed successfully. You can now perform the selected administrative task efficiently.';
      }
      if (buttonText.includes('view reports')) {
        return 'Business reports accessed. Comprehensive analytics and performance metrics are now available for review and analysis.';
      }
    }

    // Specific click feedback for order management
    if (dataTestId?.includes('order')) {
      if (dataTestId === 'view-order-btn') {
        return 'Order details opened successfully. Review customer information, order items, and use the status manager to update order progress.';
      }
      if (dataTestId === 'edit-order-btn') {
        return 'Order editor activated. Modify order details, update status, or add tracking information as needed for complete order management.';
      }
    }
    
    // General action feedback
    if (buttonText.includes('save') || buttonText.includes('submit') || buttonText.includes('update')) {
      return 'Changes saved successfully. All modifications have been stored and applied to the system with confirmation of completion.';
    }
    if (buttonText.includes('delete') || buttonText.includes('remove')) {
      return 'Item deleted successfully. The selected item has been permanently removed from the system and cannot be recovered.';
    }
    if (buttonText.includes('filter') || buttonText.includes('search')) {
      return 'Filter applied successfully. Results updated to show items matching your selected criteria for improved data focus.';
    }
    if (buttonText.includes('export') || buttonText.includes('download')) {
      return 'Export process initiated. Your requested data will be prepared and downloaded in the selected format shortly.';
    }
    if (buttonText.includes('refresh') || buttonText.includes('reload')) {
      return 'Data refreshed successfully. All information has been updated with the latest data from the system.';
    }
    if (buttonText.includes('copy')) {
      return 'Information copied to clipboard. You can now paste this data into other applications or documents.';
    }
    if (buttonText.includes('approve')) {
      return 'Item approved successfully. The selected item has been reviewed and approved according to system standards.';
    }
    if (buttonText.includes('reject')) {
      return 'Item rejected successfully. The selected item has been marked as rejected and removed from pending approvals.';
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
      return 'Administrative Dashboard - Central business command center for comprehensive management. Monitor key performance metrics including revenue trends, order statistics, customer analytics, and inventory levels. Access quick action shortcuts, review critical alerts, and oversee all business operations from this unified interface.';
    }
    if (path.includes('/admin/transactions')) {
      return 'Transaction Management System - Complete financial transaction center for monitoring payment processing, revenue tracking, and transaction analysis. View payment method performance, track failed transactions, manage payment gateways, and analyze financial metrics for comprehensive payment oversight.';
    }
    if (path.includes('/admin/product-reviews')) {
      return 'Product Review Management Center - Comprehensive customer feedback management system for moderating product reviews, maintaining review quality, and analyzing customer satisfaction. Approve legitimate reviews, reject inappropriate content, and use customer feedback for product improvement and reputation management.';
    }
    if (path.includes('/admin/order')) {
      return 'Order Management System - Complete order processing hub for managing customer orders from placement to delivery. Filter orders by status, search for specific orders, view detailed order information, update order status, add tracking numbers, and manage the entire order fulfillment process with comprehensive workflow tools.';
    }
    if (path.includes('/admin/products')) {
      return 'Product Management Center - Comprehensive product catalog management including adding new products, updating existing items, managing inventory levels, organizing categories, setting prices, uploading images, and maintaining complete product information for your online store.';
    }
    if (path.includes('/admin/customers')) {
      return 'Customer Management System - Complete customer relationship management including customer profiles, order history, contact information, communication tools, and customer analytics for building strong customer relationships and providing excellent customer service.';
    }
    if (path.includes('/admin/inventory')) {
      return 'Inventory Management Center - Comprehensive stock control system for monitoring inventory levels, tracking stock movements, setting reorder points, managing low stock alerts, and optimizing inventory turnover for efficient warehouse and stock management.';
    }
    if (path.includes('/admin/reports')) {
      return 'Business Analytics and Reports Center - Detailed business intelligence including sales reports, customer analytics, inventory reports, financial summaries, and performance metrics for data-driven business decisions and strategic planning.';
    }
    if (path.includes('/admin/settings')) {
      return 'System Settings and Configuration - Administrative control panel for system preferences, user management, security settings, payment configuration, shipping setup, and general system administration for customized business operations.';
    }
    if (path.includes('/admin/marketing')) {
      return 'Marketing Campaign Management - Comprehensive promotional tools for creating marketing campaigns, managing email marketing, social media integration, promotional coupons, and analyzing marketing performance for effective customer engagement and sales growth.';
    }
    if (path.includes('/admin/categories')) {
      return 'Product Category Management - Organize product catalog with hierarchical category structure, manage category descriptions, set category images, and optimize category navigation for improved customer browsing experience and product discovery.';
    }
    if (path.includes('/admin/coupons')) {
      return 'Promotional Coupon Management - Create and manage discount codes, promotional offers, and special deals including percentage discounts, fixed amount discounts, free shipping offers, and usage restrictions for effective marketing campaigns.';
    }
    if (path.includes('/shop') || path === '/' || path === '/ecommerce') {
      return 'Online Shopping Platform - Customer shopping experience with product browsing, category navigation, search functionality, shopping cart management, and checkout process. Explore products, read reviews, compare items, and complete purchases securely.';
    }
    
    return 'Professional Business Management System - Comprehensive administrative platform with tools for orders, products, customers, inventory, financial tracking, and business analytics. Navigate using the sidebar or hover over any element for detailed guidance and instructions.';
  }
}

export const voiceTrainer = new VoiceTrainerService();
