
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
    this.selectFemaleVoice();
    this.handlePageChange();
    toast.success('Voice guidance activated');
  }

  private selectFemaleVoice() {
    const voices = speechSynthesis.getVoices();
    
    // Prefer female voices with natural tone
    const femaleVoices = voices.filter(voice => 
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('victoria') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('eva') ||
      voice.name.toLowerCase().includes('aria') ||
      voice.name.toLowerCase().includes('natasha')
    );

    if (femaleVoices.length > 0) {
      this.settings.voice = femaleVoices[0];
    } else {
      // Fallback to any available voice
      const englishVoices = voices.filter(voice => voice.lang.startsWith('en'));
      if (englishVoices.length > 0) {
        this.settings.voice = englishVoices[0];
      }
    }
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
      this.speak(`${buttonText} activated`);
    }
  }

  handlePageChange() {
    this.stopCurrentSpeech();
    const pageTitle = document.title;

    let speechText = `${pageTitle}`;

    const firstHeading = document.querySelector('h1, h2, h3');
    if (firstHeading) {
      speechText += `. ${firstHeading.textContent}`;
    }

    this.speak(speechText);
  }

  private speak(text: string) {
    this.stopCurrentSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = this.settings.volume;
    utterance.rate = this.settings.speechRate;
    utterance.pitch = 1.1; // Slightly higher pitch for more natural female voice

    if (this.settings.voice) {
      utterance.voice = this.settings.voice;
    }

    utterance.onerror = (event: any) => {
      console.error('Speech synthesis error:', event.error);
      toast.error('Voice guidance temporarily unavailable');
    };

    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  private getElementGuidance(element: HTMLElement): string {
    const tagName = element.tagName.toLowerCase();
    const elementType = element.getAttribute('type');
    const elementRole = element.getAttribute('role') || element.getAttribute('aria-role');
    const elementClass = element.className;
    const elementText = element.textContent?.trim();
    const placeholder = element.getAttribute('placeholder');

    // Get context-specific guidance
    const currentPath = window.location.pathname;
    
    // Enhanced element-specific guidance without unnecessary context
    switch (tagName) {
      case 'button':
        if (elementClass.includes('primary') || elementClass.includes('bg-blue')) {
          return `Primary button: ${elementText}`;
        } else if (elementClass.includes('danger') || elementClass.includes('destructive')) {
          return `Delete button: ${elementText}. This action cannot be undone`;
        } else if (elementText?.toLowerCase().includes('save')) {
          return `Save changes`;
        } else if (elementText?.toLowerCase().includes('cancel')) {
          return `Cancel and return`;
        } else if (elementText?.toLowerCase().includes('delete')) {
          return `Delete permanently`;
        } else if (elementText?.toLowerCase().includes('edit')) {
          return `Edit this item`;
        } else if (elementText?.toLowerCase().includes('add')) {
          return `Add new item`;
        }
        return `${elementText}`;

      case 'input':
        if (elementType === 'email') {
          return `Email field${placeholder ? `: ${placeholder}` : ''}`;
        } else if (elementType === 'password') {
          return `Password field`;
        } else if (elementType === 'number') {
          return `Number input${placeholder ? `: ${placeholder}` : ''}`;
        } else if (elementType === 'search') {
          return `Search field`;
        } else if (elementType === 'tel') {
          return `Phone number field`;
        } else if (elementType === 'date') {
          return `Date picker`;
        } else if (elementType === 'checkbox') {
          return `Checkbox: ${elementText || 'option'}`;
        } else if (elementType === 'radio') {
          return `Radio option: ${elementText || 'choice'}`;
        }
        return `Text field${placeholder ? `: ${placeholder}` : ''}`;

      case 'select':
        return `Dropdown menu`;

      case 'textarea':
        return `Text area${placeholder ? `: ${placeholder}` : ''}`;

      case 'table':
        if (currentPath.includes('/orders')) {
          return `Orders table with sorting and filtering options`;
        } else if (currentPath.includes('/products')) {
          return `Products catalog table`;
        } else if (currentPath.includes('/customers')) {
          return `Customer data table`;
        }
        return `Data table`;

      case 'form':
        return `Input form`;

      case 'nav':
        return `Navigation menu`;

      case 'a':
        if (elementText) {
          return `Link to ${elementText}`;
        }
        return `Navigation link`;

      case 'div':
        if (elementClass.includes('card')) {
          return `Information card`;
        } else if (elementClass.includes('modal') || elementClass.includes('dialog')) {
          return `Dialog window`;
        }
        break;

      case 'span':
        if (elementClass.includes('badge')) {
          return `Status: ${elementText}`;
        }
        break;

      case 'img':
        const altText = element.getAttribute('alt');
        return `Image${altText ? `: ${altText}` : ''}`;

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return `Heading: ${elementText}`;

      default:
        if (elementRole === 'button') {
          return `${elementText}`;
        } else if (elementRole === 'tab') {
          return `Tab: ${elementText}`;
        } else if (elementRole === 'menuitem') {
          return `Menu: ${elementText}`;
        }
    }

    // Simple fallback
    if (elementText && elementText.length > 0) {
      return `${elementText}`;
    }

    return null;
  }
}

export const voiceTrainer = new VoiceTrainerService();
