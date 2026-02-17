
// 60 realistic shop products with working Unsplash images
export interface ShopProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount: number;
  category: string;
}

export const shopProducts: ShopProduct[] = [
  { id: 1, name: "Radiant Glow Hydrating Serum", brand: "SaltForm", price: 29.99, oldPrice: 39.99, image: "https://images.unsplash.com/photo-1615900119312-2acd3a71f3aa?w=600&q=80", rating: 5, reviews: 287, isNew: true, discount: 25, category: "Beauty" },
  { id: 2, name: "Modern Minimalist Vase", brand: "Design Denmark", price: 49.99, oldPrice: 69.99, image: "https://images.unsplash.com/photo-1602746588630-8ce6147c406c?w=600&q=80", rating: 4, reviews: 186, isNew: false, discount: 30, category: "Home" },
  { id: 3, name: "FitPro 3000 Smartwatch", brand: "GadgetPro", price: 119.99, oldPrice: 149.99, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80", rating: 5, reviews: 152, isNew: false, discount: 20, category: "Electronics" },
  { id: 4, name: "Wireless Noise Cancelling Headphones", brand: "AudioTech", price: 189.99, oldPrice: 249.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", rating: 4, reviews: 215, isNew: false, discount: 24, category: "Electronics" },
  { id: 5, name: "Premium Leather Wallet", brand: "LeatherCraft", price: 59.99, oldPrice: 79.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80", rating: 4, reviews: 92, isNew: true, discount: 25, category: "Fashion" },
  { id: 6, name: "Stainless Steel Water Bottle", brand: "EcoLife", price: 24.99, oldPrice: 34.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80", rating: 5, reviews: 178, isNew: false, discount: 28, category: "Home" },
  { id: 7, name: "Organic Cotton T-Shirt", brand: "EcoWear", price: 19.99, oldPrice: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", rating: 4, reviews: 124, isNew: false, discount: 33, category: "Fashion" },
  { id: 8, name: "Portable Bluetooth Speaker", brand: "SoundWave", price: 79.99, oldPrice: 99.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80", rating: 4, reviews: 86, isNew: true, discount: 20, category: "Electronics" },
  { id: 9, name: "Ceramic Coffee Mug Set", brand: "HomeStyle", price: 34.99, oldPrice: 49.99, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80", rating: 5, reviews: 142, isNew: false, discount: 30, category: "Home" },
  { id: 10, name: "Running Shoes Pro", brand: "SprintMax", price: 134.99, oldPrice: 179.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", rating: 5, reviews: 312, isNew: false, discount: 25, category: "Sports" },
  { id: 11, name: "Yoga Mat Extra Thick", brand: "ZenFit", price: 45.99, oldPrice: 59.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80", rating: 4, reviews: 198, isNew: false, discount: 23, category: "Sports" },
  { id: 12, name: "Smart LED Desk Lamp", brand: "BrightHome", price: 39.99, oldPrice: 54.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80", rating: 4, reviews: 67, isNew: false, discount: 27, category: "Home" },
  { id: 13, name: "Vitamin C Face Cream", brand: "GlowUp", price: 22.99, oldPrice: 32.99, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80", rating: 5, reviews: 445, isNew: true, discount: 30, category: "Beauty" },
  { id: 14, name: "Wireless Earbuds Pro", brand: "AudioTech", price: 149.99, oldPrice: 199.99, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80", rating: 4, reviews: 98, isNew: true, discount: 25, category: "Electronics" },
  { id: 15, name: "Cast Iron Skillet 12-inch", brand: "HomeStyle", price: 44.99, oldPrice: 59.99, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80", rating: 5, reviews: 234, isNew: false, discount: 25, category: "Home" },
  { id: 16, name: "Denim Jacket Classic", brand: "UrbanStyle", price: 89.99, oldPrice: 119.99, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80", rating: 4, reviews: 64, isNew: false, discount: 25, category: "Fashion" },
  { id: 17, name: "Ultra HD 4K Smart TV 55\"", brand: "VisionPlus", price: 599.99, oldPrice: 799.99, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80", rating: 4, reviews: 76, isNew: false, discount: 25, category: "Electronics" },
  { id: 18, name: "Resistance Bands Set", brand: "FlexFit", price: 19.99, oldPrice: 29.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80", rating: 4, reviews: 156, isNew: false, discount: 33, category: "Sports" },
  { id: 19, name: "Bamboo Cutting Board Set", brand: "KitchenPro", price: 29.99, oldPrice: 44.99, image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=600&q=80", rating: 5, reviews: 89, isNew: false, discount: 33, category: "Home" },
  { id: 20, name: "Leather Crossbody Bag", brand: "LeatherCraft", price: 79.99, oldPrice: 109.99, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", rating: 5, reviews: 203, isNew: true, discount: 27, category: "Fashion" },
  { id: 21, name: "Electric Kettle 1.7L", brand: "HomeStyle", price: 39.99, oldPrice: 49.99, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", rating: 4, reviews: 187, isNew: false, discount: 20, category: "Home" },
  { id: 22, name: "Premium Sunglasses", brand: "VisionElite", price: 159.99, oldPrice: 199.99, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80", rating: 4, reviews: 46, isNew: false, discount: 20, category: "Fashion" },
  { id: 23, name: "Gaming Laptop RTX 4060", brand: "TechElite", price: 1299.99, oldPrice: 1499.99, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80", rating: 5, reviews: 58, isNew: true, discount: 13, category: "Electronics" },
  { id: 24, name: "Adjustable Dumbbell Set", brand: "PowerLift", price: 199.99, oldPrice: 279.99, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", rating: 5, reviews: 312, isNew: false, discount: 29, category: "Sports" },
  { id: 25, name: "Rose Quartz Face Roller", brand: "GlowUp", price: 18.99, oldPrice: 24.99, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80", rating: 4, reviews: 267, isNew: false, discount: 24, category: "Beauty" },
  { id: 26, name: "Mechanical Keyboard RGB", brand: "GadgetPro", price: 89.99, oldPrice: 129.99, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", rating: 5, reviews: 189, isNew: false, discount: 31, category: "Electronics" },
  { id: 27, name: "Insulated Lunch Bag", brand: "EcoLife", price: 22.99, oldPrice: 32.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", rating: 4, reviews: 112, isNew: false, discount: 30, category: "Home" },
  { id: 28, name: "Cotton Hoodie Premium", brand: "UrbanStyle", price: 54.99, oldPrice: 74.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80", rating: 4, reviews: 178, isNew: true, discount: 27, category: "Fashion" },
  { id: 29, name: "4K Webcam Pro", brand: "VisionPlus", price: 129.99, oldPrice: 199.99, image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80", rating: 4, reviews: 91, isNew: false, discount: 35, category: "Electronics" },
  { id: 30, name: "Aromatherapy Diffuser", brand: "ZenHome", price: 34.99, oldPrice: 49.99, image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80", rating: 5, reviews: 234, isNew: false, discount: 30, category: "Home" },
  { id: 31, name: "Hiking Backpack 40L", brand: "TrailMaster", price: 89.99, oldPrice: 119.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", rating: 5, reviews: 145, isNew: false, discount: 25, category: "Sports" },
  { id: 32, name: "Retinol Night Serum", brand: "SaltForm", price: 34.99, oldPrice: 44.99, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80", rating: 5, reviews: 356, isNew: true, discount: 22, category: "Beauty" },
  { id: 33, name: "Smart Home Hub", brand: "GadgetPro", price: 79.99, oldPrice: 99.99, image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80", rating: 4, reviews: 134, isNew: false, discount: 20, category: "Electronics" },
  { id: 34, name: "Linen Throw Pillow Set", brand: "Design Denmark", price: 42.99, oldPrice: 59.99, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80", rating: 4, reviews: 98, isNew: false, discount: 28, category: "Home" },
  { id: 35, name: "Slim Fit Chinos", brand: "ProFashion", price: 49.99, oldPrice: 69.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", rating: 4, reviews: 72, isNew: false, discount: 29, category: "Fashion" },
  { id: 36, name: "Wireless Charging Pad", brand: "PowerUp", price: 29.99, oldPrice: 39.99, image: "https://images.unsplash.com/photo-1603539444875-76e7684265f6?w=600&q=80", rating: 4, reviews: 42, isNew: false, discount: 25, category: "Electronics" },
  { id: 37, name: "Jump Rope Speed Pro", brand: "FlexFit", price: 14.99, oldPrice: 22.99, image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80", rating: 4, reviews: 89, isNew: false, discount: 35, category: "Sports" },
  { id: 38, name: "Collagen Peptides Powder", brand: "GlowUp", price: 39.99, oldPrice: 54.99, image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=80", rating: 5, reviews: 412, isNew: false, discount: 27, category: "Beauty" },
  { id: 39, name: "Velvet Accent Chair", brand: "Design Denmark", price: 249.99, oldPrice: 349.99, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", rating: 5, reviews: 67, isNew: true, discount: 29, category: "Home" },
  { id: 40, name: "Canvas Sneakers Classic", brand: "UrbanStyle", price: 44.99, oldPrice: 59.99, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80", rating: 4, reviews: 234, isNew: false, discount: 25, category: "Fashion" },
  { id: 41, name: "Noise Cancelling Earbuds", brand: "SoundWave", price: 99.99, oldPrice: 139.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80", rating: 4, reviews: 167, isNew: true, discount: 29, category: "Electronics" },
  { id: 42, name: "Tennis Racket Pro", brand: "SprintMax", price: 159.99, oldPrice: 199.99, image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80", rating: 5, reviews: 78, isNew: false, discount: 20, category: "Sports" },
  { id: 43, name: "Hair Oil Nourishing Blend", brand: "SaltForm", price: 16.99, oldPrice: 24.99, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80", rating: 4, reviews: 198, isNew: false, discount: 32, category: "Beauty" },
  { id: 44, name: "USB-C Docking Station", brand: "GadgetPro", price: 69.99, oldPrice: 99.99, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80", rating: 4, reviews: 54, isNew: false, discount: 30, category: "Electronics" },
  { id: 45, name: "Weighted Blanket 15lb", brand: "ZenHome", price: 59.99, oldPrice: 79.99, image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80", rating: 5, reviews: 289, isNew: false, discount: 25, category: "Home" },
  { id: 46, name: "Cashmere Scarf", brand: "ProFashion", price: 89.99, oldPrice: 129.99, image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80", rating: 5, reviews: 56, isNew: true, discount: 31, category: "Fashion" },
  { id: 47, name: "Smart Scale Body Analyzer", brand: "FlexFit", price: 49.99, oldPrice: 69.99, image: "https://images.unsplash.com/photo-1576511468697-8d4fa93dc3c4?w=600&q=80", rating: 4, reviews: 143, isNew: false, discount: 29, category: "Sports" },
  { id: 48, name: "Sheet Mask Variety Pack", brand: "GlowUp", price: 12.99, oldPrice: 18.99, image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80", rating: 4, reviews: 567, isNew: false, discount: 32, category: "Beauty" },
  { id: 49, name: "Portable Monitor 15.6\"", brand: "VisionPlus", price: 219.99, oldPrice: 299.99, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80", rating: 4, reviews: 87, isNew: true, discount: 27, category: "Electronics" },
  { id: 50, name: "Bamboo Towel Set", brand: "EcoLife", price: 34.99, oldPrice: 49.99, image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&q=80", rating: 5, reviews: 145, isNew: false, discount: 30, category: "Home" },
  { id: 51, name: "Wireless Mouse Ergonomic", brand: "GadgetPro", price: 34.99, oldPrice: 49.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80", rating: 4, reviews: 234, isNew: false, discount: 30, category: "Electronics" },
  { id: 52, name: "Swim Goggles Anti-Fog", brand: "SprintMax", price: 24.99, oldPrice: 34.99, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80", rating: 4, reviews: 112, isNew: false, discount: 29, category: "Sports" },
  { id: 53, name: "Natural Lip Balm Set", brand: "SaltForm", price: 9.99, oldPrice: 14.99, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80", rating: 5, reviews: 678, isNew: false, discount: 33, category: "Beauty" },
  { id: 54, name: "French Press Coffee Maker", brand: "KitchenPro", price: 29.99, oldPrice: 39.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80", rating: 5, reviews: 201, isNew: false, discount: 25, category: "Home" },
  { id: 55, name: "Wool Blend Peacoat", brand: "ProFashion", price: 179.99, oldPrice: 249.99, image: "https://images.unsplash.com/photo-1544923246-77307dd270b1?w=600&q=80", rating: 5, reviews: 89, isNew: false, discount: 28, category: "Fashion" },
  { id: 56, name: "Action Camera 4K", brand: "GadgetPro", price: 199.99, oldPrice: 279.99, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80", rating: 4, reviews: 145, isNew: true, discount: 29, category: "Electronics" },
  { id: 57, name: "Foam Roller Muscle Relief", brand: "FlexFit", price: 24.99, oldPrice: 34.99, image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=600&q=80", rating: 4, reviews: 198, isNew: false, discount: 29, category: "Sports" },
  { id: 58, name: "Hyaluronic Acid Moisturizer", brand: "GlowUp", price: 27.99, oldPrice: 37.99, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80", rating: 5, reviews: 389, isNew: true, discount: 26, category: "Beauty" },
  { id: 59, name: "Espresso Machine Compact", brand: "KitchenPro", price: 179.99, oldPrice: 249.99, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80", rating: 5, reviews: 167, isNew: false, discount: 28, category: "Home" },
  { id: 60, name: "Silk Pajama Set", brand: "EcoWear", price: 69.99, oldPrice: 99.99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", rating: 4, reviews: 134, isNew: true, discount: 30, category: "Fashion" },
];

export const shopBrands = [
  { id: 'saltform', name: 'SaltForm' },
  { id: 'design-denmark', name: 'Design Denmark' },
  { id: 'gadgetpro', name: 'GadgetPro' },
  { id: 'audiotech', name: 'AudioTech' },
  { id: 'leathercraft', name: 'LeatherCraft' },
  { id: 'ecolife', name: 'EcoLife' },
  { id: 'ecowear', name: 'EcoWear' },
  { id: 'soundwave', name: 'SoundWave' },
  { id: 'homestyle', name: 'HomeStyle' },
  { id: 'sprintmax', name: 'SprintMax' },
  { id: 'zenfit', name: 'ZenFit' },
  { id: 'brighthome', name: 'BrightHome' },
  { id: 'glowup', name: 'GlowUp' },
  { id: 'urbanstyle', name: 'UrbanStyle' },
  { id: 'visionplus', name: 'VisionPlus' },
  { id: 'flexfit', name: 'FlexFit' },
  { id: 'kitchenpro', name: 'KitchenPro' },
  { id: 'profashion', name: 'ProFashion' },
  { id: 'powerup', name: 'PowerUp' },
  { id: 'zenhome', name: 'ZenHome' },
  { id: 'trailmaster', name: 'TrailMaster' },
  { id: 'techelite', name: 'TechElite' },
  { id: 'powerlift', name: 'PowerLift' },
  { id: 'visionelite', name: 'VisionElite' },
];

export const shopCategories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Outdoors' },
];
