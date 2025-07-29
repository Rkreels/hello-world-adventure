
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
    toast.success('Comprehensive voice guidance activated - hover over elements for detailed instructions');
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
    
    setTimeout(() => {
      const currentPath = window.location.pathname;
      const pageGuidance = this.getPageGuidance(currentPath);
      this.speak(pageGuidance);
    }, 500);
  }

  private getPageGuidance(path: string): string {
    const pathMap: { [key: string]: string } = {
      '/': 'Welcome to the e-commerce platform homepage. Browse featured products, categories, and deals. Use the search bar to find specific items, or navigate to different sections using the menu.',
      
      // Admin Dashboard
      '/admin/dashboard': 'Admin Dashboard. Monitor your store performance with sales statistics, recent orders, and quick actions. View charts showing sales trends and manage your inventory alerts.',
      
      // Product Management
      '/admin/products': 'Product Management Center. Here you can view all products, add new items, edit existing products, and manage inventory. Use the search and filters to find specific products quickly.',
      '/admin/add-product': 'Add New Product Form. Fill in all required fields including product name, description, price, and images. Configure product variations like colors, sizes, and materials. Set inventory levels and product categories.',
      '/admin/edit-product': 'Edit Product Form. Modify existing product details, update pricing, manage inventory, and adjust product variations. Save changes to update your catalog.',
      
      // Order Management
      '/admin/orders': 'Order Management System. View all customer orders, filter by status, and process orders. You can update order status, add tracking information, and manage fulfillment.',
      '/admin/order-detail': 'Order Details View. See complete order information including customer details, items ordered, payment status, and shipping information. Update order status and add notes.',
      
      // Customer Management
      '/admin/customers': 'Customer Management Dashboard. View all registered customers, analyze customer data, and manage customer accounts. Access customer purchase history and communication tools.',
      
      // Inventory
      '/admin/inventory': 'Inventory Management System. Monitor stock levels, set low stock alerts, and manage product quantities. Restock items and track inventory movements.',
      
      // Categories
      '/admin/categories': 'Category Management. Organize your products by creating and managing categories. Set up category hierarchies and assign products to appropriate categories.',
      
      // Marketing
      '/admin/marketing': 'Marketing Tools. Create and manage promotional campaigns, discount codes, and special offers. Track campaign performance and customer engagement.',
      '/admin/coupons': 'Coupon Management System. Create discount codes, set usage limits, and track coupon performance. Configure percentage or fixed amount discounts.',
      
      // Reports
      '/admin/reports': 'Analytics and Reports Center. View comprehensive sales reports, customer analytics, and business insights. Export data for further analysis.',
      
      // Settings
      '/admin/settings': 'Admin Settings Panel. Configure store settings, payment methods, shipping options, and user permissions. Customize your platform preferences.',
      
      // Shop Pages
      '/shop': 'Shop Homepage. Browse products by category, view featured items, and discover new arrivals. Use filters to find exactly what you are looking for.',
      '/shop/categories': 'Product Categories. Explore different product categories to find items that interest you. Each category contains related products grouped for easy browsing.',
      '/shop/product': 'Product Details Page. View detailed product information including images, descriptions, specifications, and customer reviews. Add items to your cart and select product variations.',
      '/shop/cart': 'Shopping Cart. Review selected items, adjust quantities, and proceed to checkout. Apply discount codes and calculate shipping costs.',
      '/shop/checkout': 'Checkout Process. Enter shipping and payment information to complete your purchase. Review your order before final confirmation.',
      '/shop/profile': 'User Profile. Manage your account information, view order history, and update preferences. Track your orders and manage saved addresses.',
      
      // Authentication
      '/auth/login': 'Login Page. Enter your credentials to access your account. Use the Remember Me option for convenience on trusted devices.',
      '/auth/register': 'Registration Form. Create a new account by providing your email, password, and basic information. Join our platform to start shopping.',
    };

    // Find the most specific match
    let guidance = pathMap[path];
    
    if (!guidance) {
      // Try to match partial paths
      for (const [pathPattern, description] of Object.entries(pathMap)) {
        if (path.startsWith(pathPattern) && pathPattern !== '/') {
          guidance = description;
          break;
        }
      }
    }
    
    if (!guidance) {
      if (path.startsWith('/admin')) {
        guidance = 'Admin Panel. This is the administrative section where you can manage your e-commerce store. Navigate using the sidebar to access different management tools.';
      } else if (path.startsWith('/shop')) {
        guidance = 'Shopping Area. Browse and purchase products from our catalog. Use the navigation menu to explore different sections.';
      } else {
        guidance = 'Page loaded. Use the navigation menu to explore different sections of the platform.';
      }
    }

    // Add general navigation tips
    guidance += ' Hover over any element for specific guidance. Press Escape to stop voice instructions.';
    
    return guidance;
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
      if (event.error !== 'interrupted') {
        console.error('Speech synthesis error:', event.error);
      }
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
    const ariaLabel = element.getAttribute('aria-label');

    // Get context-specific guidance
    const currentPath = window.location.pathname;
    
    // Check for specific component types first
    const componentGuidance = this.getComponentSpecificGuidance(element, currentPath);
    if (componentGuidance) return componentGuidance;
    
    // Enhanced element-specific guidance without unnecessary context
    switch (tagName) {
      case 'button':
        return this.getButtonGuidance(elementText, elementClass, currentPath);

      case 'input':
        return this.getInputGuidance(elementType, placeholder, elementText, currentPath);

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

  private getComponentSpecificGuidance(element: HTMLElement, currentPath: string): string | null {
    const elementClass = element.className;
    const elementId = element.id;
    const dataTestId = element.getAttribute('data-testid');
    
    // Navigation components
    if (elementClass.includes('sidebar') || elementId.includes('sidebar')) {
      return 'Sidebar navigation menu. Use these links to navigate between different sections of the admin panel. Click on categories to expand sub-menus.';
    }
    
    if (elementClass.includes('main-nav') || elementClass.includes('navbar')) {
      return 'Main navigation bar. Access different sections of the platform including shop, categories, and user account options.';
    }
    
    // Search components
    if (elementClass.includes('search') || element.getAttribute('placeholder')?.toLowerCase().includes('search')) {
      return 'Search functionality. Type keywords to find products, orders, or customers quickly. Use filters to narrow down results.';
    }
    
    // Cart components
    if (elementClass.includes('cart') || elementId.includes('cart')) {
      return 'Shopping cart. View selected items, adjust quantities, and proceed to checkout. Cart total is calculated automatically.';
    }
    
    // Product cards
    if (elementClass.includes('product-card') || elementClass.includes('ProductCard')) {
      return 'Product card. Click to view detailed product information, add to cart, or see more images. Shows price, rating, and key features.';
    }
    
    // Form components
    if (elementClass.includes('form') && currentPath.includes('add-product')) {
      return 'Product creation form. Fill in all required fields to add a new product to your catalog. Include high-quality images and detailed descriptions for better sales.';
    }
    
    // Statistics cards
    if (elementClass.includes('stat') || elementClass.includes('metric')) {
      return 'Performance metric card. Shows key business indicators like sales, orders, and revenue. Click for detailed analytics.';
    }
    
    // Data tables
    if (elementClass.includes('table') || element.tagName.toLowerCase() === 'table') {
      if (currentPath.includes('orders')) {
        return 'Orders data table. Sort by date, status, or customer. Use action buttons to process orders, update status, or view details.';
      } else if (currentPath.includes('products')) {
        return 'Products inventory table. Manage your catalog by editing prices, updating stock, or modifying product information.';
      } else if (currentPath.includes('customers')) {
        return 'Customer database table. View customer information, purchase history, and manage customer accounts.';
      }
    }
    
    return null;
  }

  private getButtonGuidance(elementText: string | undefined, elementClass: string, currentPath: string): string {
    if (!elementText) return 'Interactive button element';
    
    const text = elementText.toLowerCase();
    
    // Context-specific button guidance
    if (currentPath.includes('add-product') || currentPath.includes('edit-product')) {
      if (text.includes('save')) {
        return 'Save product button. Saves all entered product information to your catalog. Ensure all required fields are completed before saving.';
      } else if (text.includes('upload')) {
        return 'Upload images button. Add high-quality product photos. Multiple images help customers make informed purchase decisions.';
      } else if (text.includes('add variation')) {
        return 'Add product variation button. Create different options like colors, sizes, or styles for this product.';
      }
    }
    
    if (currentPath.includes('orders')) {
      if (text.includes('process')) {
        return 'Process order button. Move order to next fulfillment stage. This will update the customer and trigger notifications.';
      } else if (text.includes('ship')) {
        return 'Mark as shipped button. Update order status to shipped and optionally add tracking information.';
      }
    }
    
    // General button guidance
    if (text.includes('delete') || text.includes('remove')) {
      return `Delete button: ${elementText}. This action cannot be undone. Make sure you want to permanently remove this item.`;
    } else if (text.includes('save') || text.includes('submit')) {
      return `Save changes button: ${elementText}. This will save all modifications you have made to the form.`;
    } else if (text.includes('cancel')) {
      return `Cancel button: ${elementText}. Discard changes and return to previous page without saving.`;
    } else if (text.includes('edit')) {
      return `Edit button: ${elementText}. Opens editing interface where you can modify this item's details.`;
    } else if (text.includes('add') || text.includes('create')) {
      return `Add new item button: ${elementText}. Opens form to create a new record in the system.`;
    } else if (text.includes('view') || text.includes('details')) {
      return `View details button: ${elementText}. Opens detailed information page for this item.`;
    } else if (text.includes('export')) {
      return `Export data button: ${elementText}. Downloads current data in spreadsheet format for external analysis.`;
    } else if (text.includes('filter')) {
      return `Filter button: ${elementText}. Apply search criteria to narrow down displayed results.`;
    } else if (text.includes('sort')) {
      return `Sort button: ${elementText}. Reorder items by different criteria like date, name, or price.`;
    }
    
    return `${elementText} button. Click to perform this action.`;
  }

  private getInputGuidance(elementType: string | null, placeholder: string | null, elementText: string | undefined, currentPath: string): string {
    const context = this.getInputContext(currentPath);
    
    switch (elementType) {
      case 'email':
        return `Email address field${placeholder ? `: ${placeholder}` : ''}. ${context}Enter a valid email address for account access and notifications.`;
      case 'password':
        return `Password field. ${context}Enter a secure password with at least 8 characters, including letters, numbers, and symbols.`;
      case 'number':
        return `Number input field${placeholder ? `: ${placeholder}` : ''}. ${context}Enter numeric values only. Use arrow keys or type directly.`;
      case 'search':
        return `Search field. ${context}Type keywords to find specific items quickly. Results update as you type.`;
      case 'tel':
        return `Phone number field. ${context}Enter your phone number for order updates and customer service contact.`;
      case 'date':
        return `Date picker field. ${context}Click to open calendar or type date in the required format.`;
      case 'checkbox':
        return `Checkbox option: ${elementText || 'selection'}. ${context}Click to toggle this option on or off.`;
      case 'radio':
        return `Radio button: ${elementText || 'choice'}. ${context}Select one option from the available choices.`;
      case 'file':
        return `File upload field. ${context}Click to browse and select files from your computer.`;
      case 'url':
        return `Website URL field. ${context}Enter a complete web address starting with http or https.`;
      case 'range':
        return `Range slider. ${context}Drag to select a value within the specified range.`;
      default:
        return `Text input field${placeholder ? `: ${placeholder}` : ''}. ${context}Enter the required information in this field.`;
    }
  }

  private getInputContext(currentPath: string): string {
    if (currentPath.includes('add-product')) {
      return 'Product creation: ';
    } else if (currentPath.includes('edit-product')) {
      return 'Product editing: ';
    } else if (currentPath.includes('checkout')) {
      return 'Checkout process: ';
    } else if (currentPath.includes('profile')) {
      return 'Profile management: ';
    } else if (currentPath.includes('auth')) {
      return 'Authentication: ';
    }
    return '';
  }
}

export const voiceTrainer = new VoiceTrainerService();
