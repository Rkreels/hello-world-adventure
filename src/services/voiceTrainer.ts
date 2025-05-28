
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
  private currentModule: string | null = null;
  private currentStep = 0;
  private preferredVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initializeVoice();
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
        'Alex',
        'Samantha',
        'Karen',
        'Daniel'
      ];

      for (const voiceName of preferredVoiceNames) {
        const voice = voices.find(v => v.name.includes(voiceName.split(' ')[1]) || v.name === voiceName);
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
        
        this.currentUtterance.rate = 0.9;
        this.currentUtterance.pitch = 1.0;
        this.currentUtterance.volume = 0.8;

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
    if (this.isPlaying && this.currentUtterance) {
      speechSynthesis.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  async startModuleTraining(moduleId: string) {
    this.stopCurrentSpeech();
    this.currentModule = moduleId;
    this.currentStep = 0;

    const module = this.getTrainingModule(moduleId);
    if (!module) {
      throw new Error(`Training module ${moduleId} not found`);
    }

    await this.speak(`Welcome to ${module.title} training. ${module.description} Let's get started!`);
    setTimeout(() => this.executeNextStep(), 500);
  }

  async executeNextStep() {
    if (!this.currentModule) return null;

    const module = this.getTrainingModule(this.currentModule);
    if (!module || this.currentStep >= module.steps.length) {
      await this.speak("Congratulations! You have completed this training module. You can now explore the features on your own, or select another module to learn more.");
      this.currentModule = null;
      this.currentStep = 0;
      return null;
    }

    const step = module.steps[this.currentStep];
    
    if (step.targetElement) {
      const cursorPos = this.highlightElement(step.targetElement);
      step.cursorPosition = cursorPos;
    }
    
    await this.speak(step.text);
    this.currentStep++;
    
    return step;
  }

  highlightElement(selector: string) {
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    const selectors = [
      selector,
      selector.replace(/\\/g, ''),
      `[data-testid="${selector}"]`,
      selector.replace(/:/g, '\\:')
    ];

    let element: Element | null = null;
    for (const sel of selectors) {
      try {
        element = document.querySelector(sel);
        if (element) break;
      } catch (e) {
        continue;
      }
    }

    if (element) {
      element.classList.add('voice-trainer-highlight');
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    
    return { x: 0, y: 0 };
  }

  getTrainingModule(moduleId: string): TrainingModule | undefined {
    const modules: Record<string, TrainingModule> = {
      dashboard: {
        id: 'dashboard',
        title: 'Dashboard Overview',
        description: 'Learn how to navigate and understand your admin dashboard.',
        steps: [
          {
            id: 'welcome',
            text: 'Welcome to your admin dashboard! This is your command center where you can monitor your business performance at a glance.',
          },
          {
            id: 'stats',
            text: 'These four cards at the top show your key business metrics: total revenue, orders, customers, and products. They update in real-time and show growth percentages.',
            targetElement: '[data-testid="stats-cards"]',
          },
          {
            id: 'chart',
            text: 'This sales chart displays your revenue and order trends over the last 30 days. You can hover over data points to see specific values for each day.',
            targetElement: '[data-testid="sales-chart"]',
          },
          {
            id: 'alerts',
            text: 'The low stock alerts section helps you manage inventory. When products run low, they appear here. Click the restock button to add more inventory.',
            targetElement: '[data-testid="low-stock-alerts"]',
          },
          {
            id: 'actions',
            text: 'Quick actions let you perform common tasks instantly. You can add products, create coupons, or view reports directly from here.',
            targetElement: '[data-testid="quick-actions"]',
          },
        ],
      },
      categories: {
        id: 'categories',
        title: 'Category Management',
        description: 'Learn how to organize your products with categories and perform CRUD operations.',
        steps: [
          {
            id: 'overview',
            text: 'Categories help organize your products and make them easier for customers to find. You can create, edit, and manage all your product categories here.',
          },
          {
            id: 'add',
            text: 'Click the Add Category button to create new product categories. You can add a name, description, and image for each category.',
            targetElement: 'button:has-text("Add Category")',
          },
          {
            id: 'form',
            text: 'In the category form, fill in the category name, description, and upload an image. Make sure the name is unique and descriptive.',
          },
          {
            id: 'search',
            text: 'Use the search bar to quickly find specific categories by typing the category name or description.',
            targetElement: 'input[placeholder*="Search"]',
          },
          {
            id: 'views',
            text: 'Switch between grid view and table view using these tabs. Grid view shows images, while table view provides detailed information.',
            targetElement: '[role="tablist"]',
          },
          {
            id: 'edit',
            text: 'To edit a category, click the edit button on any category card or row. This opens the same form with pre-filled data.',
          },
          {
            id: 'delete',
            text: 'To delete a category, click the delete button. Be careful when deleting categories that contain products - you may need to reassign products first.',
          },
          {
            id: 'bulk',
            text: 'You can select multiple categories using checkboxes and perform bulk operations like delete or status changes.',
          },
        ],
      },
      products: {
        id: 'products',
        title: 'Product Management',
        description: 'Master adding, editing, and managing your product inventory with full CRUD operations.',
        steps: [
          {
            id: 'overview',
            text: 'This is where you manage all your products. You can add new products, edit existing ones, track inventory levels, and set pricing.',
          },
          {
            id: 'add',
            text: 'Click Add New Product to create products for your store. You will need to provide details like name, description, price, and category.',
            targetElement: 'button:has-text("Add New Product")',
          },
          {
            id: 'form-details',
            text: 'In the product form, enter the product name, detailed description, price, and select a category. Make sure all required fields are filled.',
          },
          {
            id: 'form-inventory',
            text: 'Set the initial stock quantity and low stock threshold. The system will alert you when stock falls below this threshold.',
          },
          {
            id: 'form-images',
            text: 'Upload product images to showcase your items. You can upload multiple images and set a primary image.',
          },
          {
            id: 'table',
            text: 'This table shows all your products with important information like stock levels, prices, and status. Products with low stock are highlighted in red.',
            targetElement: 'table',
          },
          {
            id: 'filter',
            text: 'Filter products by category using this dropdown menu to focus on specific product types.',
            targetElement: 'select',
          },
          {
            id: 'search',
            text: 'Use the search function to quickly find specific products by name or description.',
            targetElement: 'input[placeholder*="Search"]',
          },
          {
            id: 'edit-inline',
            text: 'Click the edit button on any product row to modify its details. You can update price, stock, status, and other properties.',
          },
          {
            id: 'stock-management',
            text: 'Monitor stock levels closely. When products show low stock badges, restock them immediately to avoid lost sales.',
          },
          {
            id: 'status-toggle',
            text: 'Toggle product status between active and inactive. Inactive products won\'t be visible to customers in your store.',
          },
          {
            id: 'bulk-operations',
            text: 'Select multiple products using checkboxes to perform bulk operations like status changes, category updates, or bulk delete.',
          },
        ],
      },
      orders: {
        id: 'orders',
        title: 'Order Processing',
        description: 'Learn to efficiently process and manage customer orders with status updates.',
        steps: [
          {
            id: 'overview',
            text: 'Order management is crucial for customer satisfaction. Here you can track, update, and process all customer orders.',
          },
          {
            id: 'status-overview',
            text: 'Order status badges show the current state: yellow for pending, blue for processing, purple for shipped, and green for delivered.',
          },
          {
            id: 'tabs',
            text: 'Use these status tabs to filter orders by their current state. This helps you focus on orders that need attention.',
            targetElement: '[role="tablist"]',
          },
          {
            id: 'order-details',
            text: 'Click on any order to view detailed information including customer details, items ordered, and shipping information.',
          },
          {
            id: 'status-update',
            text: 'Update order status as you process them. Select the new status from the dropdown and add tracking numbers when orders ship.',
          },
          {
            id: 'tracking',
            text: 'When marking orders as shipped, always add tracking numbers. This keeps customers informed about their delivery status.',
          },
          {
            id: 'customer-communication',
            text: 'Use the notes field to add internal comments about orders. This helps team coordination and customer service.',
          },
          {
            id: 'search-orders',
            text: 'Search orders by order ID, customer name, or email to quickly find specific orders.',
          },
          {
            id: 'date-filter',
            text: 'Filter orders by date range to view orders from specific time periods for reporting and analysis.',
          },
        ],
      },
      customers: {
        id: 'customers',
        title: 'Customer Management',
        description: 'Understand and manage your customer relationships and data.',
        steps: [
          {
            id: 'overview',
            text: 'Customer management helps you understand your audience and provide better service. Track customer behavior and manage accounts here.',
          },
          {
            id: 'analytics',
            text: 'Customer analytics show growth trends, loyalty segments, and key metrics about your customer base over time.',
          },
          {
            id: 'directory',
            text: 'The customer directory lists all registered users with their contact information, order history, and account status.',
          },
          {
            id: 'customer-details',
            text: 'Click on any customer to view their complete profile including order history, total spent, and contact preferences.',
          },
          {
            id: 'search',
            text: 'Search for specific customers by name or email address to quickly access their information.',
            targetElement: 'input[placeholder*="Search"]',
          },
          {
            id: 'segments',
            text: 'Customer segments help you understand different types of customers: new, regular, VIP, and inactive customers.',
          },
          {
            id: 'add-customer',
            text: 'Add new customers manually by clicking the Add Customer button and filling in their details.',
          },
          {
            id: 'edit-customer',
            text: 'Edit customer information by clicking the edit button. You can update contact details, preferences, and notes.',
          },
          {
            id: 'customer-orders',
            text: 'View a customer\'s complete order history to understand their buying patterns and preferences.',
          },
          {
            id: 'customer-status',
            text: 'Manage customer account status - active customers can place orders, while inactive accounts are restricted.',
          },
        ],
      },
      inventory: {
        id: 'inventory',
        title: 'Inventory Control',
        description: 'Keep track of stock levels and manage restocking efficiently.',
        steps: [
          {
            id: 'overview',
            text: 'Inventory management ensures you never run out of popular products. Monitor stock levels and get alerts when items run low.',
          },
          {
            id: 'levels',
            text: 'This table shows current stock levels for all products. Red badges indicate items that are below the low stock threshold.',
            targetElement: 'table',
          },
          {
            id: 'alerts',
            text: 'Low stock alerts appear when inventory drops below set thresholds. Take action quickly to avoid stockouts.',
          },
          {
            id: 'restock',
            text: 'Click restock buttons to add more inventory for products running low. Set appropriate restock quantities based on demand.',
            targetElement: 'button:has-text("Restock")',
          },
          {
            id: 'thresholds',
            text: 'Set low stock thresholds for each product to get timely alerts before you run out completely.',
          },
          {
            id: 'batch-restock',
            text: 'Use batch restocking to update multiple products at once. This is efficient for regular inventory updates.',
          },
          {
            id: 'stock-history',
            text: 'View stock movement history to understand product turnover rates and optimize inventory levels.',
          },
          {
            id: 'forecasting',
            text: 'Use sales data to forecast future inventory needs and prevent stockouts during peak periods.',
          },
        ],
      },
      marketing: {
        id: 'marketing',
        title: 'Marketing Tools',
        description: 'Create promotions and discount codes to boost sales with full coupon management.',
        steps: [
          {
            id: 'overview',
            text: 'Marketing tools help you create promotions and discount codes to attract customers and increase sales.',
          },
          {
            id: 'create',
            text: 'Create new coupons with custom discount percentages or fixed amounts. Set minimum order requirements and usage limits.',
            targetElement: 'button:has-text("Create Coupon")',
          },
          {
            id: 'coupon-form',
            text: 'In the coupon form, set the coupon code, discount type (percentage or fixed amount), value, and expiry date.',
          },
          {
            id: 'restrictions',
            text: 'Set minimum order amounts and usage limits to control how coupons are used and prevent abuse.',
          },
          {
            id: 'table',
            text: 'This table shows all your active coupons with usage statistics, expiry dates, and current status.',
            targetElement: 'table',
          },
          {
            id: 'codes',
            text: 'Coupon codes can be customized to be memorable. Share these codes with customers through email or social media.',
          },
          {
            id: 'edit-coupon',
            text: 'Edit existing coupons by clicking the edit button. You can modify expiry dates, usage limits, and status.',
          },
          {
            id: 'copy-code',
            text: 'Click the copy button to quickly copy coupon codes for sharing with customers or in marketing campaigns.',
          },
          {
            id: 'tracking',
            text: 'Track coupon performance to see which promotions are most effective for your business.',
          },
          {
            id: 'deactivate',
            text: 'Deactivate or delete coupons that are no longer needed or have expired to keep your list clean.',
          },
        ],
      },
      reports: {
        id: 'reports',
        title: 'Analytics & Reports',
        description: 'Generate insights and reports to understand your business performance.',
        steps: [
          {
            id: 'overview',
            text: 'Reports and analytics provide valuable insights into your business performance and help you make data-driven decisions.',
          },
          {
            id: 'tabs',
            text: 'Different report types are available: sales performance, product analytics, customer insights, and inventory reports.',
            targetElement: '[role="tablist"]',
          },
          {
            id: 'period',
            text: 'Select different time periods to analyze trends over days, weeks, months, or custom date ranges.',
            targetElement: 'select',
          },
          {
            id: 'charts',
            text: 'Visual charts and graphs make it easy to understand trends and patterns in your business data.',
          },
          {
            id: 'export',
            text: 'Export reports as spreadsheets for further analysis, sharing with team members, or record keeping.',
            targetElement: 'button:has-text("Export")',
          },
          {
            id: 'filters',
            text: 'Apply filters to focus on specific products, categories, or customer segments in your reports.',
          },
          {
            id: 'metrics',
            text: 'Key performance indicators show important metrics like conversion rates, average order value, and customer lifetime value.',
          },
          {
            id: 'comparisons',
            text: 'Compare performance across different time periods to identify trends and measure growth.',
          },
        ],
      },
    };

    return modules[moduleId];
  }

  isTrainingActive(): boolean {
    return this.currentModule !== null;
  }

  stopTraining() {
    this.stopCurrentSpeech();
    this.currentModule = null;
    this.currentStep = 0;
    
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });
  }

  getCurrentModule(): string | null {
    return this.currentModule;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }
}

export const voiceTrainer = new VoiceTrainerService();
