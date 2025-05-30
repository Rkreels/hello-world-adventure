
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

class VoiceTrainerService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying = false;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private lastGuidedElement: string | null = null;
  private currentPage: string = '';
  private elementCache: Map<string, string> = new Map();

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

  async speak(text: string): Promise<void> {
    this.stopCurrentSpeech();

    return new Promise((resolve, reject) => {
      try {
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        if (this.preferredVoice) {
          this.currentUtterance.voice = this.preferredVoice;
        }
        
        // Normal speech settings for clarity
        this.currentUtterance.rate = 1.0;
        this.currentUtterance.pitch = 1.0;
        this.currentUtterance.volume = 0.9;

        this.currentUtterance.onstart = () => {
          this.isPlaying = true;
        };

        this.currentUtterance.onend = () => {
          this.isPlaying = false;
          this.currentUtterance = null;
          resolve();
        };

        this.currentUtterance.onerror = (event) => {
          this.isPlaying = false;
          this.currentUtterance = null;
          console.error('Speech synthesis error:', event);
          reject(new Error('Speech synthesis failed'));
        };

        speechSynthesis.speak(this.currentUtterance);
      } catch (error) {
        this.isPlaying = false;
        reject(error);
      }
    });
  }

  stopCurrentSpeech() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  getElementInfo(element: HTMLElement): string | null {
    // Create a more specific identifier based on element properties
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
    
    // Don't guide the same element repeatedly
    if (elementInfo === this.lastGuidedElement) return;
    
    this.lastGuidedElement = elementInfo;
    this.highlightElement(element);
    
    const guidance = this.getElementGuidance(element);
    if (guidance) {
      await this.speak(guidance);
    }
  }

  private getElementGuidance(element: HTMLElement): string | null {
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const text = element.textContent?.trim();
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    const title = element.getAttribute('title');
    const placeholder = element.getAttribute('placeholder');
    const type = element.getAttribute('type');
    const dataTestId = element.getAttribute('data-testid');
    
    // Dashboard-specific guidance
    if (window.location.pathname.includes('/dashboard')) {
      if (dataTestId === 'stats-cards' || className.includes('stats') || element.closest('[data-testid="stats-cards"]')) {
        return 'These are your key performance indicators showing total revenue, orders, customers, and active products. These metrics help you track business growth and make informed decisions about your operations.';
      }
      
      if (dataTestId === 'sales-chart' || className.includes('chart') || element.closest('[data-testid="sales-chart"]')) {
        return 'This sales chart visualizes your revenue trends over time. Use it to identify peak sales periods, seasonal patterns, and growth opportunities. The data helps you plan inventory and marketing strategies.';
      }
      
      if (dataTestId === 'quick-actions' || element.closest('[data-testid="quick-actions"]')) {
        return 'Quick actions provide shortcuts to common tasks like adding products, viewing reports, or managing customers. These buttons save time by giving direct access to frequently used features.';
      }
      
      if (dataTestId === 'low-stock-alerts' || element.closest('[data-testid="low-stock-alerts"]')) {
        return 'Low stock alerts notify you when products are running out. Monitor these alerts to prevent stockouts and maintain customer satisfaction by reordering inventory before it depletes.';
      }
    }

    // Specific button analysis based on text content and context
    if (tagName === 'button' || role === 'button') {
      const buttonText = text?.toLowerCase() || '';
      
      // Add Product buttons
      if (buttonText.includes('add product')) {
        return 'Add Product button creates new items in your inventory. Click to open a form where you enter product details like name, description, price, images, and stock quantity. This expands your catalog and gives customers more purchasing options.';
      }
      
      // Add Category buttons  
      if (buttonText.includes('add category')) {
        return 'Add Category button creates product groupings for better organization. Categories help customers find products easily and help you manage inventory efficiently. Examples include Electronics, Clothing, or Home & Garden.';
      }
      
      // Edit buttons with context
      if (buttonText.includes('edit')) {
        const context = this.getContextualItem();
        return `Edit button modifies existing ${context}. Click to open a pre-filled form with current data that you can update. For example, edit product prices for sales, update descriptions for clarity, or modify stock levels after receiving shipments.`;
      }
      
      // Delete buttons with context
      if (buttonText.includes('delete') || buttonText.includes('remove')) {
        const context = this.getContextualItem();
        return `Delete button permanently removes ${context} from your system. Use carefully as this action cannot be undone. For example, delete discontinued products, outdated categories, or cancelled orders to keep your system organized.`;
      }
      
      // View/Details buttons
      if (buttonText.includes('view') || buttonText.includes('details') || buttonText.includes('see more')) {
        const context = this.getContextualItem();
        return `View Details button displays comprehensive information about this ${context}. See all properties, related data, and available actions. This helps you understand the complete context before making decisions.`;
      }
      
      // Import/Export buttons
      if (buttonText.includes('import')) {
        return 'Import button uploads data from external files like CSV or Excel. Use this to bulk add products, update inventory, or migrate data from other systems. Ensure your file format matches the required template.';
      }
      
      if (buttonText.includes('export')) {
        return 'Export button downloads your data in various formats. Create backups, share data with stakeholders, or analyze information in external tools like Excel. Useful for inventory reports or sales analysis.';
      }
      
      // Reports button
      if (buttonText.includes('report')) {
        return 'View Reports button accesses business analytics and performance metrics. Track sales trends, customer behavior, inventory turnover, and profitability. Use these insights to make data-driven business decisions.';
      }
      
      // Settings button
      if (buttonText.includes('settings') || buttonText.includes('configure')) {
        return 'Settings button opens configuration options for system preferences, user accounts, and business rules. Customize your admin experience, manage permissions, and set up integrations with other tools.';
      }
      
      // Save/Submit buttons
      if (buttonText.includes('save') || buttonText.includes('submit') || buttonText.includes('create')) {
        return 'Save button confirms and stores your changes to the database. Always review your information for accuracy before saving. The system validates required fields and data formats before processing.';
      }
      
      // Cancel buttons
      if (buttonText.includes('cancel') || buttonText.includes('close')) {
        return 'Cancel button closes the current form without saving changes. Any unsaved modifications will be lost. Use this to exit forms when you decide not to proceed with changes.';
      }
      
      return `This ${buttonText || 'action'} button performs a specific operation. Click it to ${buttonText || 'execute the action'} and manage your business operations effectively.`;
    }
    
    // Enhanced Input field guidance
    if (tagName === 'input') {
      if (type === 'search' || placeholder?.toLowerCase().includes('search')) {
        return `Search field for finding specific ${this.getContextualItem()}. Type keywords, product names, customer emails, or order numbers. The search filters results in real-time as you type, making it easy to locate specific items quickly.`;
      }
      
      if (type === 'email') {
        return 'Email input field requires a valid email address format like user@domain.com. This is used for customer communication, order confirmations, and account management. Double-check for typos to ensure proper delivery.';
      }
      
      if (type === 'password') {
        return 'Password field for secure authentication. Enter a strong password with at least 8 characters including letters, numbers, and symbols. The text is hidden for security purposes.';
      }
      
      if (type === 'number' || placeholder?.toLowerCase().includes('price') || placeholder?.toLowerCase().includes('quantity')) {
        return `Numeric input for ${placeholder || 'values like prices or quantities'}. Enter numbers only - use decimal points for prices like 29.99. The system validates minimum and maximum ranges to ensure data accuracy.`;
      }
      
      if (placeholder?.toLowerCase().includes('name')) {
        return `Name field for ${placeholder}. Enter clear, descriptive names that help identify items. For products, use names customers will search for. For categories, use broad terms that logically group related items.`;
      }
      
      return `Input field for ${placeholder || ariaLabel || 'entering information'}. Type the required data accurately as this affects your business operations and customer experience.`;
    }
    
    // Table and data display elements
    if (tagName === 'table' || role === 'table' || className.includes('table')) {
      const context = this.getContextualItem();
      return `Data table displaying your ${context} in organized rows and columns. Sort by clicking column headers, filter using search, and use action buttons for operations like edit or delete. This gives you an overview of all items for efficient management.`;
    }
    
    // Navigation elements
    if (role === 'navigation' || className.includes('nav') || tagName === 'nav') {
      return 'Navigation menu for moving between admin sections. Each link takes you to specific management areas like products, categories, orders, or customers. Use this to quickly access different business functions.';
    }
    
    // Card elements with enhanced context
    if (className.includes('card') || element.closest('.card')) {
      const context = this.getContextualItem();
      return `Information card displaying key details about ${context}. Cards organize related data in digestible sections, making it easier to scan and understand information quickly. Look for action buttons within cards.`;
    }
    
    // Form elements
    if (tagName === 'form') {
      return 'Form for entering and submitting information. Fill all required fields marked with asterisks. Use Tab to navigate between fields efficiently. The form validates input before submission to ensure data quality.';
    }
    
    // Select dropdown elements
    if (tagName === 'select') {
      return 'Dropdown menu for selecting from available options. Click to see all choices and select the most appropriate one. Some dropdowns allow searching by typing the first few letters.';
    }
    
    // Link elements with specific navigation context
    if (tagName === 'a') {
      const href = element.getAttribute('href');
      if (href?.includes('dashboard')) {
        return 'Dashboard link takes you to the main overview with key metrics and recent activity. Your central hub for monitoring business performance and accessing quick actions.';
      }
      if (href?.includes('product')) {
        return 'Products link navigates to inventory management where you can add, edit, and organize your product catalog. Manage pricing, descriptions, images, and stock levels.';
      }
      if (href?.includes('order')) {
        return 'Orders link goes to order management for tracking customer purchases, updating statuses, and managing fulfillment. Critical for processing sales and customer satisfaction.';
      }
      if (href?.includes('customer')) {
        return 'Customers link accesses customer relationship management. View profiles, track purchase history, and analyze buying patterns to improve service and marketing.';
      }
      return `Navigation link to ${text || 'another section'}. Click to access ${text?.toLowerCase() || 'related functionality'} for managing that aspect of your business.`;
    }
    
    // Textarea elements
    if (tagName === 'textarea') {
      return 'Text area for longer descriptions or detailed information. Type multiple lines and paragraphs. Use for product descriptions, category explanations, or detailed notes that require more space.';
    }
    
    return null;
  }

  private getContextualItem(): string {
    const path = window.location.pathname;
    if (path.includes('product')) return 'products';
    if (path.includes('categor')) return 'categories';
    if (path.includes('order')) return 'orders';
    if (path.includes('customer')) return 'customers';
    if (path.includes('inventory')) return 'inventory items';
    if (path.includes('coupon')) return 'coupons';
    if (path.includes('report')) return 'reports';
    if (path.includes('dashboard')) return 'dashboard metrics';
    return 'items';
  }

  async handleElementClick(element: HTMLElement) {
    const guidance = this.getClickGuidance(element);
    if (guidance) {
      setTimeout(() => this.speak(guidance), 200);
    }
  }

  private getClickGuidance(element: HTMLElement): string | null {
    const text = element.textContent?.trim();
    const buttonText = text?.toLowerCase() || '';
    
    if (buttonText.includes('add category')) {
      return 'You clicked Add Category. The form will open for creating a new product category. Enter a clear category name, helpful description, and upload an attractive image. Good categories make product organization easier for both you and customers.';
    }
    
    if (buttonText.includes('add product')) {
      return 'You clicked Add Product. The product creation form will open. Fill in detailed information including name, description, competitive pricing, high-quality images, and accurate stock quantities to attract customers.';
    }
    
    if (buttonText.includes('edit')) {
      return 'You clicked Edit. The modification form will open with current data pre-filled. Review all fields carefully, make necessary updates, and save when complete to keep information current.';
    }
    
    if (buttonText.includes('delete')) {
      return 'You clicked Delete. Confirm you want to permanently remove this item. This action helps maintain a clean, organized system but may not be reversible, so double-check before proceeding.';
    }
    
    if (buttonText.includes('view') || buttonText.includes('details')) {
      return 'You clicked View Details. A comprehensive information panel will open showing all properties and related data, helping you understand the complete context.';
    }
    
    return null;
  }

  async handlePageChange() {
    const newPage = window.location.pathname;
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.lastGuidedElement = null;
      this.elementCache.clear();
      
      setTimeout(() => {
        this.initializePageGuidance();
      }, 300);
    }
  }

  async initializePageGuidance() {
    const page = window.location.pathname;
    const pageGuidance = this.getPageGuidance(page);
    
    if (pageGuidance) {
      await this.speak(pageGuidance);
    }
  }

  private getPageGuidance(path: string): string | null {
    if (path.includes('/admin/dashboard')) {
      return 'Welcome to your admin dashboard - your business command center. The stats cards show key performance metrics, charts display sales trends, and quick action buttons provide shortcuts to common tasks. Hover over any element for detailed guidance on its specific functionality.';
    }
    if (path.includes('/admin/categories')) {
      return 'Category Management page for organizing your products into logical groups. Create new categories with the Add button, edit existing ones to update information, and delete unused categories. Well-organized categories improve customer navigation and inventory management.';
    }
    if (path.includes('/admin/products') || path.includes('/admin/add-product')) {
      return 'Product Management section for controlling your entire inventory catalog. Add new products to expand offerings, edit existing ones to update details, and manage stock levels. Quality product information directly impacts sales and customer satisfaction.';
    }
    if (path.includes('/admin/product-media')) {
      return 'Product Media Management for handling product images, videos, and documents. Upload high-quality media files, organize them into folders, and attach them to products. Good media improves product presentation and conversion rates.';
    }
    if (path.includes('/admin/product-reviews')) {
      return 'Product Reviews Management for monitoring customer feedback. Approve or reject reviews, respond to customer concerns, and use feedback to improve products. Reviews build trust and help customers make informed decisions.';
    }
    if (path.includes('/admin/orders') || path.includes('/admin/order-management')) {
      return 'Order Management page for tracking customer purchases from creation to delivery. Monitor order statuses, update shipping information, and manage customer communications. Efficient order processing builds customer trust and satisfaction.';
    }
    if (path.includes('/admin/customers') || path.includes('/admin/customer-management')) {
      return 'Customer Management page for relationship building and analysis. View customer profiles, track purchase history, and analyze buying patterns. Understanding customers helps provide better service and create targeted marketing campaigns.';
    }
    if (path.includes('/admin/inventory')) {
      return 'Inventory Management page for stock control and monitoring. Track product quantities, receive low stock alerts, and manage reordering. Proper inventory management prevents stockouts and optimizes cash flow.';
    }
    if (path.includes('/admin/marketing') || path.includes('/admin/coupons')) {
      return 'Marketing and Coupon Management section for promotional campaigns and sales growth. Create discount coupons, manage marketing campaigns, and track performance metrics. Effective marketing drives traffic and increases conversions.';
    }
    if (path.includes('/admin/brands')) {
      return 'Brand Management page for organizing products by manufacturer or brand. Create brand profiles, upload logos, and associate products with brands. This helps customers find products from their preferred manufacturers.';
    }
    if (path.includes('/admin/transactions')) {
      return 'Transaction Management page for financial monitoring and payment processing. Track payments, refunds, and revenue analytics. Monitor payment methods and ensure secure transaction processing for customer trust.';
    }
    if (path.includes('/admin/reports')) {
      return 'Reports section for business intelligence and analytics. Analyze sales performance, track key metrics, and identify growth opportunities. Regular report analysis helps make data-driven business decisions.';
    }
    if (path.includes('/admin/settings')) {
      return 'Settings page for system configuration and preferences. Manage user accounts, configure integrations, and customize your admin experience. Proper settings ensure smooth operations and security.';
    }
    
    return 'Admin panel for complete business management. Each section provides tools for specific operations. Hover over elements to learn about their functionality and get practical guidance for business success.';
  }

  highlightElement(element: HTMLElement) {
    // Remove previous highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    // Add highlight to current element (but not buttons to avoid awkward auto-selection)
    if (element.tagName.toLowerCase() !== 'button' && element.getAttribute('role') !== 'button') {
      element.classList.add('voice-trainer-highlight');
      
      // Remove highlight after animation completes
      setTimeout(() => {
        element.classList.remove('voice-trainer-highlight');
      }, 2500);
    }
  }
}

export const voiceTrainer = new VoiceTrainerService();
