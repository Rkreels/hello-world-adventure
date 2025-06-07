
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
    
    // Dashboard-specific guidance
    if (currentPath.includes('/admin/dashboard')) {
      if (dataTestId === 'stats-cards' || className.includes('stats') || element.closest('[data-testid="stats-cards"]')) {
        return 'Dashboard statistics overview showing key business metrics. Total Revenue displays your income, Total Orders shows customer purchases, Total Customers counts your user base, and Active Products tracks inventory. These metrics update in real-time to help monitor business performance and identify growth trends.';
      }
      
      if (dataTestId === 'sales-chart' || className.includes('chart') || element.closest('[data-testid="sales-chart"]')) {
        return 'Sales performance chart displaying revenue and order trends over time. This interactive visualization helps identify peak sales periods, seasonal patterns, and growth opportunities. Use this data for inventory planning, marketing campaigns, and business forecasting.';
      }
      
      if (dataTestId === 'quick-actions' || element.closest('[data-testid="quick-actions"]')) {
        return 'Quick action shortcuts for common administrative tasks. Add Product creates new inventory items, View Reports accesses analytics dashboard, Import Products handles bulk uploads, Export Data downloads reports, Manage Customers handles user accounts, and Settings configures system preferences.';
      }
      
      if (dataTestId === 'low-stock-alerts' || element.closest('[data-testid="low-stock-alerts"]')) {
        return 'Inventory monitoring system showing products with low stock levels. This alert system prevents stockouts by notifying when items fall below threshold levels. Click Restock buttons to update inventory or review detailed stock information.';
      }

      // Specific dashboard buttons
      if (tagName === 'button' && text) {
        const buttonText = text.toLowerCase();
        if (buttonText.includes('add product')) {
          return 'Add Product button navigates to the product creation form where you can add new items to your inventory with details, images, pricing, and categories.';
        }
        if (buttonText.includes('view reports')) {
          return 'View Reports button opens the analytics dashboard with detailed business insights, sales data, customer behavior, and performance metrics.';
        }
        if (buttonText.includes('import products')) {
          return 'Import Products button allows bulk product uploads via CSV or Excel files, streamlining inventory management for large catalogs.';
        }
        if (buttonText.includes('export data')) {
          return 'Export Data button downloads business information in various formats for accounting, analysis, or backup purposes.';
        }
        if (buttonText.includes('manage customers')) {
          return 'Manage Customers button opens customer relationship management tools for viewing profiles, order history, and communication.';
        }
        if (buttonText.includes('settings')) {
          return 'Settings button accesses system configuration options including payment methods, shipping, taxes, and store preferences.';
        }
        if (buttonText.includes('restock')) {
          return 'Restock button updates inventory levels for low-stock items. Click to add quantities and maintain adequate stock levels.';
        }
      }
    }

    // Enhanced guidance for other pages
    if (currentPath.includes('/admin/add-product') || currentPath.includes('/admin/products')) {
      if (tagName === 'input') {
        if (placeholder?.toLowerCase().includes('name') || type === 'text') {
          return 'Product Name field for the item title customers will see in search results and listings. Use descriptive, keyword-rich names that clearly identify the product and its key features.';
        }
        if (placeholder?.toLowerCase().includes('price') || type === 'number') {
          return 'Price field for setting product cost. Consider competitor pricing, profit margins, and psychological pricing strategies. Include decimals for precise pricing.';
        }
        if (placeholder?.toLowerCase().includes('stock') || placeholder?.toLowerCase().includes('quantity')) {
          return 'Stock Quantity field for inventory management. Set initial stock levels and enable low-stock alerts to prevent stockouts.';
        }
      }
      if (tagName === 'textarea' || placeholder?.toLowerCase().includes('description')) {
        return 'Product Description area for detailed item information. Include features, benefits, specifications, materials, and usage instructions to help customers make informed decisions.';
      }
      if (tagName === 'select' || role === 'combobox') {
        return 'Category selection dropdown for organizing products into logical groups. Choose appropriate categories to improve navigation and searchability.';
      }
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('save') || buttonText.includes('create') || buttonText.includes('add')) {
          return 'Save Product button stores your new item in the catalog. Ensure all required fields are completed before saving.';
        }
        if (buttonText.includes('upload') || buttonText.includes('image')) {
          return 'Image Upload button adds product photos. High-quality images from multiple angles increase conversion rates and reduce returns.';
        }
      }
    }

    if (currentPath.includes('/admin/categories')) {
      if (tagName === 'button') {
        const buttonText = text?.toLowerCase() || '';
        if (buttonText.includes('add category')) {
          return 'Add Category button creates new product groupings for better organization and navigation. Categories help customers find related products easily.';
        }
        if (buttonText.includes('edit')) {
          return 'Edit Category button modifies existing category information including name, description, and associated products.';
        }
        if (buttonText.includes('delete')) {
          return 'Delete Category button permanently removes categories. Ensure no products are assigned before deletion.';
        }
      }
      if (tagName === 'input' && placeholder?.toLowerCase().includes('name')) {
        return 'Category Name field for creating product groups. Use broad, intuitive terms that customers would naturally search for.';
      }
    }

    // Generic guidance for common elements
    if (tagName === 'button' || role === 'button') {
      const buttonText = text?.toLowerCase() || '';
      if (buttonText.includes('edit')) {
        return `Edit button modifies existing ${this.getContextualItem()}. Opens a form with current data for updates and changes.`;
      }
      if (buttonText.includes('delete') || buttonText.includes('remove')) {
        return `Delete button permanently removes ${this.getContextualItem()} from the system. This action cannot be undone.`;
      }
      if (buttonText.includes('view') || buttonText.includes('details')) {
        return `View Details button displays comprehensive information about ${this.getContextualItem()} including full specifications and history.`;
      }
    }
    
    if (type === 'search') {
      return `Search field for finding specific ${this.getContextualItem()}. Type keywords to filter results in real-time.`;
    }
    
    if (tagName === 'table' || role === 'table' || className.includes('table')) {
      const context = this.getContextualItem();
      return `Data table displaying ${context} in organized rows and columns. Sort by clicking headers, use pagination for large datasets, and access actions for each item.`;
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
    
    if (currentPath.includes('/admin/dashboard')) {
      if (buttonText.includes('add product')) {
        return 'Navigating to Add Product page where you can create new inventory items with comprehensive details and images.';
      }
      if (buttonText.includes('view reports')) {
        return 'Opening Reports dashboard with detailed analytics, sales metrics, and business intelligence insights.';
      }
      if (buttonText.includes('restock')) {
        return 'Inventory updated successfully. The low stock alert has been resolved and stock levels are now adequate.';
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
      return 'Welcome to your Admin Dashboard. Monitor business performance through statistics cards, analyze sales trends with interactive charts, access quick action shortcuts for common tasks, and review inventory alerts. This central hub provides real-time insights for effective business management.';
    }
    if (path.includes('/admin/add-product')) {
      return 'Add Product page for expanding your catalog. Complete all product details including name, description, pricing, images, stock quantities, and category selection. Comprehensive product information improves search visibility and customer conversion rates.';
    }
    if (path.includes('/admin/products') || path.includes('/admin/product-list')) {
      return 'Product Management section for inventory control. View, edit, and manage all products in organized tables. Update pricing, stock levels, descriptions, and remove discontinued items to maintain an optimized catalog.';
    }
    if (path.includes('/admin/categories')) {
      return 'Category Management for product organization. Create logical product groups, edit existing categories, and maintain structured navigation. Well-organized categories improve customer experience and simplify inventory management.';
    }
    if (path.includes('/admin/product-media')) {
      return 'Product Media Management for visual content. Upload high-quality images, organize media files, and maintain consistent product presentation. Quality visuals significantly impact customer purchasing decisions.';
    }
    if (path.includes('/admin/product-reviews')) {
      return 'Product Reviews Management for customer feedback. Review and approve authentic testimonials, moderate content, and maintain quality standards. Customer reviews build trust and provide valuable social proof.';
    }
    if (path.includes('/admin/coupons') || path.includes('/admin/marketing')) {
      return 'Marketing and Coupon Management for promotional campaigns. Create discount codes, set usage limits, track performance, and drive sales through strategic promotions and customer incentives.';
    }
    if (path.includes('/admin/transactions')) {
      return 'Transaction Management for financial oversight. Monitor payments, process refunds, track revenue, and export financial data for accounting. Comprehensive transaction management ensures financial accuracy.';
    }
    if (path.includes('/admin/brands')) {
      return 'Brand Management for manufacturer organization. Create brand profiles, associate products, and maintain consistent brand representation throughout your catalog for improved product discovery.';
    }
    
    return 'Admin panel section for business management. Each area provides specialized tools for specific operations. Hover over elements to receive detailed guidance about functionality and best practices.';
  }
}

export const voiceTrainer = new VoiceTrainerService();
