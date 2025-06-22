import { toast } from 'sonner';

class VoiceTrainerService {
  private isInitialized = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private settings = {
    volume: 0.9,
    speechRate: 1.0,
    voice: null as SpeechSynthesisVoice | null,
  };

  initializePageGuidance() {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
    this.handlePageChange();
    toast.success('Voice guidance initialized - hover over elements for comprehensive guidance');
  }

  updateSettings(newSettings: { volume?: number; speechRate?: number }) {
    this.settings = { ...this.settings, ...newSettings };
  }

  stopCurrentSpeech() {
    if (this.currentUtterance && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  guideElement(element: HTMLElement) {
    if (!element) return;

    const elementInfo = this.getElementInfo(element);
    if (!elementInfo) return;

    this.speak(elementInfo);
  }

  getElementInfo(element: HTMLElement): string | null {
    if (!element) return null;

    let elementInfo = this.getElementGuidance(element);
    if (!elementInfo) {
      elementInfo = element.tagName + ' ' + element.id;
    }

    return elementInfo;
  }

  handleElementClick(element: HTMLElement) {
    if (!element) return;

    const tagName = element.tagName.toLowerCase();

    if (tagName === 'a') {
      const href = element.getAttribute('href');
      if (href) {
        this.speak(`Navigating to ${href}`);
      }
    } else if (tagName === 'button') {
      const buttonText = element.textContent?.trim();
      this.speak(`Button ${buttonText} clicked`);
    }
  }

  handlePageChange() {
    this.stopCurrentSpeech();
    const pageTitle = document.title;
    const pageDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

    let speechText = `You are on the page: ${pageTitle}. `;
    if (pageDescription) {
      speechText += `This page is about: ${pageDescription}. `;
    }

    const firstHeading = document.querySelector('h1, h2, h3');
    if (firstHeading) {
      speechText += `The main heading is: ${firstHeading.textContent}. `;
    }

    this.speak(speechText);
  }

  private speak(text: string) {
    this.stopCurrentSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = this.settings.volume;
    utterance.rate = this.settings.speechRate;

    const voices = speechSynthesis.getVoices();
    if (this.settings.voice) {
      utterance.voice = this.settings.voice;
    } else if (voices.length > 0) {
      utterance.voice = voices[0];
    }

    utterance.onerror = (event: any) => {
      console.error('Speech synthesis error:', event.error);
      toast.error('Failed to speak the text. Please check your browser settings and ensure that speech synthesis is enabled.');
    };

    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  private getElementGuidance(element: HTMLElement): string {
    const tagName = element.tagName.toLowerCase();
    const elementType = element.getAttribute('type');
    const elementRole = element.getAttribute('role') || element.getAttribute('aria-role');
    const elementClass = element.className;
    const elementId = element.id;
    const elementPlaceholder = element.getAttribute('placeholder');
    const elementText = element.textContent?.trim();
    const elementValue = (element as HTMLInputElement).value;

    // Page-specific guidance
    const currentPath = window.location.pathname;
    let pageContext = '';
    
    if (currentPath.includes('/admin/dashboard')) {
      pageContext = 'You are on the Admin Dashboard. This is your central control panel for monitoring business metrics, sales data, and quick access to key functions. ';
    } else if (currentPath.includes('/admin/orders')) {
      pageContext = 'You are in Order Management. Here you can view, track, and manage all customer orders including status updates and fulfillment. ';
    } else if (currentPath.includes('/admin/products')) {
      pageContext = 'You are in Product Management. This area allows you to add, edit, and organize your product catalog with detailed information. ';
    } else if (currentPath.includes('/admin/customers')) {
      pageContext = 'You are in Customer Management. Review customer profiles, purchase history, and manage customer relationships. ';
    } else if (currentPath.includes('/admin/inventory')) {
      pageContext = 'You are in Inventory Management. Monitor stock levels, track product availability, and manage warehouse operations. ';
    } else if (currentPath.includes('/admin/reports')) {
      pageContext = 'You are in Reports section. Generate and analyze business reports including sales, performance, and analytics data. ';
    } else if (currentPath.includes('/admin/settings')) {
      pageContext = 'You are in Admin Settings. Configure system preferences, user permissions, and application settings. ';
    } else if (currentPath.includes('/shop')) {
      pageContext = 'You are in the Shopping area. Browse products, manage your cart, and complete purchases. ';
    } else if (currentPath.includes('/auth')) {
      pageContext = 'You are on the Authentication page. Sign in or create an account to access the platform. ';
    }

    // Enhanced element-specific guidance
    switch (tagName) {
      case 'button':
        if (elementClass.includes('primary') || elementClass.includes('bg-blue')) {
          return `${pageContext}Primary action button labeled "${elementText}". This is the main action you can take on this screen. Click to proceed with the primary function.`;
        } else if (elementClass.includes('secondary') || elementClass.includes('outline')) {
          return `${pageContext}Secondary action button labeled "${elementText}". This provides an alternative action or cancellation option.`;
        } else if (elementClass.includes('danger') || elementClass.includes('destructive')) {
          return `${pageContext}Warning: Destructive action button labeled "${elementText}". This action cannot be undone. Proceed with caution.`;
        } else if (elementText?.toLowerCase().includes('save')) {
          return `${pageContext}Save button. Click to save your current changes and updates to the system.`;
        } else if (elementText?.toLowerCase().includes('cancel')) {
          return `${pageContext}Cancel button. Click to discard changes and return to the previous state.`;
        } else if (elementText?.toLowerCase().includes('delete')) {
          return `${pageContext}Delete button. This will permanently remove the selected item. Confirm before proceeding.`;
        } else if (elementText?.toLowerCase().includes('edit')) {
          return `${pageContext}Edit button. Click to modify the selected item or enter edit mode.`;
        } else if (elementText?.toLowerCase().includes('add')) {
          return `${pageContext}Add button. Click to create a new item or add content to the current section.`;
        }
        return `${pageContext}Clickable button labeled "${elementText}". This performs a specific action related to the current workflow.`;

      case 'input':
        if (elementType === 'email') {
          return `${pageContext}Email input field${elementPlaceholder ? ` with placeholder "${elementPlaceholder}"` : ''}. Enter a valid email address format like user@domain.com.`;
        } else if (elementType === 'password') {
          return `${pageContext}Password input field. Enter your secure password. Characters will be hidden for security.`;
        } else if (elementType === 'number') {
          return `${pageContext}Number input field${elementPlaceholder ? ` with placeholder "${elementPlaceholder}"` : ''}. Enter numeric values only.`;
        } else if (elementType === 'search') {
          return `${pageContext}Search input field. Type keywords to find specific items or content within the system.`;
        } else if (elementType === 'tel') {
          return `${pageContext}Phone number input field. Enter your telephone number in the appropriate format.`;
        } else if (elementType === 'url') {
          return `${pageContext}URL input field. Enter a complete web address starting with http or https.`;
        } else if (elementType === 'date') {
          return `${pageContext}Date picker input. Select or enter a date in the required format.`;
        } else if (elementType === 'checkbox') {
          return `${pageContext}Checkbox option${elementText ? ` for "${elementText}"` : ''}. Click to toggle this option on or off.`;
        } else if (elementType === 'radio') {
          return `${pageContext}Radio button option${elementText ? ` for "${elementText}"` : ''}. Select this option from the available choices.`;
        }
        return `${pageContext}Text input field${elementPlaceholder ? ` with placeholder "${elementPlaceholder}"` : ''}. Enter the required information here.`;

      case 'select':
        return `${pageContext}Dropdown selection menu. Click to view available options and choose the appropriate value for your needs.`;

      case 'textarea':
        return `${pageContext}Large text input area${elementPlaceholder ? ` with placeholder "${elementPlaceholder}"` : ''}. Enter detailed text, descriptions, or comments here.`;

      case 'table':
        return `${pageContext}Data table displaying organized information. You can sort columns, filter data, and select rows for actions. Navigate through pages if available.`;

      case 'form':
        return `${pageContext}Input form for data entry. Fill out all required fields marked with asterisks and submit when complete.`;

      case 'nav':
        return `${pageContext}Navigation menu. Use these links to move between different sections and features of the application.`;

      case 'a':
        if (elementText) {
          return `${pageContext}Navigation link to "${elementText}". Click to go to this section or page.`;
        }
        return `${pageContext}Clickable link that will navigate you to another page or section.`;

      case 'div':
        if (elementClass.includes('card')) {
          return `${pageContext}Information card containing related data. This groups together related information for easy viewing.`;
        } else if (elementClass.includes('modal') || elementClass.includes('dialog')) {
          return `${pageContext}Modal dialog window. This overlay contains important information or actions that need your attention.`;
        } else if (elementClass.includes('sidebar')) {
          return `${pageContext}Sidebar navigation panel. Contains links and tools for navigating the application.`;
        } else if (elementClass.includes('header')) {
          return `${pageContext}Page header section containing title and primary navigation elements.`;
        } else if (elementClass.includes('footer')) {
          return `${pageContext}Page footer containing additional links and information.`;
        }
        break;

      case 'span':
        if (elementClass.includes('badge')) {
          return `${pageContext}Status badge showing "${elementText}". This indicates the current state or category.`;
        } else if (elementClass.includes('tag')) {
          return `${pageContext}Tag label "${elementText}". This is a categorization or filter option.`;
        }
        break;

      case 'img':
        const altText = element.getAttribute('alt');
        return `${pageContext}Image${altText ? ` showing ${altText}` : ''}. This visual content supports the current information.`;

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return `${pageContext}Page heading "${elementText}". This indicates the main topic or section you're currently viewing.`;

      default:
        if (elementRole === 'button') {
          return `${pageContext}Interactive button element labeled "${elementText}". Click to perform the associated action.`;
        } else if (elementRole === 'tab') {
          return `${pageContext}Tab navigation "${elementText}". Click to switch to this section or view.`;
        } else if (elementRole === 'tabpanel') {
          return `${pageContext}Tab content panel. This shows the content for the currently selected tab.`;
        } else if (elementRole === 'menu') {
          return `${pageContext}Menu containing navigation options. Select an item to navigate or perform actions.`;
        } else if (elementRole === 'menuitem') {
          return `${pageContext}Menu option "${elementText}". Click to select this action or navigate to this section.`;
        }
    }

    // Fallback with enhanced context
    if (elementText && elementText.length > 0) {
      return `${pageContext}Interactive element containing "${elementText}". This element is part of the current workflow and can be clicked or interacted with.`;
    }

    return `${pageContext}Interactive page element. This component is part of the current interface and may respond to your interaction.`;
  }
}

export const voiceTrainer = new VoiceTrainerService();
