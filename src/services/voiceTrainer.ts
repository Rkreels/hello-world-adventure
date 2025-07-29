
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
    const elementText = element.textContent?.trim();
    const currentPath = window.location.pathname;

    if (tagName === 'a') {
      const href = element.getAttribute('href');
      if (href && elementText) {
        this.speak(`Navigating to ${elementText} section. Please wait while the page loads.`);
      } else if (href) {
        this.speak(`Navigating to ${href}. Please wait while the page loads.`);
      }
    } else if (tagName === 'button') {
      if (elementText) {
        const text = elementText.toLowerCase();
        
        // Provide contextual click feedback instead of just "activated"
        if (text.includes('save')) {
          this.speak(`Saving your changes. Please wait while the information is processed and stored.`);
        } else if (text.includes('delete') || text.includes('remove')) {
          this.speak(`Deleting item. This action will permanently remove the selected data.`);
        } else if (text.includes('add') || text.includes('create')) {
          this.speak(`Creating new item. Opening the creation form where you can enter the required information.`);
        } else if (text.includes('edit') || text.includes('modify')) {
          this.speak(`Opening editor. You can now modify the selected item's information and settings.`);
        } else if (text.includes('search') || text.includes('filter')) {
          this.speak(`Applying search criteria. Results will be filtered based on your selections.`);
        } else if (text.includes('cart') || text.includes('add to cart')) {
          this.speak(`Adding item to your shopping cart. You can review all items before checkout.`);
        } else if (text.includes('checkout')) {
          this.speak(`Proceeding to checkout. You'll enter payment and shipping information next.`);
        } else if (text.includes('login') || text.includes('sign in')) {
          this.speak(`Logging you in. Please wait while your credentials are verified.`);
        } else if (text.includes('register') || text.includes('sign up')) {
          this.speak(`Creating your account. Please wait while your information is processed.`);
        } else if (text.includes('upload')) {
          this.speak(`Opening file browser. Select the files you want to upload from your computer.`);
        } else if (text.includes('cancel')) {
          this.speak(`Cancelling operation. Any unsaved changes will be discarded.`);
        } else if (text.includes('submit')) {
          this.speak(`Submitting form. Please wait while your information is processed.`);
        } else if (text.includes('export') || text.includes('download')) {
          this.speak(`Preparing download. Your file will be ready shortly.`);
        } else {
          this.speak(`Executing ${elementText}. Please wait for the operation to complete.`);
        }
      } else {
        this.speak('Button clicked. Performing the requested action.');
      }
    } else if (tagName === 'input') {
      const inputType = element.getAttribute('type');
      if (inputType === 'checkbox') {
        const checked = (element as HTMLInputElement).checked;
        this.speak(`Checkbox ${checked ? 'selected' : 'deselected'}. Option is now ${checked ? 'enabled' : 'disabled'}.`);
      } else if (inputType === 'radio') {
        this.speak(`Radio option selected. This choice will override other selections in this group.`);
      }
    } else if (tagName === 'select') {
      this.speak('Dropdown menu opened. Use arrow keys or click to select an option from the list.');
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
      '/admin/products-list': 'Product Catalog Management. View and manage your complete product inventory with advanced filtering and sorting capabilities.',
      '/admin/add-product': 'Add New Product Form. Fill in all required fields including product name, description, price, and images. Configure product variations like colors, sizes, and materials. Set inventory levels and product categories.',
      '/admin/edit-product': 'Edit Product Form. Modify existing product details, update pricing, manage inventory, and adjust product variations. Save changes to update your catalog.',
      
      // Admin Management
      '/admin/admin-role': 'Admin Role Management. Create and manage administrative roles with specific permissions. Control who can access different sections of the admin panel by assigning appropriate roles to users.',
      '/admin/admin-authority': 'Admin Authority Management. Configure administrative permissions and access levels. Define what actions different admin roles can perform throughout the platform.',
      
      // Order Management
      '/admin/orders': 'Order Management System. View all customer orders, filter by status, and process orders. You can update order status, add tracking information, and manage fulfillment.',
      '/admin/order-management': 'Comprehensive Order Processing. Handle order lifecycle from placement to delivery with advanced tracking and management tools.',
      '/admin/order-detail': 'Order Details View. See complete order information including customer details, items ordered, payment status, and shipping information. Update order status and add notes.',
      
      // Customer Management
      '/admin/customers': 'Customer Management Dashboard. View all registered customers, analyze customer data, and manage customer accounts. Access customer purchase history and communication tools.',
      '/admin/customer-management': 'Advanced Customer Relationship Management. Analyze customer behavior, segment customers, and implement targeted marketing strategies.',
      
      // Inventory
      '/admin/inventory': 'Inventory Management System. Monitor stock levels, set low stock alerts, and manage product quantities. Restock items and track inventory movements.',
      
      // Categories and Brands
      '/admin/categories': 'Category Management. Organize your products by creating and managing categories. Set up category hierarchies and assign products to appropriate categories.',
      '/admin/brands': 'Brand Management. Create and organize product brands for better catalog organization and customer navigation.',
      
      // Marketing
      '/admin/marketing': 'Marketing Tools. Create and manage promotional campaigns, discount codes, and special offers. Track campaign performance and customer engagement.',
      '/admin/coupons': 'Coupon Management System. Create discount codes, set usage limits, and track coupon performance. Configure percentage or fixed amount discounts.',
      
      // Financial Management
      '/admin/transactions': 'Transaction Management. Monitor payment processing, refunds, and financial flows. Track revenue and payment method performance.',
      
      // Content Management
      '/admin/product-media': 'Product Media Management. Upload and organize product images, videos, and other media assets for your catalog.',
      '/admin/product-reviews': 'Product Review Management. Moderate customer reviews, respond to feedback, and maintain review quality standards.',
      
      // Reports
      '/admin/reports': 'Analytics and Reports Center. View comprehensive sales reports, customer analytics, and business insights. Export data for further analysis.',
      
      // Settings
      '/admin/settings': 'Admin Settings Panel. Configure store settings, payment methods, shipping options, and user permissions. Customize your platform preferences.',
      '/admin/profile': 'Admin Profile Management. Update your administrative account settings, security preferences, and notification settings.',
      
      // Shop Pages
      '/shop': 'Shop Homepage. Browse products by category, view featured items, and discover new arrivals. Use filters to find exactly what you are looking for.',
      '/shop/categories': 'Product Categories. Explore different product categories to find items that interest you. Each category contains related products grouped for easy browsing.',
      '/shop/category': 'Category Browse Page. View products within a specific category with filtering and sorting options.',
      '/shop/product': 'Product Details Page. View detailed product information including images, descriptions, specifications, and customer reviews. Add items to your cart and select product variations.',
      '/shop/cart': 'Shopping Cart. Review selected items, adjust quantities, and proceed to checkout. Apply discount codes and calculate shipping costs.',
      '/shop/checkout': 'Checkout Process. Enter shipping and payment information to complete your purchase. Review your order before final confirmation.',
      '/shop/profile': 'User Profile. Manage your account information, view order history, and update preferences. Track your orders and manage saved addresses.',
      '/shop/deals': 'Special Deals and Offers. Discover limited-time promotions, clearance items, and exclusive discounts.',
      '/shop/new-arrivals': 'New Product Arrivals. Explore the latest products added to our catalog.',
      '/shop/search': 'Search Results. Find products based on your search terms with advanced filtering options.',
      
      // Legal and Info Pages
      '/shop/about': 'About Us. Learn about our company, mission, and values.',
      '/shop/contact': 'Contact Information. Get in touch with our customer service team.',
      '/shop/faq': 'Frequently Asked Questions. Find answers to common questions about shopping, shipping, and returns.',
      '/shop/privacy': 'Privacy Policy. Information about how we handle your personal data.',
      '/shop/terms': 'Terms and Conditions. Legal terms governing the use of our platform.',
      '/shop/returns': 'Returns and Refunds. Policy and process for returning products.',
      '/shop/shipping-information': 'Shipping Information. Details about delivery options, costs, and timeframes.',
      
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
    
    // Check for price, currency, and financial elements
    const financialGuidance = this.getFinancialElementGuidance(element, elementText, elementClass);
    if (financialGuidance) return financialGuidance;
    
    // Check for measurement and quantity elements
    const measurementGuidance = this.getMeasurementElementGuidance(element, elementText, elementClass);
    if (measurementGuidance) return measurementGuidance;
    
    // Enhanced element-specific guidance without unnecessary context
    switch (tagName) {
      case 'button':
        return this.getButtonGuidance(elementText, elementClass, currentPath);

      case 'input':
        return this.getInputGuidance(elementType, placeholder, elementText, currentPath);

      case 'select':
        return this.getSelectGuidance(element, currentPath);

      case 'textarea':
        return `Text area${placeholder ? ` for ${placeholder}` : ''}. Click to enter detailed information or descriptions.`;

      case 'table':
        return this.getTableGuidance(currentPath);

      case 'form':
        return this.getFormGuidance(currentPath);

      case 'nav':
        return `Navigation menu. Use these links to move between different sections of the platform.`;

      case 'a':
        return this.getLinkGuidance(elementText, element.getAttribute('href'), currentPath);

      case 'div':
        return this.getDivGuidance(elementClass, elementText, currentPath);

      case 'span':
        return this.getSpanGuidance(elementClass, elementText);

      case 'img':
        const altText = element.getAttribute('alt');
        return `Product image${altText ? `: ${altText}` : ''}. Click to view larger image or image gallery.`;

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return this.getHeadingGuidance(elementText, currentPath);

      case 'p':
        if (elementText && elementText.length > 10) {
          return `Text content: ${elementText.substring(0, 100)}${elementText.length > 100 ? '...' : ''}`;
        }
        break;

      case 'li':
        return `List item: ${elementText}. Part of a navigational or informational list.`;

      case 'label':
        return `Form label: ${elementText}. This describes the input field that follows.`;

      default:
        if (elementRole === 'button') {
          return this.getButtonGuidance(elementText, elementClass, currentPath);
        } else if (elementRole === 'tab') {
          return `Tab: ${elementText}. Click to switch to the ${elementText.toLowerCase()} section.`;
        } else if (elementRole === 'menuitem') {
          return `Menu option: ${elementText}. Click to access ${elementText.toLowerCase()} functionality.`;
        } else if (elementRole === 'dialog') {
          return `Dialog window for ${elementText || 'additional options'}. Contains form fields or information that requires your attention.`;
        }
    }

    // Enhanced fallback with context
    if (elementText && elementText.length > 0) {
      if (elementText.includes('$') || elementText.toLowerCase().includes('price')) {
        return `Price information: ${elementText}. This shows the cost or financial value.`;
      } else if (elementText.toLowerCase().includes('quantity') || elementText.toLowerCase().includes('qty')) {
        return `Quantity field: ${elementText}. Adjust the number of items.`;
      } else if (elementText.toLowerCase().includes('total') || elementText.toLowerCase().includes('subtotal')) {
        return `Total amount: ${elementText}. This is the calculated sum.`;
      }
      return `${elementText}. Interactive element on the page.`;
    }

    return null;
  }

  private getFinancialElementGuidance(element: HTMLElement, elementText: string | undefined, elementClass: string): string | null {
    if (!elementText) return null;
    
    const text = elementText.toLowerCase();
    
    // Price detection
    if (elementText.includes('$') || text.includes('price') || text.includes('cost')) {
      if (text.includes('total')) {
        return `Total price: ${elementText}. This is the final amount including all charges and taxes.`;
      } else if (text.includes('subtotal')) {
        return `Subtotal: ${elementText}. This is the amount before taxes and additional fees.`;
      } else if (text.includes('shipping')) {
        return `Shipping cost: ${elementText}. Additional charge for product delivery.`;
      } else if (text.includes('tax')) {
        return `Tax amount: ${elementText}. Government tax applied to your purchase.`;
      } else if (text.includes('discount')) {
        return `Discount amount: ${elementText}. Savings applied to your order through coupons or promotions.`;
      }
      return `Price: ${elementText}. This shows the monetary value or cost.`;
    }
    
    // Currency and financial terms
    if (text.includes('usd') || text.includes('currency')) {
      return `Currency setting: ${elementText}. This controls the monetary unit used throughout the platform.`;
    }
    
    if (text.includes('revenue') || text.includes('sales')) {
      return `Sales revenue: ${elementText}. Total income generated from product sales.`;
    }
    
    if (text.includes('profit') || text.includes('margin')) {
      return `Profit information: ${elementText}. Shows the financial gain after expenses.`;
    }
    
    return null;
  }
  
  private getMeasurementElementGuidance(element: HTMLElement, elementText: string | undefined, elementClass: string): string | null {
    if (!elementText) return null;
    
    const text = elementText.toLowerCase();
    
    // Volume and measurements
    if (text.includes('volume') || text.includes('vol')) {
      return `Volume measurement: ${elementText}. Indicates the amount of space the product occupies.`;
    }
    
    if (text.includes('weight') || text.includes('kg') || text.includes('lb') || text.includes('grams')) {
      return `Weight specification: ${elementText}. Shows how heavy the product is for shipping calculations.`;
    }
    
    if (text.includes('size') || text.includes('dimensions')) {
      return `Size information: ${elementText}. Product dimensions for fit and space planning.`;
    }
    
    if (text.includes('quantity') || text.includes('qty') || text.includes('stock')) {
      return `Quantity indicator: ${elementText}. Shows available inventory or selected amount.`;
    }
    
    if (text.includes('rating') || text.includes('stars') || text.includes('/5')) {
      return `Product rating: ${elementText}. Customer satisfaction score based on reviews.`;
    }
    
    return null;
  }

  private getComponentSpecificGuidance(element: HTMLElement, currentPath: string): string | null {
    const elementClass = element.className;
    const elementId = element.id;
    const dataTestId = element.getAttribute('data-testid');
    const elementText = element.textContent?.trim();
    
    // Enhanced context-aware guidance
    if (currentPath.includes('admin-role') && elementText) {
      if (elementText.toLowerCase().includes('add new role') || elementText.toLowerCase().includes('create role')) {
        return 'Create admin role button. Add new administrative roles with specific permissions to control access levels throughout the platform.';
      } else if (elementText.toLowerCase().includes('role management') || elementText.toLowerCase().includes('admin role')) {
        return 'Admin role management section. Define user permissions, create access levels, and control what different administrators can do on the platform.';
      }
    }
    
    if (currentPath.includes('admin-authority') && elementText) {
      if (elementText.toLowerCase().includes('authority') || elementText.toLowerCase().includes('permissions')) {
        return 'Administrative authority management. Configure detailed permissions and access controls for different user roles in the system.';
      }
    }
    
    if (currentPath.includes('categories') && elementText) {
      if (elementText.toLowerCase().includes('add') && elementText.toLowerCase().includes('category')) {
        return 'Add new product category. Create organizational categories to help customers find products and improve site navigation.';
      }
    }
    
    if (currentPath.includes('brands') && elementText) {
      if (elementText.toLowerCase().includes('add') && elementText.toLowerCase().includes('brand')) {
        return 'Add new brand. Register product manufacturers and brands for better catalog organization and customer trust.';
      }
    }
    
    // Navigation components
    if (elementClass.includes('sidebar') || elementId.includes('sidebar')) {
      return 'Sidebar navigation menu. Use these links to navigate between different sections of the admin panel. Click on categories to expand sub-menus for detailed management options.';
    }
    
    if (elementClass.includes('main-nav') || elementClass.includes('navbar')) {
      return 'Main navigation bar. Access different sections including shop browsing, product categories, user account management, and search functionality.';
    }
    
    // Search components
    if (elementClass.includes('search') || element.getAttribute('placeholder')?.toLowerCase().includes('search')) {
      const searchContext = this.getSearchContext(currentPath);
      return `Search functionality. ${searchContext} Type keywords to find items quickly and use filters to narrow results.`;
    }
    
    // Cart components
    if (elementClass.includes('cart') || elementId.includes('cart')) {
      return 'Shopping cart interface. Review selected items, modify quantities, apply discount codes, and calculate shipping costs before checkout.';
    }
    
    // Product cards
    if (elementClass.includes('product-card') || elementClass.includes('ProductCard')) {
      return 'Product display card. Shows product image, name, price, and rating. Click to view detailed specifications, reviews, and purchasing options.';
    }
    
    // Form components  
    if (elementClass.includes('form')) {
      if (currentPath.includes('add-product')) {
        return 'Product creation form. Complete all sections including basic information, pricing, inventory, variations like colors and sizes, and upload high-quality images for better customer engagement.';
      } else if (currentPath.includes('admin-role')) {
        return 'Admin role creation form. Define role name, description, and specific permissions for new administrative positions.';
      } else if (currentPath.includes('categories')) {
        return 'Category management form. Enter category details, upload images, and set up hierarchy for product organization.';
      }
    }
    
    // Statistics cards
    if (elementClass.includes('stat') || elementClass.includes('metric') || elementClass.includes('dashboard')) {
      return 'Performance analytics dashboard. Monitor key business metrics including sales volume, revenue trends, customer acquisition, and inventory turnover rates.';
    }
    
    // Data tables
    if (elementClass.includes('table') || element.tagName.toLowerCase() === 'table') {
      if (currentPath.includes('admin-role')) {
        return 'Admin roles table. View all administrative roles, their permissions, and manage role assignments. Edit roles to modify access levels or delete unused roles.';
      } else if (currentPath.includes('orders')) {
        return 'Order management table. Track order status, customer information, payment details, and fulfillment progress. Use sorting and filtering for efficient order processing.';
      } else if (currentPath.includes('products')) {
        return 'Product catalog management. Edit product details, update pricing, manage inventory levels, and organize categories for better customer navigation.';
      } else if (currentPath.includes('customers')) {
        return 'Customer relationship management. Access customer profiles, purchase history, preferences, and communication tools for personalized service.';
      } else if (currentPath.includes('categories')) {
        return 'Categories management table. Organize product categories, set up hierarchies, and manage category assignments for better product discovery.';
      }
    }
    
    return null;
  }

  private getSearchContext(currentPath: string): string {
    if (currentPath.includes('admin-role')) {
      return 'Search admin roles by name or permissions.';
    } else if (currentPath.includes('products')) {
      return 'Search products by name, SKU, category, or brand.';
    } else if (currentPath.includes('orders')) {
      return 'Search orders by customer name, order ID, or status.';
    } else if (currentPath.includes('customers')) {
      return 'Search customers by name, email, or phone number.';
    } else if (currentPath.includes('categories')) {
      return 'Search categories by name or description.';
    }
    return 'Search through available items.';
  }

  private getHeadingGuidance(elementText: string | undefined, currentPath: string): string {
    if (!elementText) return 'Section heading. This organizes content into distinct areas.';
    
    const text = elementText.toLowerCase();
    
    // Context-specific heading guidance
    if (currentPath.includes('admin-role')) {
      if (text.includes('admin role management') || text.includes('role management')) {
        return `${elementText} section. Here you can create, edit, and manage administrative roles that control user permissions throughout the platform. Define who can access what features.`;
      } else if (text.includes('roles')) {
        return `${elementText} section. View all existing administrative roles, their descriptions, and assigned permissions. Use this area to manage role-based access control.`;
      } else if (text.includes('add') || text.includes('create')) {
        return `${elementText} section. Create new administrative roles by defining role names, descriptions, and specific permissions for different types of admin users.`;
      }
    }
    
    if (currentPath.includes('dashboard')) {
      if (text.includes('dashboard') || text.includes('overview')) {
        return `${elementText} section. Your main control center showing key performance metrics, recent activities, and quick access to important functions.`;
      } else if (text.includes('analytics') || text.includes('metrics')) {
        return `${elementText} section. Monitor business performance with charts, statistics, and trend analysis to make informed decisions.`;
      } else if (text.includes('recent') || text.includes('latest')) {
        return `${elementText} section. View the most recent activities, orders, or updates that require your attention.`;
      }
    }
    
    if (currentPath.includes('products')) {
      if (text.includes('product management') || text.includes('catalog')) {
        return `${elementText} section. Manage your entire product inventory including adding new items, editing details, and organizing your catalog.`;
      } else if (text.includes('inventory')) {
        return `${elementText} section. Monitor stock levels, track inventory movements, and manage product availability.`;
      }
    }
    
    if (currentPath.includes('orders')) {
      if (text.includes('order management') || text.includes('orders')) {
        return `${elementText} section. Process customer orders, update statuses, manage fulfillment, and handle order-related customer service.`;
      }
    }
    
    if (currentPath.includes('customers')) {
      if (text.includes('customer management') || text.includes('customers')) {
        return `${elementText} section. Manage customer accounts, view purchase history, and handle customer relationships for better service.`;
      }
    }
    
    if (currentPath.includes('categories')) {
      if (text.includes('category management') || text.includes('categories')) {
        return `${elementText} section. Organize your products into categories and subcategories for better customer navigation and product discovery.`;
      }
    }
    
    if (currentPath.includes('marketing')) {
      if (text.includes('marketing') || text.includes('campaigns')) {
        return `${elementText} section. Create and manage promotional campaigns, discount codes, and marketing strategies to boost sales.`;
      }
    }
    
    if (currentPath.includes('reports')) {
      if (text.includes('reports') || text.includes('analytics')) {
        return `${elementText} section. Generate comprehensive business reports, analyze performance data, and export insights for decision making.`;
      }
    }
    
    // Generic guidance based on common heading patterns
    if (text.includes('settings') || text.includes('configuration')) {
      return `${elementText} section. Configure platform settings, preferences, and system parameters to customize your experience.`;
    } else if (text.includes('add') || text.includes('create') || text.includes('new')) {
      return `${elementText} section. Create new entries by filling out the required information and configuring appropriate settings.`;
    } else if (text.includes('edit') || text.includes('modify') || text.includes('update')) {
      return `${elementText} section. Modify existing information, update settings, and make changes to improve your data.`;
    } else if (text.includes('list') || text.includes('table') || text.includes('overview')) {
      return `${elementText} section. Browse through available items with options to search, filter, sort, and perform bulk actions.`;
    }
    
    return `${elementText} section. This area contains related information and tools for ${elementText.toLowerCase()} management.`;
  }

  private getSelectGuidance(element: HTMLElement, currentPath: string): string {
    const elementText = element.textContent?.trim();
    const placeholder = element.getAttribute('placeholder');
    
    if (currentPath.includes('add-product')) {
      if (elementText?.toLowerCase().includes('category')) {
        return 'Product category selector. Choose the appropriate category to help customers find your product easily.';
      } else if (elementText?.toLowerCase().includes('brand')) {
        return 'Brand selection dropdown. Select the manufacturer or brand name for this product.';
      } else if (elementText?.toLowerCase().includes('status')) {
        return 'Product status dropdown. Set whether the product is active, draft, or discontinued.';
      }
    }
    
    return `Selection dropdown${placeholder ? ` for ${placeholder}` : ''}. Click to see available options and make a choice.`;
  }
  
  private getTableGuidance(currentPath: string): string {
    if (currentPath.includes('/orders')) {
      return 'Orders management table with comprehensive order tracking. Sort by order date, customer name, status, or total amount. Use action buttons to update order status, add tracking information, or process refunds.';
    } else if (currentPath.includes('/products')) {
      return 'Product catalog table for inventory management. View product details, stock levels, pricing, and performance metrics. Edit products directly or manage bulk operations.';
    } else if (currentPath.includes('/customers')) {
      return 'Customer database with detailed customer profiles. Track purchase history, lifetime value, preferences, and communication history for personalized customer service.';
    }
    return 'Data table with sorting and filtering capabilities. Click column headers to sort, use search to find specific entries.';
  }
  
  private getFormGuidance(currentPath: string): string {
    if (currentPath.includes('add-product')) {
      return 'Product creation form with multiple sections. Fill in basic information, set pricing and inventory, configure product variations, and upload images. All required fields must be completed.';
    } else if (currentPath.includes('checkout')) {
      return 'Checkout form for order completion. Enter shipping address, select payment method, and review order details before finalizing your purchase.';
    } else if (currentPath.includes('profile')) {
      return 'Profile management form. Update personal information, change password, manage addresses, and configure notification preferences.';
    }
    return 'Information input form. Complete all required fields marked with asterisks and ensure data accuracy before submission.';
  }
  
  private getLinkGuidance(elementText: string | undefined, href: string | null, currentPath: string): string {
    if (elementText) {
      if (elementText.toLowerCase().includes('dashboard')) {
        return `Dashboard navigation link: ${elementText}. Access your main admin dashboard with overview statistics and quick actions.`;
      } else if (elementText.toLowerCase().includes('product')) {
        return `Product management link: ${elementText}. Manage your product catalog, inventory, and product information.`;
      } else if (elementText.toLowerCase().includes('order')) {
        return `Order management link: ${elementText}. Process customer orders, track fulfillment, and manage order status.`;
      } else if (elementText.toLowerCase().includes('customer')) {
        return `Customer management link: ${elementText}. Manage customer accounts, view purchase history, and handle customer service.`;
      }
      return `Navigation link to ${elementText}. Click to access the ${elementText.toLowerCase()} section.`;
    }
    return 'Navigation link. Click to move to a different page or section.';
  }
  
  private getDivGuidance(elementClass: string, elementText: string | undefined, currentPath: string): string | null {
    if (elementClass.includes('card')) {
      if (elementText?.includes('$')) {
        return `Financial information card showing ${elementText}. Contains important monetary data and statistics.`;
      }
      return 'Information card containing organized data. Review the content for relevant details and available actions.';
    } else if (elementClass.includes('modal') || elementClass.includes('dialog')) {
      return 'Dialog window requiring your attention. Contains forms or information that needs review or action.';
    } else if (elementClass.includes('sidebar')) {
      return 'Sidebar panel with navigation options and additional tools. Use for quick access to different platform sections.';
    }
    return null;
  }
  
  private getSpanGuidance(elementClass: string, elementText: string | undefined): string | null {
    if (elementClass.includes('badge')) {
      return `Status indicator: ${elementText}. Shows current state or category of the item.`;
    } else if (elementText?.includes('$')) {
      return `Price display: ${elementText}. Shows the monetary amount for this item or service.`;
    } else if (elementText?.toLowerCase().includes('stock') || elementText?.toLowerCase().includes('qty')) {
      return `Inventory information: ${elementText}. Indicates available quantity or stock status.`;
    }
    return null;
  }

  private getButtonGuidance(elementText: string | undefined, elementClass: string, currentPath: string): string {
    if (!elementText) return 'Interactive button. Click to perform an action on the page.';
    
    const text = elementText.toLowerCase();
    
    // Context-specific button guidance
    if (currentPath.includes('add-product') || currentPath.includes('edit-product')) {
      if (text.includes('save')) {
        return `Save product information. Review all entered data including name, description, pricing, inventory levels, and product variations before saving to your catalog.`;
      } else if (text.includes('upload')) {
        return 'Upload product images. Add multiple high-quality photos showing different angles, colors, and product details to improve customer confidence and sales.';
      } else if (text.includes('add variation') || text.includes('variation')) {
        return 'Add product variation option. Create different choices like colors, sizes, materials, or styles to offer customers more selection.';
      } else if (text.includes('preview')) {
        return 'Preview product page. See how your product will appear to customers before publishing to the store.';
      }
    }
    
    if (currentPath.includes('orders')) {
      if (text.includes('process') || text.includes('fulfill')) {
        return 'Process order for fulfillment. Move order to the next stage, update inventory, and notify customer of progress.';
      } else if (text.includes('ship')) {
        return 'Mark order as shipped. Update delivery status, add tracking information, and send shipping confirmation to customer.';
      } else if (text.includes('refund')) {
        return 'Process refund request. Review order details and initiate refund process according to your return policy.';
      }
    }
    
    if (currentPath.includes('dashboard')) {
      if (text.includes('export')) {
        return 'Export analytics data. Download reports and statistics in spreadsheet format for detailed business analysis.';
      } else if (text.includes('refresh')) {
        return 'Refresh dashboard data. Update all statistics and charts with the most recent information.';
      }
    }
    
    // General button guidance - more descriptive
    if (text.includes('delete') || text.includes('remove')) {
      return `Permanently delete item: ${elementText}. This action cannot be undone and will remove all associated data. Confirm you want to proceed.`;
    } else if (text.includes('save') || text.includes('submit')) {
      return `Save all changes: ${elementText}. Review your modifications and submit the form to update the system.`;
    } else if (text.includes('cancel')) {
      return `Cancel operation: ${elementText}. Discard any unsaved changes and return to the previous page without updating.`;
    } else if (text.includes('edit') || text.includes('modify')) {
      return `Edit item details: ${elementText}. Open editing interface to modify information, settings, or configurations.`;
    } else if (text.includes('add') || text.includes('create') || text.includes('new')) {
      return `Create new item: ${elementText}. Start the process to add a new record, product, or entry to the system.`;
    } else if (text.includes('view') || text.includes('details') || text.includes('see more')) {
      return `View detailed information: ${elementText}. Access comprehensive details, specifications, or expanded data view.`;
    } else if (text.includes('download') || text.includes('export')) {
      return `Download content: ${elementText}. Save data, reports, or files to your device for offline access or external use.`;
    } else if (text.includes('filter') || text.includes('search')) {
      return `Apply filters: ${elementText}. Narrow down results by specific criteria like date, category, status, or price range.`;
    } else if (text.includes('sort') || text.includes('order')) {
      return `Sort data: ${elementText}. Rearrange items by different criteria such as alphabetical order, date, price, or popularity.`;
    } else if (text.includes('cart') || text.includes('add to cart')) {
      return `Add to shopping cart: ${elementText}. Include this product in your cart for purchase. You can adjust quantity before checkout.`;
    }
    
    return `${elementText}. Click this button to perform the ${elementText.toLowerCase()} action.`;
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
