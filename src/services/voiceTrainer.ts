
export interface VoiceTrainerConfig {
  apiKey: string;
  voiceId: string;
  model: string;
}

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
  private config: VoiceTrainerConfig | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentModule: string | null = null;
  private currentStep = 0;

  initialize(config: VoiceTrainerConfig) {
    this.config = config;
  }

  async generateSpeech(text: string): Promise<string> {
    if (!this.config) {
      throw new Error('Voice trainer not initialized');
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + this.config.voiceId, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.config.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: this.config.model,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  async speak(text: string): Promise<void> {
    // Stop any currently playing audio
    this.stopCurrentAudio();

    try {
      const audioUrl = await this.generateSpeech(text);
      this.currentAudio = new Audio(audioUrl);
      this.isPlaying = true;

      return new Promise((resolve, reject) => {
        if (!this.currentAudio) return reject(new Error('No audio'));

        this.currentAudio.onended = () => {
          this.isPlaying = false;
          URL.revokeObjectURL(audioUrl);
          resolve();
        };

        this.currentAudio.onerror = () => {
          this.isPlaying = false;
          reject(new Error('Audio playback failed'));
        };

        this.currentAudio.play().catch(reject);
      });
    } catch (error) {
      this.isPlaying = false;
      throw error;
    }
  }

  stopCurrentAudio() {
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  async startModuleTraining(moduleId: string) {
    this.stopCurrentAudio();
    this.currentModule = moduleId;
    this.currentStep = 0;

    const module = this.getTrainingModule(moduleId);
    if (!module) {
      throw new Error(`Training module ${moduleId} not found`);
    }

    await this.speak(`Welcome to ${module.title} training. ${module.description}`);
    await this.executeNextStep();
  }

  async executeNextStep() {
    if (!this.currentModule) return;

    const module = this.getTrainingModule(this.currentModule);
    if (!module || this.currentStep >= module.steps.length) {
      await this.speak("Training completed! You can now explore the features on your own.");
      this.currentModule = null;
      this.currentStep = 0;
      return;
    }

    const step = module.steps[this.currentStep];
    await this.speak(step.text);

    if (step.targetElement) {
      this.highlightElement(step.targetElement);
    }

    this.currentStep++;
  }

  highlightElement(selector: string) {
    // Remove previous highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    // Add highlight to target element
    const element = document.querySelector(selector);
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
            id: 'stats',
            text: 'These cards show your key business metrics: revenue, orders, customers, and products. They update in real-time.',
            targetElement: '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4',
          },
          {
            id: 'chart',
            text: 'This sales chart shows your revenue trends over time. You can hover over points to see specific values.',
            targetElement: '[data-testid="sales-chart"]',
          },
          {
            id: 'alerts',
            text: 'Low stock alerts help you manage inventory. Click on any alert to restock items.',
            targetElement: '[data-testid="low-stock-alerts"]',
          },
          {
            id: 'actions',
            text: 'Quick actions let you perform common tasks quickly. Try clicking on any action button.',
            targetElement: '[data-testid="quick-actions"]',
          },
        ],
      },
      categories: {
        id: 'categories',
        title: 'Category Management',
        description: 'Learn how to manage product categories in your store.',
        steps: [
          {
            id: 'add',
            text: 'Click the Add Category button to create new product categories for organizing your inventory.',
            targetElement: 'button:has-text("Add Category")',
          },
          {
            id: 'search',
            text: 'Use the search bar to quickly find specific categories by name or description.',
            targetElement: 'input[placeholder="Search categories"]',
          },
          {
            id: 'sort',
            text: 'Sort categories by name, product count, or creation date using these buttons.',
            targetElement: '.flex.gap-2:has(button:has-text("Name"))',
          },
          {
            id: 'views',
            text: 'Switch between grid and table views to see categories in your preferred layout.',
            targetElement: '[role="tablist"]',
          },
        ],
      },
      products: {
        id: 'products',
        title: 'Product Management',
        description: 'Master product creation, editing, and inventory management.',
        steps: [
          {
            id: 'list',
            text: 'This table shows all your products with key information like stock levels and prices.',
            targetElement: 'table',
          },
          {
            id: 'add',
            text: 'Click Add New Product to create products for your store.',
            targetElement: 'button:has-text("Add New Product")',
          },
          {
            id: 'filter',
            text: 'Filter products by category using this dropdown menu.',
            targetElement: 'select:has(option:has-text("All Categories"))',
          },
          {
            id: 'actions',
            text: 'Use these action buttons to view, edit, or delete products.',
            targetElement: 'td:last-child button',
          },
        ],
      },
      orders: {
        id: 'orders',
        title: 'Order Management',
        description: 'Learn to process and manage customer orders effectively.',
        steps: [
          {
            id: 'status',
            text: 'Order status badges show the current state: pending, processing, shipped, or delivered.',
            targetElement: '.bg-yellow-100, .bg-blue-100, .bg-purple-100, .bg-green-100',
          },
          {
            id: 'tabs',
            text: 'Use these tabs to filter orders by status for better organization.',
            targetElement: '[role="tablist"]',
          },
          {
            id: 'export',
            text: 'Export order data for reporting and accounting purposes.',
            targetElement: 'button:has-text("Export")',
          },
        ],
      },
      customers: {
        id: 'customers',
        title: 'Customer Management',
        description: 'Understand your customers and manage their accounts.',
        steps: [
          {
            id: 'analytics',
            text: 'Customer analytics show growth trends and key metrics about your customer base.',
            targetElement: '[data-testid="customer-analytics"]',
          },
          {
            id: 'directory',
            text: 'The customer directory lists all registered users with their contact information.',
            targetElement: '[data-testid="customer-directory"]',
          },
        ],
      },
      inventory: {
        id: 'inventory',
        title: 'Inventory Management',
        description: 'Keep track of stock levels and manage restocking.',
        steps: [
          {
            id: 'levels',
            text: 'This table shows current stock levels for all products. Red badges indicate low stock.',
            targetElement: 'table',
          },
          {
            id: 'restock',
            text: 'Click restock buttons to add more inventory for products running low.',
            targetElement: 'button:has-text("Restock")',
          },
          {
            id: 'search',
            text: 'Search for specific products to quickly check their stock status.',
            targetElement: 'input[placeholder="Search products..."]',
          },
        ],
      },
      marketing: {
        id: 'marketing',
        title: 'Marketing & Coupons',
        description: 'Create discount codes and promotional campaigns.',
        steps: [
          {
            id: 'create',
            text: 'Create new coupons with custom discount percentages or fixed amounts.',
            targetElement: 'button:has-text("Create Coupon")',
          },
          {
            id: 'table',
            text: 'This table shows all your active coupons with usage statistics.',
            targetElement: 'table',
          },
          {
            id: 'copy',
            text: 'Copy coupon codes to share with customers using the copy button.',
            targetElement: 'button:has([data-testid="copy-icon"])',
          },
        ],
      },
      reports: {
        id: 'reports',
        title: 'Reports & Analytics',
        description: 'Generate business reports and analyze performance.',
        steps: [
          {
            id: 'tabs',
            text: 'Different report types: sales, products, customers, and inventory analytics.',
            targetElement: '[role="tablist"]',
          },
          {
            id: 'period',
            text: 'Select time periods to focus your analysis on specific date ranges.',
            targetElement: 'select:has(option:has-text("Last 30 days"))',
          },
          {
            id: 'export',
            text: 'Export reports as spreadsheets for further analysis or record keeping.',
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
    this.stopCurrentAudio();
    this.currentModule = null;
    this.currentStep = 0;
    
    // Remove all highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });
  }
}

export const voiceTrainer = new VoiceTrainerService();
