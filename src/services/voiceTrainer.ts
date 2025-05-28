
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
  action?: 'click' | 'hover' | 'focus';
  duration?: number;
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
    // Wait for voices to load
    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      
      // Prefer natural-sounding voices
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

      // Fallback to first English voice
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
    // Stop any currently playing speech
    this.stopCurrentSpeech();

    return new Promise((resolve, reject) => {
      try {
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings for more natural speech
        if (this.preferredVoice) {
          this.currentUtterance.voice = this.preferredVoice;
        }
        
        this.currentUtterance.rate = 0.9; // Slightly slower for clarity
        this.currentUtterance.pitch = 1.0; // Natural pitch
        this.currentUtterance.volume = 0.8; // Comfortable volume

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
    if (!this.currentModule) return;

    const module = this.getTrainingModule(this.currentModule);
    if (!module || this.currentStep >= module.steps.length) {
      await this.speak("Congratulations! You have completed this training module. You can now explore the features on your own, or select another module to learn more.");
      this.currentModule = null;
      this.currentStep = 0;
      return;
    }

    const step = module.steps[this.currentStep];
    
    if (step.targetElement) {
      this.highlightElement(step.targetElement);
    }
    
    await this.speak(step.text);
    this.currentStep++;
  }

  highlightElement(selector: string) {
    // Remove previous highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    // Add highlight to target element with multiple selector attempts
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
    }
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
            targetElement: '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4',
          },
          {
            id: 'chart',
            text: 'This sales chart displays your revenue and order trends over the last 30 days. You can hover over data points to see specific values for each day.',
            targetElement: '.col-span-4',
          },
          {
            id: 'alerts',
            text: 'The low stock alerts section helps you manage inventory. When products run low, they appear here. Click the restock button to add more inventory.',
            targetElement: 'h3:has-text("Low Stock")',
          },
          {
            id: 'actions',
            text: 'Quick actions let you perform common tasks instantly. You can add products, create coupons, or view reports directly from here.',
          },
        ],
      },
      categories: {
        id: 'categories',
        title: 'Category Management',
        description: 'Learn how to organize your products with categories.',
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
            id: 'actions',
            text: 'Each category has action buttons to edit or delete it. Be careful when deleting categories that contain products.',
          },
        ],
      },
      products: {
        id: 'products',
        title: 'Product Management',
        description: 'Master adding, editing, and managing your product inventory.',
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
            id: 'table',
            text: 'This table shows all your products with important information like stock levels, prices, and status. Products with low stock are highlighted.',
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
            id: 'actions',
            text: 'Each product row has action buttons to view details, edit the product, or remove it from your inventory.',
          },
        ],
      },
      orders: {
        id: 'orders',
        title: 'Order Processing',
        description: 'Learn to efficiently process and manage customer orders.',
        steps: [
          {
            id: 'overview',
            text: 'Order management is crucial for customer satisfaction. Here you can track, update, and process all customer orders.',
          },
          {
            id: 'status',
            text: 'Order status badges show the current state: yellow for pending, blue for processing, purple for shipped, and green for delivered.',
          },
          {
            id: 'tabs',
            text: 'Use these status tabs to filter orders by their current state. This helps you focus on orders that need attention.',
            targetElement: '[role="tablist"]',
          },
          {
            id: 'details',
            text: 'Click on any order to view detailed information including customer details, items ordered, and shipping information.',
          },
          {
            id: 'update',
            text: 'Update order status as you process them. Add tracking numbers when orders ship to keep customers informed.',
          },
        ],
      },
      customers: {
        id: 'customers',
        title: 'Customer Management',
        description: 'Understand and manage your customer relationships.',
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
            id: 'search',
            text: 'Search for specific customers by name or email address to quickly access their information.',
            targetElement: 'input[placeholder*="Search"]',
          },
          {
            id: 'segments',
            text: 'Customer segments help you understand different types of customers: new, regular, VIP, and inactive customers.',
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
        ],
      },
      marketing: {
        id: 'marketing',
        title: 'Marketing Tools',
        description: 'Create promotions and discount codes to boost sales.',
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
            id: 'table',
            text: 'This table shows all your active coupons with usage statistics, expiry dates, and current status.',
            targetElement: 'table',
          },
          {
            id: 'codes',
            text: 'Coupon codes are automatically generated, but you can customize them. Share these codes with customers through email or social media.',
          },
          {
            id: 'tracking',
            text: 'Track coupon performance to see which promotions are most effective for your business.',
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
    
    // Remove all highlights
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
