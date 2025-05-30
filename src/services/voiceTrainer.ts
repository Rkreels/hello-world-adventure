
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

  getElementInfo(element: HTMLElement): string | null {
    // Get element identifier for tracking
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const id = element.id;
    const text = element.textContent?.trim().substring(0, 50) || '';
    
    return `${tagName}-${id || className || text}`;
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
    
    // Button elements
    if (tagName === 'button' || role === 'button') {
      if (text?.includes('Add')) {
        return `This is an Add button. Click it to create new items. It will open a form where you can enter details.`;
      }
      if (text?.includes('Edit')) {
        return `This is an Edit button. Click it to modify existing items. It will open the same form with pre-filled data.`;
      }
      if (text?.includes('Delete')) {
        return `This is a Delete button. Click it to remove items. Use it carefully as deleted items may not be recoverable.`;
      }
      if (text?.includes('Save') || text?.includes('Submit')) {
        return `This is a Save button. Click it to save your changes after filling out the form.`;
      }
      if (text?.includes('Cancel')) {
        return `This is a Cancel button. Click it to close the form without saving changes.`;
      }
      return `This is a ${text || 'button'}. Click it to perform the ${text?.toLowerCase()} action.`;
    }
    
    // Input elements
    if (tagName === 'input') {
      const type = element.getAttribute('type');
      const placeholder = element.getAttribute('placeholder');
      
      if (type === 'search' || placeholder?.includes('Search')) {
        return `This is a search box. Type here to filter and find specific items quickly.`;
      }
      if (type === 'email') {
        return `This is an email input field. Enter a valid email address here.`;
      }
      if (type === 'password') {
        return `This is a password field. Enter your password here. The text will be hidden for security.`;
      }
      if (type === 'number') {
        return `This is a number input field. Enter numeric values only.`;
      }
      return `This is an input field for ${placeholder || ariaLabel || 'text'}. Click here to enter information.`;
    }
    
    // Navigation elements
    if (role === 'navigation' || className.includes('nav')) {
      return `This is the navigation menu. Use these links to move between different sections of the admin panel.`;
    }
    
    // Table elements
    if (tagName === 'table' || role === 'table') {
      return `This is a data table showing your items in rows and columns. You can sort, filter, and perform actions on individual rows.`;
    }
    
    // Card elements
    if (className.includes('card')) {
      return `This is an information card displaying key details. Cards help organize related information in digestible chunks.`;
    }
    
    // Tab elements
    if (role === 'tab' || className.includes('tab')) {
      return `This is a tab for switching between different views or sections. Click to see ${text} content.`;
    }
    
    // Chart elements
    if (className.includes('chart') || element.querySelector('svg')) {
      return `This is a chart or graph displaying your business data visually. Hover over data points for detailed information.`;
    }
    
    // Form elements
    if (tagName === 'form') {
      return `This is a form for entering information. Fill out the required fields and submit when complete.`;
    }
    
    // Select elements
    if (tagName === 'select') {
      return `This is a dropdown menu. Click to see available options and select one.`;
    }
    
    // Link elements
    if (tagName === 'a') {
      return `This is a link to ${text}. Click to navigate to this section.`;
    }
    
    return null;
  }

  async handleElementClick(element: HTMLElement) {
    const guidance = this.getClickGuidance(element);
    if (guidance) {
      // Brief pause then guide
      setTimeout(() => this.speak(guidance), 500);
    }
  }

  private getClickGuidance(element: HTMLElement): string | null {
    const text = element.textContent?.trim();
    
    if (text?.includes('Add Category')) {
      return `Great! This form lets you create new categories. Fill in the category name, add a description, and upload an image if desired.`;
    }
    if (text?.includes('Add Product')) {
      return `Perfect! You're creating a new product. Enter the product details, set pricing, and manage inventory levels.`;
    }
    if (text?.includes('Edit')) {
      return `You're now editing this item. Modify any fields you need and save your changes when done.`;
    }
    
    return null;
  }

  async handlePageChange() {
    const newPage = window.location.pathname;
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.lastGuidedElement = null; // Reset element tracking
      
      // Wait for page to load then provide guidance
      setTimeout(() => {
        this.initializePageGuidance();
      }, 1500);
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
      return `Welcome to your admin dashboard! This is your control center. You can see key metrics, recent activity, and quick actions. Hover over any element for detailed guidance.`;
    }
    if (path.includes('/admin/categories')) {
      return `You're now in the Categories section. Here you can organize your products into categories. You can add new categories, edit existing ones, or delete categories you no longer need.`;
    }
    if (path.includes('/admin/products')) {
      return `Welcome to Product Management! This is where you manage your entire product catalog. Add new products, update existing ones, track inventory, and set pricing.`;
    }
    if (path.includes('/admin/orders')) {
      return `You're in Order Management. Here you can view all customer orders, update their status, track shipments, and manage the order fulfillment process.`;
    }
    if (path.includes('/admin/customers')) {
      return `This is Customer Management. View customer information, track their order history, and manage customer relationships.`;
    }
    if (path.includes('/admin/inventory')) {
      return `Welcome to Inventory Management. Monitor stock levels, get low stock alerts, and manage your product inventory efficiently.`;
    }
    if (path.includes('/admin/marketing')) {
      return `You're in the Marketing section. Create promotional campaigns, manage discount coupons, and boost your sales with marketing tools.`;
    }
    if (path.includes('/admin/reports')) {
      return `This is the Reports section. Analyze your business performance with detailed analytics, sales reports, and key performance indicators.`;
    }
    
    return `You're now in the admin panel. Hover over any element to learn about its functionality and how to use it effectively.`;
  }

  highlightElement(element: HTMLElement) {
    // Remove previous highlights
    document.querySelectorAll('.voice-trainer-highlight').forEach(el => {
      el.classList.remove('voice-trainer-highlight');
    });

    // Add highlight to current element
    element.classList.add('voice-trainer-highlight');
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      element.classList.remove('voice-trainer-highlight');
    }, 3000);
  }
}

export const voiceTrainer = new VoiceTrainerService();
