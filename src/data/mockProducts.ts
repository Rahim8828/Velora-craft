import type { Product, ProductDetail } from '../models/types';

/**
 * Mock product data for Velora Craft
 * At least 20 products across 8 categories
 */

// Base products for card display
export const mockProducts: Product[] = [
  // Sofa Sets (5 products)
  {
    id: 'prod-1',
    name: 'Premium L-Shape Sofa',
    slug: 'premium-l-shape-sofa',
    description: 'Luxurious L-shaped sofa with premium fabric upholstery and solid wood frame. Perfect for modern living rooms.',
    shortDescription: 'Luxurious L-shaped sofa with premium fabric',
    price: 45000,
    discountPrice: 38000,
    discountPercentage: 15,
    category: 'Sofa Sets',
    subcategory: 'L-Shape Sofas',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    rating: 4.5,
    ratingCount: 28,
    inStock: true,
    sku: 'SOF-LS-001',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'prod-2',
    name: 'Classic 3-Seater Sofa',
    slug: 'classic-3-seater-sofa',
    description: 'Elegant 3-seater sofa with teak wood frame and comfortable cushioning. Timeless design for any home.',
    shortDescription: 'Elegant 3-seater with teak wood frame',
    price: 32000,
    category: 'Sofa Sets',
    subcategory: '3-Seater Sofas',
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop',
    rating: 4.7,
    ratingCount: 42,
    inStock: true,
    sku: 'SOF-3S-001',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'prod-3',
    name: 'Modern Sectional Sofa',
    slug: 'modern-sectional-sofa',
    description: 'Contemporary sectional sofa with modular design. Customize your seating arrangement as needed.',
    shortDescription: 'Contemporary modular sectional sofa',
    price: 52000,
    discountPrice: 46800,
    discountPercentage: 10,
    category: 'Sofa Sets',
    subcategory: 'Sectional Sofas',
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop',
    rating: 4.6,
    ratingCount: 35,
    inStock: true,
    sku: 'SOF-SEC-001',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: 'prod-4',
    name: 'Compact 2-Seater Sofa',
    slug: 'compact-2-seater-sofa',
    description: 'Space-saving 2-seater sofa ideal for apartments. Comfortable and stylish.',
    shortDescription: 'Space-saving 2-seater for apartments',
    price: 24000,
    category: 'Sofa Sets',
    subcategory: '2-Seater Sofas',
    imageUrl: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800&h=600&fit=crop',
    rating: 4.3,
    ratingCount: 19,
    inStock: true,
    sku: 'SOF-2S-001',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: 'prod-5',
    name: 'Luxury Recliner Sofa',
    slug: 'luxury-recliner-sofa',
    description: 'Premium recliner sofa with electric adjustment and leather upholstery. Ultimate comfort.',
    shortDescription: 'Premium electric recliner with leather',
    price: 68000,
    discountPrice: 61200,
    discountPercentage: 10,
    category: 'Sofa Sets',
    subcategory: 'Recliner Sofas',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    rating: 4.8,
    ratingCount: 52,
    inStock: true,
    sku: 'SOF-REC-001',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-08')
  },

  // Beds & Mattresses (4 products)
  {
    id: 'prod-6',
    name: 'King Size Wooden Bed',
    slug: 'king-size-wooden-bed',
    description: 'Solid sheesham wood king size bed with elegant carved headboard. Built to last generations.',
    shortDescription: 'Solid sheesham wood king bed',
    price: 42000,
    discountPrice: 35700,
    discountPercentage: 15,
    category: 'Beds & Mattresses',
    subcategory: 'King Size Beds',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    rating: 4.6,
    ratingCount: 38,
    inStock: true,
    sku: 'BED-KS-001',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-02-02')
  },
  {
    id: 'prod-7',
    name: 'Queen Size Storage Bed',
    slug: 'queen-size-storage-bed',
    description: 'Queen size bed with hydraulic storage. Maximize your bedroom space with hidden storage.',
    shortDescription: 'Queen bed with hydraulic storage',
    price: 38000,
    category: 'Beds & Mattresses',
    subcategory: 'Queen Size Beds',
    imageUrl: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
    rating: 4.5,
    ratingCount: 31,
    inStock: true,
    sku: 'BED-QS-001',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-02-04')
  },
  {
    id: 'prod-8',
    name: 'Orthopedic Memory Foam Mattress',
    slug: 'orthopedic-memory-foam-mattress',
    description: 'Premium orthopedic mattress with memory foam technology. Perfect support for your spine.',
    shortDescription: 'Premium orthopedic memory foam mattress',
    price: 28000,
    discountPrice: 23800,
    discountPercentage: 15,
    category: 'Beds & Mattresses',
    subcategory: 'Mattresses',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    rating: 4.7,
    ratingCount: 64,
    inStock: true,
    sku: 'MAT-ORT-001',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-06')
  },
  {
    id: 'prod-9',
    name: 'Single Bed with Trundle',
    slug: 'single-bed-with-trundle',
    description: 'Space-efficient single bed with pull-out trundle. Perfect for kids rooms or guest rooms.',
    shortDescription: 'Single bed with pull-out trundle',
    price: 22000,
    category: 'Beds & Mattresses',
    subcategory: 'Single Beds',
    imageUrl: 'https://images.unsplash.com/photo-1578898886225-c7c894047899?w=800&h=600&fit=crop',
    rating: 4.4,
    ratingCount: 22,
    inStock: true,
    sku: 'BED-SG-001',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-07')
  },

  // Custom Furniture (2 products)
  {
    id: 'prod-19',
    name: 'Custom TV Unit Design',
    slug: 'custom-tv-unit-design',
    description: 'Bespoke TV unit designed to your specifications. Choose materials, size, and finish.',
    shortDescription: 'Bespoke TV unit to your specifications',
    price: 35000,
    category: 'Custom Furniture',
    subcategory: 'TV Units',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop',
    rating: 4.8,
    ratingCount: 15,
    inStock: true,
    sku: 'CUS-TVU-001',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-08')
  },
  {
    id: 'prod-20',
    name: 'Custom Study Table',
    slug: 'custom-study-table',
    description: 'Made-to-order study table. Perfect fit for your space with personalized features.',
    shortDescription: 'Made-to-order study table',
    price: 25000,
    category: 'Custom Furniture',
    subcategory: 'Study Tables',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop',
    rating: 4.6,
    ratingCount: 12,
    inStock: true,
    sku: 'CUS-STD-001',
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-09')
  },

  // Sofa & Chair Repair (1 product/service)
  {
    id: 'prod-21',
    name: 'Sofa Repair & Reupholstery',
    slug: 'sofa-repair-reupholstery',
    description: 'Professional sofa repair and reupholstery service. Restore your furniture to like-new condition.',
    shortDescription: 'Professional sofa repair service',
    price: 8000,
    category: 'Sofa & Chair Repair',
    subcategory: 'Repair Services',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    rating: 4.9,
    ratingCount: 67,
    inStock: true,
    sku: 'SRV-REP-001',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-09')
  },

  // Furniture Polish Services (1 product/service)
  {
    id: 'prod-22',
    name: 'Premium Furniture Polish',
    slug: 'premium-furniture-polish',
    description: 'Professional furniture polishing service. Restore shine and protect your wooden furniture.',
    shortDescription: 'Professional furniture polishing',
    price: 5000,
    category: 'Furniture Polish Services',
    subcategory: 'Polish Services',
    imageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop',
    rating: 4.8,
    ratingCount: 89,
    inStock: true,
    sku: 'SRV-POL-001',
    createdAt: new Date('2024-02-04'),
    updatedAt: new Date('2024-02-09')
  },

  // New Product with No Ratings (for testing)
  {
    id: 'prod-23',
    name: 'Contemporary Coffee Table',
    slug: 'contemporary-coffee-table',
    description: 'Modern glass-top coffee table with wooden base. Perfect centerpiece for your living room.',
    shortDescription: 'Modern glass-top coffee table',
    price: 15000,
    discountPrice: 12750,
    discountPercentage: 15,
    category: 'Sofa Sets',
    subcategory: 'Coffee Tables',
    imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=600&fit=crop',
    rating: 0,
    ratingCount: 0,
    inStock: true,
    sku: 'TAB-COF-001',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];


/**
 * Detailed product information including images, materials, dimensions, etc.
 * Maps to ProductDetail interface
 */
export const mockProductDetails: ProductDetail[] = mockProducts.map(product => ({
  ...product,
  images: [
    {
      url: product.imageUrl,
      alt: product.name,
      isPrimary: true,
      order: 1
    },
    {
      url: product.imageUrl.replace('w=800', 'w=800&sat=-20'),
      alt: `${product.name} - View 2`,
      isPrimary: false,
      order: 2
    },
    {
      url: product.imageUrl.replace('w=800', 'w=800&hue=10'),
      alt: `${product.name} - View 3`,
      isPrimary: false,
      order: 3
    }
  ],
  materials: getMaterialsForProduct(product.category),
  dimensions: getDimensionsForProduct(product.category),
  specifications: getSpecificationsForProduct(product.category),
  deliveryInfo: 'Free delivery within Mumbai. Delivery in 7-14 business days. Assembly service available.',
  warrantyInfo: '2 years manufacturing warranty. Extended warranty available for purchase.'
}));

/**
 * Helper function to generate material info based on category
 */
function getMaterialsForProduct(category: string): { woodType?: string; fabric?: string; polish?: string } {
  const materials: Record<string, { woodType?: string; fabric?: string; polish?: string }> = {
    'Sofa Sets': {
      woodType: 'Teak Wood',
      fabric: 'Premium Fabric / Leather',
      polish: 'Natural Wood Finish'
    },
    'Beds & Mattresses': {
      woodType: 'Sheesham Wood',
      polish: 'Melamine Polish'
    },
    'Custom Furniture': {
      woodType: 'As per customer choice',
      polish: 'As per customer choice'
    }
  };

  return materials[category] || { woodType: 'Wood', polish: 'Standard Finish' };
}

/**
 * Helper function to generate dimensions based on category
 */
function getDimensionsForProduct(category: string): { length: number; width: number; height: number; unit: string } {
  const dimensions: Record<string, { length: number; width: number; height: number; unit: string }> = {
    'Sofa Sets': { length: 220, width: 90, height: 85, unit: 'cm' },
    'Beds & Mattresses': { length: 210, width: 180, height: 120, unit: 'cm' },
    'Custom Furniture': { length: 0, width: 0, height: 0, unit: 'cm' }
  };

  return dimensions[category] || { length: 100, width: 50, height: 75, unit: 'cm' };
}

/**
 * Helper function to generate specifications based on category
 */
function getSpecificationsForProduct(category: string): Record<string, string> {
  const specs: Record<string, Record<string, string>> = {
    'Sofa Sets': {
      'Seating Capacity': '3-5 persons',
      'Frame Material': 'Solid Wood',
      'Cushion Type': 'High-Density Foam',
      'Weight Capacity': '300 kg',
      'Assembly Required': 'No'
    },
    'Beds & Mattresses': {
      'Bed Size': 'King / Queen',
      'Storage': 'Available',
      'Headboard': 'Included',
      'Weight Capacity': '250 kg',
      'Assembly Required': 'Yes'
    },
    'Custom Furniture': {
      'Customization': 'Full',
      'Design Consultation': 'Included',
      'Material Options': 'Multiple',
      'Delivery Time': '4-6 weeks'
    }
  };

  return specs[category] || {
    'Material': 'Wood',
    'Finish': 'Polished',
    'Assembly Required': 'Yes'
  };
}
