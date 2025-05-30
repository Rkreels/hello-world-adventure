
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
        
        // Normal speech settings
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
    const placeholder = element.getAttribute('placeholder');
    const type = element.getAttribute('type');
    const dataTestId = element.getAttribute('data-testid');
    const currentPath = window.location.pathname;
    
    // Page-specific context guidance with accurate scenarios
    if (currentPath.includes('/admin/dashboard')) {
      if (dataTestId === 'stats-cards' || className.includes('stats') || element.closest('[data-testid="stats-cards"]')) {
        return 'Dashboard statistics cards showing your business key performance indicators. Total Revenue tracks your income, Total Orders shows completed purchases, Total Customers displays your customer base, and Active Products shows your current inventory. Use these metrics to monitor business growth and identify trends for strategic decisions.';
      }
      
      if (dataTestId === 'sales-chart' || className.includes('chart') || element.closest('[data-testid="sales-chart"]')) {
        return 'Sales performance chart visualizing revenue trends over time. This graph helps you identify peak sales periods, seasonal patterns, and growth opportunities. Use this data to plan inventory purchases, schedule marketing campaigns, and forecast future revenue for business planning.';
      }
      
      if (dataTestId === 'quick-actions' || element.closest('[data-testid="quick-actions"]')) {
        return 'Quick action buttons for common administrative tasks. Add Product creates new inventory items, View Reports accesses analytics, Import Products uploads bulk data, Export Data downloads information, Manage Customers handles customer relationships, and Settings configures system preferences. These shortcuts improve workflow efficiency.';
      }
      
      if (dataTestId === 'low-stock-alerts' || element.closest('[data-testid="low-stock-alerts"]')) {
        return 'Low stock alert system monitoring inventory levels. This section warns when products are running low, helping prevent stockouts that could lose sales. Monitor these alerts regularly to maintain adequate inventory and ensure customer satisfaction by reordering before items become unavailable.';
      }
    }

    // Enhanced button guidance with specific page context
    if (tagName === 'button' || role === 'button') {
      const buttonText = text?.toLowerCase() || '';
      
      if (currentPath.includes('/admin/add-product') || currentPath.includes('/admin/products')) {
        if (buttonText.includes('save') || buttonText.includes('create') || buttonText.includes('add')) {
          return 'Save Product button stores your new product information to the database. Ensure all required fields are completed: product name, description, price, category, and at least one image. The system validates data before saving to maintain catalog quality and consistency.';
        }
        if (buttonText.includes('upload') || buttonText.includes('image')) {
          return 'Image Upload button adds product photos to showcase items to customers. High-quality images increase conversion rates. Upload multiple angles, detail shots, and lifestyle images. Supported formats include JPG, PNG, and WebP with recommended size of 1200x1200 pixels for optimal display.';
        }
      }
      
      if (currentPath.includes('/admin/categories')) {
        if (buttonText.includes('add category')) {
          return 'Add Category button creates new product groupings for better organization. Categories help customers navigate your store and find related products easily. Examples include Electronics, Clothing, Home & Garden, or Books. Good categorization improves user experience and search engine optimization.';
        }
      }
      
      if (currentPath.includes('/admin/product-media')) {
        if (buttonText.includes('upload') || buttonText.includes('media')) {
          return 'Media Upload button manages product images, videos, and documents. Organize media files into folders, compress images for faster loading, and maintain consistent naming conventions. This centralized media management improves site performance and makes content organization efficient.';
        }
      }
      
      if (currentPath.includes('/admin/product-reviews')) {
        if (buttonText.includes('approve')) {
          return 'Approve Review button publishes customer feedback to your product pages. Approved reviews build trust with potential customers and provide social proof. Review content for appropriateness and authenticity before approval to maintain quality standards and credibility.';
        }
        if (buttonText.includes('reject')) {
          return 'Reject Review button prevents inappropriate or fake reviews from appearing publicly. Use this for spam, offensive content, or reviews that violate your guidelines. Maintaining review quality protects your brand reputation and ensures helpful feedback for customers.';
        }
      }
      
      if (currentPath.includes('/admin/coupons') || currentPath.includes('/admin/marketing')) {
        if (buttonText.includes('create') || buttonText.includes('add')) {
          return 'Create Coupon button generates discount codes for marketing campaigns. Set discount percentages or fixed amounts, expiration dates, usage limits, and applicable products. Effective coupons drive sales, attract new customers, and encourage repeat purchases while maintaining profitability.';
        }
      }
      
      if (currentPath.includes('/admin/transactions')) {
        if (buttonText.includes('refund')) {
          return 'Process Refund button initiates money return to customers for returned items or service issues. Refunds maintain customer satisfaction and trust. Document refund reasons for analysis and ensure compliance with your return policy and payment processor requirements.';
        }
        if (buttonText.includes('export')) {
          return 'Export Transactions button downloads payment data for accounting and analysis. Generate reports for tax filing, reconciliation with bank statements, and financial analysis. Export formats include CSV and Excel for integration with accounting software.';
        }
      }
      
      // Generic button guidance with context
      if (buttonText.includes('edit')) {
        return `Edit button modifies existing ${this.getContextualItem()}. Opens a pre-filled form with current data for updates. Common edits include price adjustments for sales, description improvements for clarity, and stock level updates after receiving shipments.`;
      }
      
      if (buttonText.includes('delete') || buttonText.includes('remove')) {
        return `Delete button permanently removes ${this.getContextualItem()} from your system. This action cannot be undone. Use carefully for discontinued products, obsolete categories, or cancelled orders to maintain clean, organized data.`;
      }
    }
    
    // Enhanced input field guidance with page context
    if (tagName === 'input') {
      if (currentPath.includes('/admin/add-product') || currentPath.includes('/admin/products')) {
        if (placeholder?.toLowerCase().includes('name') || type === 'text') {
          return 'Product Name field for the item title customers will see. Use descriptive, searchable names that include key features and benefits. Good examples: "Wireless Bluetooth Headphones with Noise Cancellation" or "Organic Cotton T-Shirt - Unisex". Avoid vague names like "Item 1" or "Product".';
        }
        if (placeholder?.toLowerCase().includes('price') || type === 'number') {
          return 'Price field for product cost in your store currency. Research competitor pricing and consider your profit margins. Include decimal points for precise pricing like 29.99. Consider psychological pricing strategies and ensure prices cover all costs plus desired profit.';
        }
        if (placeholder?.toLowerCase().includes('description')) {
          return 'Product Description field for detailed item information. Include key features, benefits, specifications, materials, and usage instructions. Good descriptions help customers make informed decisions and reduce returns. Use bullet points for easy scanning and include SEO keywords.';
        }
      }
      
      if (currentPath.includes('/admin/categories')) {
        if (placeholder?.toLowerCase().includes('name')) {
          return 'Category Name field for grouping related products. Use broad, intuitive terms customers would search for. Examples: "Electronics", "Home & Garden", "Clothing & Accessories". Avoid overly specific names that limit product inclusion or confuse navigation.';
        }
      }
      
      if (type === 'search') {
        return `Search field for finding specific ${this.getContextualItem()}. Type keywords, product names, SKUs, or customer information. The search filters results in real-time, making it easy to locate items quickly in large databases.`;
      }
    }
    
    // Table and data display elements with context
    if (tagName === 'table' || role === 'table' || className.includes('table')) {
      const context = this.getContextualItem();
      return `Data table displaying ${context} in organized columns and rows. Sort by clicking column headers, filter using search functionality, and use action buttons for operations. This view provides comprehensive oversight for efficient ${context} management.`;
    }
    
    return null;
  }

  private getContextualItem(): string {
    const path = window.location.pathname;
    if (path.includes('/admin/add-product') || path.includes('/admin/products')) return 'products';
    if (path.includes('/admin/categories')) return 'categories';
    if (path.includes('/admin/orders')) return 'orders';
    if (path.includes('/admin/customers')) return 'customers';
    if (path.includes('/admin/inventory')) return 'inventory items';
    if (path.includes('/admin/coupons') || path.includes('/admin/marketing')) return 'marketing campaigns';
    if (path.includes('/admin/product-reviews')) return 'product reviews';
    if (path.includes('/admin/product-media')) return 'media files';
    if (path.includes('/admin/transactions')) return 'financial transactions';
    if (path.includes('/admin/brands')) return 'brand information';
    if (path.includes('/admin/reports')) return 'business reports';
    if (path.includes('/admin/dashboard')) return 'dashboard metrics';
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
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/admin/add-product')) {
      if (buttonText.includes('save') || buttonText.includes('create')) {
        return 'You clicked Save Product. The system will validate all required fields, process uploaded images, and create the new product in your catalog. Ensure product information is accurate as this affects customer purchasing decisions and search results.';
      }
    }
    
    if (currentPath.includes('/admin/categories')) {
      if (buttonText.includes('add category')) {
        return 'You clicked Add Category. The category creation form will open. Enter a clear, descriptive category name and optional description. Well-organized categories improve customer navigation and help with inventory management and reporting.';
      }
    }
    
    if (currentPath.includes('/admin/product-reviews')) {
      if (buttonText.includes('approve')) {
        return 'You clicked Approve Review. This customer feedback will become visible on the product page, helping future customers make informed decisions. Approved reviews build trust and credibility for your store.';
      }
      if (buttonText.includes('reject')) {
        return 'You clicked Reject Review. This review will not appear publicly. Use this action for inappropriate content, spam, or reviews that violate your community guidelines to maintain quality standards.';
      }
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
      return 'Welcome to your Admin Dashboard - your business command center. Monitor key performance indicators through stats cards, analyze sales trends with interactive charts, access quick action shortcuts, and review low stock alerts. Each section provides real-time insights for informed business decisions.';
    }
    if (path.includes('/admin/add-product')) {
      return 'Add Product page for expanding your inventory catalog. Fill in comprehensive product details including name, description, competitive pricing, high-quality images, stock quantities, and category assignment. Complete product information improves search visibility and customer conversion rates.';
    }
    if (path.includes('/admin/products') || path.includes('/admin/product-list')) {
      return 'Product Management section for controlling your entire inventory. View all products in organized tables, edit existing items to update information, manage stock levels, and remove discontinued products. Efficient product management directly impacts sales performance and customer satisfaction.';
    }
    if (path.includes('/admin/categories')) {
      return 'Category Management for organizing products into logical groups. Create new categories for better navigation, edit existing ones to improve clarity, and maintain organized product groupings. Well-structured categories enhance customer experience and simplify inventory management.';
    }
    if (path.includes('/admin/product-media')) {
      return 'Product Media Management for handling images, videos, and documents. Upload high-quality product photos from multiple angles, organize media files efficiently, and maintain consistent visual presentation. Quality media significantly impacts customer purchasing decisions and brand perception.';
    }
    if (path.includes('/admin/product-reviews')) {
      return 'Product Reviews Management for customer feedback oversight. Review and approve authentic customer testimonials, reject inappropriate content, and maintain quality standards. Customer reviews build trust, provide social proof, and help potential buyers make informed purchasing decisions.';
    }
    if (path.includes('/admin/coupons') || path.includes('/admin/marketing')) {
      return 'Marketing and Coupon Management for promotional campaigns. Create discount codes with specific terms, set expiration dates and usage limits, and track campaign performance. Strategic promotions drive sales, attract new customers, and increase customer loyalty.';
    }
    if (path.includes('/admin/transactions')) {
      return 'Transaction Management for financial oversight and payment processing. Monitor all payment activities, process refunds when necessary, track revenue metrics, and export financial data for accounting. Proper transaction management ensures financial accuracy and customer trust.';
    }
    if (path.includes('/admin/brands')) {
      return 'Brand Management for organizing products by manufacturer. Create brand profiles with logos and descriptions, associate products with appropriate brands, and maintain consistent brand representation. Brand organization helps customers find preferred manufacturers and improves product discovery.';
    }
    
    return 'Admin panel section for business management. Each area provides specialized tools for specific operations. Hover over interface elements to receive detailed guidance about functionality and best practices for successful business operations.';
  }

  highlightElement(element: HTMLElement) {
    // Remove previous highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    // Add highlight to current element (excluding buttons to avoid awkward selection)
    if (element.tagName.toLowerCase() !== 'button' && element.getAttribute('role') !== 'button') {
      element.classList.add('voice-trainer-highlight');
      
      setTimeout(() => {
        element.classList.remove('voice-trainer-highlight');
      }, 2500);
    }
  }
}

export const voiceTrainer = new VoiceTrainerService();
