export interface Template {
  id: string;
  name: string;
  category: 'Social Media' | 'Business' | 'Gaming' | 'Vlog' | 'Product';
  thumbnail?: string;
  duration: number;
  description: string;
}

export const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Trending Reel',
    category: 'Social Media',
    duration: 15,
    description: 'Perfect for Instagram Reels and TikTok with trending transitions',
  },
  {
    id: 'template-2',
    name: 'Beat Sync',
    category: 'Social Media',
    duration: 30,
    description: 'Auto-sync your clips to music beats for dynamic videos',
  },
  {
    id: 'template-3',
    name: 'Business Ad',
    category: 'Business',
    duration: 20,
    description: 'Professional template for product launches and promotions',
  },
  {
    id: 'template-4',
    name: 'Gaming Edit',
    category: 'Gaming',
    duration: 45,
    description: 'High-energy template with gaming-style effects and transitions',
  },
  {
    id: 'template-5',
    name: 'Vlog Intro',
    category: 'Vlog',
    duration: 10,
    description: 'Engaging intro template for YouTube vlogs',
  },
  {
    id: 'template-6',
    name: 'Product Showcase',
    category: 'Product',
    duration: 25,
    description: 'Elegant template to showcase products with smooth animations',
  },
];
