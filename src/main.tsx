
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add meta tags for SEO
document.title = 'E-Commerce CMS - Admin Panel';
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Professional e-commerce content management system with admin panel';
document.head.appendChild(metaDescription);

const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(metaViewport);

createRoot(document.getElementById("root")!).render(<App />);
