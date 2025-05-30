
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
        
        // Optimized speech settings for clarity and speed
        this.currentUtterance.rate = 1.1;
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
    // Create a more specific identifier
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const id = element.id;
    const text = element.textContent?.trim().substring(0, 30) || '';
    const role = element.getAttribute('role');
    const ariaLabel = element.getAttribute('aria-label');
    
    return `${tagName}-${id || className.split(' ')[0] || role || text}`;
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
    
    // Enhanced Button elements with detailed use cases
    if (tagName === 'button' || role === 'button') {
      if (text?.toLowerCase().includes('add')) {
        return `This is an Add button for creating new ${this.getContextualItem()}. Click it to open a creation form where you can enter details like name, description, and other properties. For example, adding a new category helps organize your products better, while adding products expands your inventory. This is essential for growing your business catalog.`;
      }
      if (text?.toLowerCase().includes('edit')) {
        return `This is an Edit button for modifying existing ${this.getContextualItem()}. Click it to open a form pre-filled with current data that you can update. For example, you might edit a product to update its price, change the description, or modify stock levels. This helps keep your information current and accurate.`;
      }
      if (text?.toLowerCase().includes('delete')) {
        return `This is a Delete button for removing ${this.getContextualItem()}. Use this carefully as it permanently removes items from your system. For example, delete outdated products, unused categories, or cancelled orders. Always double-check before deleting as this action may not be reversible.`;
      }
      if (text?.toLowerCase().includes('save') || text?.toLowerCase().includes('submit')) {
        return `This is a Save button to confirm and store your changes. Click it after filling out the form completely. The system will validate your input and save the data to the database. Always review your information before saving to ensure accuracy.`;
      }
      if (text?.toLowerCase().includes('cancel')) {
        return `This is a Cancel button to close the current form without saving any changes. Use this if you want to discard your edits or exit the form. Any unsaved changes will be lost, so make sure you don't need to keep your modifications.`;
      }
      if (text?.toLowerCase().includes('view') || text?.toLowerCase().includes('details')) {
        return `This is a View Details button to see comprehensive information about this ${this.getContextualItem()}. Click it to open a detailed view with all properties, related data, and available actions. This helps you understand the complete context before making decisions.`;
      }
      if (text?.toLowerCase().includes('export')) {
        return `This is an Export button to download your data in various formats like CSV or PDF. Use this to create backups, share data with others, or analyze information in external tools. For example, export product lists for inventory analysis or customer data for marketing campaigns.`;
      }
      if (text?.toLowerCase().includes('import')) {
        return `This is an Import button to upload data from external files. Use this to bulk add products, update inventory, or migrate data from other systems. Make sure your file format matches the required template to avoid errors.`;
      }
      return `This is a ${text || 'action'} button. Click it to ${text?.toLowerCase() || 'perform an action'}. Buttons trigger specific actions that help you manage your business operations efficiently.`;
    }
    
    // Enhanced Input elements with specific guidance
    if (tagName === 'input') {
      if (type === 'search' || placeholder?.toLowerCase().includes('search')) {
        return `This is a search box for quickly finding specific ${this.getContextualItem()}. Type keywords, names, or IDs to filter results instantly. For example, search for product names, customer emails, or order numbers. Use partial matches - typing "phone" will find "Smartphone" and "Headphones".`;
      }
      if (type === 'email') {
        return `This is an email input field. Enter a valid email address in the format user@domain.com. This is used for customer communication, order confirmations, and account management. Double-check for typos as incorrect emails prevent important notifications.`;
      }
      if (type === 'password') {
        return `This is a password field for secure authentication. Enter a strong password with at least 8 characters, including letters, numbers, and symbols. The text is hidden for security. Use a unique password that you don't use elsewhere.`;
      }
      if (type === 'number') {
        return `This is a number input field for ${placeholder || 'numeric values'}. Enter only numbers - for example, product prices, quantities, or percentages. Use decimal points for prices like 29.99. The system may have minimum and maximum limits.`;
      }
      if (type === 'tel') {
        return `This is a phone number field. Enter a valid phone number including area code. For example, +1-555-123-4567 or (555) 123-4567. This is used for customer contact and order communication.`;
      }
      if (placeholder?.toLowerCase().includes('name')) {
        return `This is a name input field for ${placeholder}. Enter a clear, descriptive name that helps identify this item. For products, use names that customers will search for. For categories, use broad terms that group related items logically.`;
      }
      return `This is an input field for ${placeholder || ariaLabel || 'information'}. Click here and type the required information. Ensure accuracy as this data affects your business operations and customer experience.`;
    }
    
    // Enhanced Table and data display elements
    if (tagName === 'table' || role === 'table' || className.includes('table')) {
      return `This is a data table displaying your ${this.getContextualItem()} in an organized format. Each row represents one item, and columns show different properties. You can sort columns by clicking headers, filter data using search, and perform actions like edit or delete on individual rows. Use this to get an overview of your data and manage multiple items efficiently.`;
    }
    
    // Enhanced Navigation elements
    if (role === 'navigation' || className.includes('nav') || tagName === 'nav') {
      return `This is the navigation menu for moving between different sections of your admin panel. Each link takes you to a specific management area like products, categories, orders, or customers. Use this to quickly switch between different business functions and access the tools you need.`;
    }
    
    // Enhanced Card elements with context
    if (className.includes('card') || element.closest('.card')) {
      return `This is an information card displaying key details about ${this.getContextualItem()}. Cards organize related information in digestible chunks, making it easier to scan and understand data quickly. Look for action buttons within the card to perform operations on this specific item.`;
    }
    
    // Stats and metrics cards
    if (className.includes('stats') || text?.includes('$') || text?.includes('%')) {
      return `This is a statistics card showing important business metrics. These numbers help you track performance, identify trends, and make informed decisions. For example, revenue cards show earnings, order cards track sales volume, and growth percentages indicate business progress over time.`;
    }
    
    // Form elements with detailed guidance
    if (tagName === 'form') {
      return `This is a form for entering and submitting information. Fill out all required fields marked with asterisks. Use the Tab key to move between fields efficiently. The form validates your input before submission to ensure data quality. Review everything before clicking the submit button.`;
    }
    
    // Enhanced Select elements
    if (tagName === 'select') {
      return `This is a dropdown menu for selecting from available options. Click to see all choices and select the most appropriate one. For example, choose product categories, order statuses, or customer types. Some dropdowns allow searching by typing the first few letters.`;
    }
    
    // Enhanced Link elements with context
    if (tagName === 'a') {
      const href = element.getAttribute('href');
      if (href?.includes('dashboard')) {
        return `This link takes you to the main dashboard with overview metrics and recent activity. Use this as your starting point to get a quick view of your business status and access quick actions.`;
      }
      if (href?.includes('product')) {
        return `This link navigates to product management where you can add, edit, and organize your product catalog. This is where you manage inventory, pricing, and product information.`;
      }
      if (href?.includes('order')) {
        return `This link goes to order management where you can track customer orders, update statuses, and manage fulfillment. Critical for processing sales and maintaining customer satisfaction.`;
      }
      return `This link navigates to ${text || 'another section'}. Click to access ${text?.toLowerCase() || 'related functionality'} and manage that aspect of your business.`;
    }
    
    // Textarea elements
    if (tagName === 'textarea') {
      return `This is a text area for entering longer descriptions or detailed information. You can type multiple lines and paragraphs. For example, use this for product descriptions, category explanations, or customer notes. Be descriptive but concise to help users understand the content.`;
    }
    
    // Chart and visualization elements
    if (className.includes('chart') || element.querySelector('svg') || className.includes('recharts')) {
      return `This is a chart or graph displaying your business data visually. Charts help you identify trends, compare performance, and spot patterns quickly. Hover over data points for detailed information. Use these insights to make informed business decisions and track progress over time.`;
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
    return 'items';
  }

  async handleElementClick(element: HTMLElement) {
    const guidance = this.getClickGuidance(element);
    if (guidance) {
      // Brief pause then guide with faster response
      setTimeout(() => this.speak(guidance), 300);
    }
  }

  private getClickGuidance(element: HTMLElement): string | null {
    const text = element.textContent?.trim();
    
    if (text?.includes('Add Category')) {
      return `Excellent! You're creating a new category. Categories help organize your products logically. Fill in a clear name like "Electronics" or "Clothing", add a helpful description, and upload an attractive image. Good categories make it easier for customers to find products and for you to manage inventory.`;
    }
    if (text?.includes('Add Product')) {
      return `Perfect! You're adding a new product to your catalog. This expands your business offerings. Enter detailed product information including name, description, price, and stock quantity. High-quality images and accurate descriptions increase sales and reduce customer questions.`;
    }
    if (text?.includes('Edit')) {
      return `Great choice! You're updating existing information. This keeps your data current and accurate. Review all fields carefully, make necessary changes, and save when done. Regular updates ensure customers see the latest information and pricing.`;
    }
    if (text?.includes('Delete')) {
      return `You're removing this item permanently. This action helps maintain a clean, organized system by removing outdated or unnecessary items. Double-check that you really want to delete this before confirming, as it may not be recoverable.`;
    }
    if (text?.includes('View') || text?.includes('Details')) {
      return `You're opening detailed information. This comprehensive view shows all properties and related data, helping you understand the complete context before making decisions or edits.`;
    }
    
    return null;
  }

  async handlePageChange() {
    const newPage = window.location.pathname;
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.lastGuidedElement = null; // Reset element tracking
      this.elementCache.clear(); // Clear cache for new page
      
      // Immediate guidance with faster response
      setTimeout(() => {
        this.initializePageGuidance();
      }, 800);
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
      return `Welcome to your comprehensive admin dashboard! This is your business command center showing key performance metrics, recent activity, and quick actions. The stats cards at the top display revenue, orders, customers, and products - these numbers reflect your business health. Use the charts to identify trends and the quick action buttons to perform common tasks efficiently. Hover over any element for detailed guidance on how to use it effectively.`;
    }
    if (path.includes('/admin/categories')) {
      return `You're now in Category Management - the foundation of product organization! Here you organize products into logical groups that help customers navigate your store easily. You can create new categories with the Add button, edit existing ones to update names or descriptions, and delete unused categories. Well-organized categories improve customer experience and make inventory management much easier. Think of categories like store aisles - they should be intuitive and comprehensive.`;
    }
    if (path.includes('/admin/products')) {
      return `Welcome to Product Management - your inventory control center! This is where you manage your entire product catalog that customers see and purchase. Add new products to expand your offerings, edit existing ones to update prices or descriptions, and track inventory levels. Each product needs a clear name, detailed description, competitive pricing, and attractive images. Good product management directly impacts sales and customer satisfaction.`;
    }
    if (path.includes('/admin/orders')) {
      return `You're in Order Management - the heart of your sales operations! Here you track every customer purchase from creation to delivery. Monitor order statuses, update shipping information, process payments, and handle customer communications. Quick order processing improves customer satisfaction and builds trust. Use filters to find specific orders and actions to update their progress through fulfillment.`;
    }
    if (path.includes('/admin/customers')) {
      return `This is Customer Management - your relationship hub! View customer profiles, track purchase history, analyze buying patterns, and manage customer communications. Understanding your customers helps you provide better service, create targeted marketing campaigns, and build loyalty. Use customer data to identify your best buyers and opportunities for growth.`;
    }
    if (path.includes('/admin/inventory')) {
      return `Welcome to Inventory Management - your stock control system! Monitor product quantities, get low stock alerts, track product movements, and manage reordering. Proper inventory management prevents stockouts that lose sales and overstocking that ties up capital. Set up automatic alerts for low stock items to maintain optimal inventory levels.`;
    }
    if (path.includes('/admin/marketing')) {
      return `You're in the Marketing section - your sales growth engine! Create promotional campaigns, manage discount coupons, track marketing performance, and boost sales with targeted offers. Effective marketing drives traffic, increases conversions, and builds customer loyalty. Use coupons strategically to encourage purchases and reward customer loyalty.`;
    }
    if (path.includes('/admin/reports')) {
      return `This is the Reports section - your business intelligence center! Analyze sales performance, track key metrics, identify trends, and make data-driven decisions. Reports show you what's working, what needs improvement, and where opportunities exist. Regular report analysis helps you understand your business performance and plan for growth.`;
    }
    if (path.includes('/admin/settings')) {
      return `You're in Settings - your system configuration area! Manage user accounts, configure system preferences, set up integrations, and customize your admin experience. Proper settings ensure smooth operations and security. Review settings regularly to optimize performance and maintain security standards.`;
    }
    
    return `You're now in the admin panel - your complete business management system! This powerful interface gives you control over every aspect of your online business. Each section is designed to help you manage specific operations efficiently. Hover over any element to learn about its functionality and get practical guidance on how to use it effectively for your business success.`;
  }

  highlightElement(element: HTMLElement) {
    // Remove previous highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    // Add highlight to current element
    element.classList.add('voice-trainer-highlight');
    
    // Remove highlight after animation completes
    setTimeout(() => {
      element.classList.remove('voice-trainer-highlight');
    }, 2500);
  }
}

export const voiceTrainer = new VoiceTrainerService();
