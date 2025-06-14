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

  async speak(text: string): Promise<void> {
    this.stopCurrentSpeech();

    return new Promise((resolve, reject) => {
      try {
        // Check if speech synthesis is available
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
          
          // Retry with fallback approach
          if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            setTimeout(() => {
              this.speak(text).then(resolve).catch(reject);
            }, 500);
          } else {
            console.error('Speech synthesis failed after retries');
            resolve(); // Don't reject to avoid breaking the app
          }
        };

        speechSynthesis.speak(this.currentUtterance);
      } catch (error) {
        this.isPlaying = false;
        console.error('Speech synthesis setup error:', error);
        resolve(); // Don't reject to avoid breaking the app
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

  private getModalGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.tagName.toLowerCase() === 'button') {
      if (text?.toLowerCase().includes('close') || text?.toLowerCase().includes('cancel')) {
        return 'Close button - Click to dismiss this dialog and return to the previous view.';
      }
      if (text?.toLowerCase().includes('save') || text?.toLowerCase().includes('confirm')) {
        return 'Confirm button - Click to save changes and proceed with the action.';
      }
    }
    return 'Interactive modal dialog element. Use Tab to navigate between options, Enter to select, or Escape to close.';
  }

  private getDropdownGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.getAttribute('role') === 'menuitem') {
      return `Menu option: ${text}. Click to select this option from the dropdown menu.`;
    }
    return 'Dropdown menu element. Navigate with arrow keys, select with Enter, or click to choose options.';
  }

  private getSidebarGuidance(element: HTMLElement): string {
    const text = element.textContent?.trim();
    if (element.tagName.toLowerCase() === 'a' || element.getAttribute('role') === 'button') {
      return `Sidebar navigation: ${text}. Click to navigate to this section of the administration panel.`;
    }
    return 'Sidebar navigation element for accessing different sections of the admin panel.';
  }

  private getDashboardGuidance(element: HTMLElement, dataTestId: string | null, className: string, text: string | undefined): string | null {
    if (dataTestId === 'stats-cards' || className.includes('stats') || element.closest('[data-testid="stats-cards"]')) {
      return 'Dashboard statistics overview showing key business metrics including revenue, orders, customers, and products. These real-time metrics help monitor business performance and identify growth opportunities.';
    }
    
    if (dataTestId === 'sales-chart' || className.includes('chart') || element.closest('[data-testid="sales-chart"]')) {
      return 'Interactive sales performance chart displaying revenue trends over time. Analyze peak sales periods, seasonal patterns, and growth opportunities for strategic business planning.';
    }
    
    if (dataTestId === 'quick-actions' || element.closest('[data-testid="quick-actions"]')) {
      return 'Quick action panel with shortcuts to common administrative tasks including adding products, viewing reports, managing customers, and system settings.';
    }
    
    if (dataTestId === 'low-stock-alerts' || element.closest('[data-testid="low-stock-alerts"]')) {
      return 'Inventory monitoring system showing products with low stock levels. Prevents stockouts by alerting when items fall below threshold levels.';
    }

    if (text && element.tagName.toLowerCase() === 'button') {
      return this.getDashboardButtonGuidance(text.toLowerCase());
    }

    return null;
  }

  private getDashboardButtonGuidance(buttonText: string): string | null {
    if (buttonText.includes('add product')) {
      return 'Add Product button - Navigate to product creation form to add new inventory items with comprehensive details and images.';
    }
    if (buttonText.includes('view reports')) {
      return 'View Reports button - Access detailed analytics dashboard with business insights, sales data, and performance metrics.';
    }
    if (buttonText.includes('restock')) {
      return 'Restock button - Update inventory levels for low-stock items to maintain adequate supply.';
    }
    return null;
  }

  private getFormGuidance(element: HTMLElement, type: string | null, placeholder: string | null): string {
    if (type === 'email') {
      return 'Email input field. Enter a valid email address for account creation or login authentication.';
    }
    if (type === 'password') {
      return 'Password input field. Enter your secure password. Passwords should be at least 8 characters long.';
    }
    if (type === 'search') {
      return 'Search input field. Type keywords to find specific items or filter results in real-time.';
    }
    if (placeholder) {
      return `Input field for ${placeholder.toLowerCase()}. Enter the required information to proceed.`;
    }
    return 'Form input field. Enter the required information to continue.';
  }

  private getButtonGuidance(element: HTMLElement, text: string | undefined): string {
    if (!text) return 'Interactive button element. Click to perform an action.';
    
    const buttonText = text.toLowerCase();
    if (buttonText.includes('save') || buttonText.includes('submit')) {
      return 'Save button - Click to store your changes and proceed.';
    }
    if (buttonText.includes('cancel') || buttonText.includes('close')) {
      return 'Cancel button - Click to dismiss changes and return to previous view.';
    }
    if (buttonText.includes('delete') || buttonText.includes('remove')) {
      return 'Delete button - Click to permanently remove this item. This action cannot be undone.';
    }
    if (buttonText.includes('edit') || buttonText.includes('modify')) {
      return 'Edit button - Click to modify existing information or settings.';
    }
    return `${text} button - Click to ${buttonText}.`;
  }

  private getLinkGuidance(element: HTMLElement, text: string | undefined): string {
    if (!text) return 'Navigation link. Click to navigate to another page or section.';
    return `Navigation link to ${text}. Click to navigate to this section.`;
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
    
    if (buttonText.includes('restock')) {
      return 'Inventory updated successfully. Stock levels have been replenished and low stock alert resolved.';
    }
    if (buttonText.includes('save') || buttonText.includes('submit')) {
      return 'Information saved successfully. Your changes have been stored.';
    }
    if (buttonText.includes('delete')) {
      return 'Item deleted successfully. The selected item has been permanently removed.';
    }
    
    return null;
  }

  async handlePageChange() {
    const newPage = window.location.pathname;
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.lastGuidedElement = null;
      this.elementCache.clear();
      
      // Stop current speech immediately
      this.stopCurrentSpeech();
      
      setTimeout(() => {
        this.initializePageGuidance();
      }, 100);
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
      return 'Admin Dashboard - Monitor business performance through statistics, analyze sales trends, access quick actions, and review inventory alerts. This central hub provides comprehensive business management tools.';
    }
    if (path.includes('/admin/orders')) {
      return 'Order Management - View, process, and track customer orders. Update order status, manage shipping, and handle customer communications.';
    }
    if (path.includes('/admin/products')) {
      return 'Product Management - Manage your product catalog including adding new items, updating existing products, and organizing inventory.';
    }
    if (path.includes('/admin/customers')) {
      return 'Customer Management - View customer profiles, order history, and manage customer relationships.';
    }
    
    return 'Administration panel for comprehensive business management. Navigate using the sidebar or hover over elements for detailed guidance.';
  }
}

export const voiceTrainer = new VoiceTrainerService();
