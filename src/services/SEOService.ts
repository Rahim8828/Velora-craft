import type { ProductDetail, Category } from '../models/types';

/**
 * SEO Service handles SEO optimization including schema markup,
 * meta tags, and sitemap generation
 */

// ============================================================================
// Types
// ============================================================================

export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
}

export type PageType = 'HOME' | 'PRODUCT' | 'CATEGORY' | 'ABOUT' | 'CONTACT' | 'CART' | 'WISHLIST' | 'CHECKOUT' | 'CUSTOM_FURNITURE' | 'REPAIR_POLISH' | 'POLISH' | 'REPAIR' | 'SEARCH' | 'SHIPPING_POLICY' | 'RETURN_POLICY' | 'WARRANTY' | 'FAQ' | 'NOT_FOUND';

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export interface Sitemap {
  entries: SitemapEntry[];
}

// ============================================================================
// SEO Service
// ============================================================================

export class SEOService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://veloracraft.com') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate JSON-LD schema markup for a product
   * Validates Requirements: 13.2, 13.4
   */
  generateProductSchema(product: ProductDetail): SchemaMarkup {
    const schema: SchemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      sku: product.sku,
      image: this.getProductImages(product),
      brand: {
        '@type': 'Brand',
        name: 'Velora Craft'
      },
      offers: {
        '@type': 'Offer',
        url: `${this.baseUrl}/products/${product.slug}`,
        priceCurrency: 'INR',
        price: product.discountPrice || product.price,
        availability: product.inStock 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
        priceValidUntil: this.getNextYear()
      }
    };

    // Add ratings if available
    if (product.ratingCount > 0) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.ratingCount,
        bestRating: 5,
        worstRating: 1
      };
    }

    // Add category
    if (product.category) {
      schema.category = product.category;
    }

    return schema;
  }

  /**
   * Generate meta tags for different page types
   * Validates Requirements: 13.3
   */
  generatePageMeta(pageType: PageType, data?: any): PageMeta {
    switch (pageType) {
      case 'HOME':
        return {
          title: 'Velora Craft - Premium Furniture in Mumbai | Factory Direct Pricing',
          description: 'Discover premium quality furniture at factory direct prices. Custom-made sofas, beds, dining tables, wardrobes & office furniture. Free delivery in Mumbai. Trusted local brand.',
          keywords: ['furniture Mumbai', 'custom furniture', 'sofa sets', 'beds', 'dining tables', 'wardrobes', 'office furniture', 'furniture repair', 'furniture polish'],
          canonicalUrl: this.baseUrl,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'PRODUCT':
        return this.generateProductMeta(data);

      case 'CATEGORY':
        return this.generateCategoryMeta(data);

      case 'ABOUT':
        return {
          title: 'About Us - Velora Craft | Premium Furniture Manufacturer',
          description: 'Learn about Velora Craft, Mumbai\'s trusted furniture manufacturer. We specialize in custom-made furniture with premium quality and factory direct pricing.',
          keywords: ['about Velora Craft', 'furniture manufacturer Mumbai', 'custom furniture maker'],
          canonicalUrl: `${this.baseUrl}/about`,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'CONTACT':
        return {
          title: 'Contact Us - Velora Craft | Get in Touch',
          description: 'Contact Velora Craft for inquiries about custom furniture, repairs, or orders. Visit our showroom in Mumbai or reach us via phone, email, or WhatsApp.',
          keywords: ['contact furniture store', 'furniture showroom Mumbai', 'furniture inquiry'],
          canonicalUrl: `${this.baseUrl}/contact`,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'CART':
        return {
          title: 'Shopping Cart - Velora Craft',
          description: 'Review your selected furniture items and proceed to checkout.',
          keywords: ['shopping cart', 'furniture cart'],
          canonicalUrl: `${this.baseUrl}/cart`
        };

      case 'WISHLIST':
        return {
          title: 'My Wishlist - Velora Craft',
          description: 'View your saved furniture items and add them to cart when ready.',
          keywords: ['wishlist', 'saved furniture'],
          canonicalUrl: `${this.baseUrl}/wishlist`
        };

      case 'CHECKOUT':
        return {
          title: 'Checkout - Velora Craft',
          description: 'Complete your furniture purchase with secure checkout and multiple payment options.',
          keywords: ['checkout', 'buy furniture'],
          canonicalUrl: `${this.baseUrl}/checkout`
        };

      case 'CUSTOM_FURNITURE':
        return {
          title: 'Custom Furniture - Velora Craft | Made to Order',
          description: 'Get custom-made furniture designed to your exact specifications. Premium quality craftsmanship with factory direct pricing. Free consultation available.',
          keywords: ['custom furniture', 'made to order furniture', 'bespoke furniture Mumbai'],
          canonicalUrl: `${this.baseUrl}/custom-furniture`,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'REPAIR_POLISH':
        return {
          title: 'Furniture Repair & Polish Services - Velora Craft',
          description: 'Professional furniture repair and polish services in Mumbai. Restore your furniture to its original glory with expert craftsmanship.',
          keywords: ['furniture repair', 'furniture polish', 'furniture restoration Mumbai'],
          canonicalUrl: `${this.baseUrl}/repair-polish`,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'POLISH':
        return {
          title: 'Professional Furniture Polish Services - Velora Craft',
          description: 'Expert furniture polishing services in Mumbai. Restore shine and elegance to your wooden furniture with basic polish, deep polish, gloss finish & more.',
          keywords: ['furniture polish', 'wood polishing Mumbai', 'furniture refinishing', 'duco polish', 'matte finish'],
          canonicalUrl: `${this.baseUrl}/polish`,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'REPAIR':
        return {
          title: 'Expert Furniture Repair Services - Velora Craft',
          description: 'Professional furniture repair in Mumbai. Fix broken legs, wobbly joints, wood damage & more. Expert craftsmen, quick turnaround.',
          keywords: ['furniture repair', 'wood repair Mumbai', 'chair repair', 'table repair', 'furniture restoration'],
          canonicalUrl: `${this.baseUrl}/repair`,
          ogImage: `${this.baseUrl}/velora-logo.png`
        };

      case 'SEARCH':
        return this.generateSearchMeta(data);

      case 'SHIPPING_POLICY':
        return {
          title: 'Shipping Policy - Velora Craft | Free Delivery in Mumbai',
          description: 'Learn about Velora Craft shipping and delivery policy. Free delivery across Mumbai, pan-India shipping available. Safe packaging and room placement included.',
          keywords: ['shipping policy', 'furniture delivery Mumbai', 'free delivery', 'furniture shipping'],
          canonicalUrl: `${this.baseUrl}/shipping-policy`
        };

      case 'RETURN_POLICY':
        return {
          title: 'Return & Refund Policy - Velora Craft',
          description: 'Easy 7-day returns on damaged or defective products. Free pickup, full refund on eligible returns. Read our complete return and refund policy.',
          keywords: ['return policy', 'refund policy', 'furniture returns', 'exchange policy'],
          canonicalUrl: `${this.baseUrl}/return-policy`
        };

      case 'WARRANTY':
        return {
          title: 'Warranty Information - Velora Craft | Up to 5-Year Warranty',
          description: 'Up to 5-year warranty on solid wood furniture. Learn about coverage, claim process, and furniture care tips. Manufacturing defects fully covered.',
          keywords: ['furniture warranty', 'warranty claim', 'furniture guarantee', 'warranty coverage'],
          canonicalUrl: `${this.baseUrl}/warranty`
        };

      case 'FAQ':
        return {
          title: 'FAQ - Velora Craft | Frequently Asked Questions',
          description: 'Find answers to common questions about orders, delivery, returns, warranty, and custom furniture at Velora Craft.',
          keywords: ['FAQ', 'frequently asked questions', 'furniture help', 'customer support'],
          canonicalUrl: `${this.baseUrl}/faq`
        };

      case 'NOT_FOUND':
        return {
          title: 'Page Not Found - Velora Craft',
          description: 'The page you are looking for does not exist.',
          keywords: ['404', 'page not found'],
          canonicalUrl: this.baseUrl
        };

      default:
        return {
          title: 'Velora Craft - Premium Furniture in Mumbai',
          description: 'Premium quality furniture at factory direct prices.',
          keywords: ['furniture', 'Mumbai'],
          canonicalUrl: this.baseUrl
        };
    }
  }

  /**
   * Generate sitemap for search engines
   */
  generateSitemap(products?: ProductDetail[], categories?: Category[]): Sitemap {
    const entries: SitemapEntry[] = [];

    // Add homepage
    entries.push({
      url: this.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    });

    // Add static pages
    const staticPages = [
      { path: '/about', priority: 0.8, frequency: 'monthly' as const },
      { path: '/contact', priority: 0.8, frequency: 'monthly' as const },
      { path: '/custom-furniture', priority: 0.9, frequency: 'weekly' as const },
      { path: '/repair-polish', priority: 0.9, frequency: 'weekly' as const },
      { path: '/shipping-policy', priority: 0.5, frequency: 'monthly' as const },
      { path: '/return-policy', priority: 0.5, frequency: 'monthly' as const },
      { path: '/warranty', priority: 0.5, frequency: 'monthly' as const },
      { path: '/faq', priority: 0.6, frequency: 'monthly' as const },
    ];

    staticPages.forEach(page => {
      entries.push({
        url: `${this.baseUrl}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.frequency,
        priority: page.priority
      });
    });

    // Add category pages
    if (categories) {
      categories.forEach(category => {
        entries.push({
          url: `${this.baseUrl}/category/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9
        });
      });
    }

    // Add product pages
    if (products) {
      products.forEach(product => {
        entries.push({
          url: `${this.baseUrl}/products/${product.slug}`,
          lastModified: product.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.8
        });
      });
    }

    return { entries };
  }

  /**
   * Validate that a URL is SEO-friendly (no query params or session IDs)
   * Validates Requirements: 13.1
   */
  isSEOFriendlyUrl(url: string): boolean {
    // Check for query parameters
    if (url.includes('?')) {
      return false;
    }

    // Check for session IDs in common formats
    const sessionIdPatterns = [
      /jsessionid/i,
      /phpsessid/i,
      /aspsessionid/i,
      /sid=/i,
      /sessionid/i
    ];

    return !sessionIdPatterns.some(pattern => pattern.test(url));
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private generateProductMeta(product?: ProductDetail): PageMeta {
    if (!product) {
      return {
        title: 'Product - Velora Craft',
        description: 'View product details',
        keywords: ['furniture'],
        canonicalUrl: this.baseUrl
      };
    }

    const price = product.discountPrice || product.price;
    const title = `${product.name} - Velora Craft | ₹${price.toLocaleString('en-IN')}`;
    const description = product.shortDescription || product.description.substring(0, 160);

    return {
      title,
      description,
      keywords: [
        product.name,
        product.category,
        product.subcategory || '',
        'furniture Mumbai',
        'buy furniture online'
      ].filter(Boolean),
      canonicalUrl: `${this.baseUrl}/products/${product.slug}`,
      ogImage: product.imageUrl
    };
  }

  private generateCategoryMeta(category?: Category | string): PageMeta {
    if (!category) {
      return {
        title: 'Category - Velora Craft',
        description: 'Browse furniture by category',
        keywords: ['furniture category'],
        canonicalUrl: this.baseUrl
      };
    }

    const categoryName = typeof category === 'string' ? category : category.name;
    const categorySlug = typeof category === 'string' 
      ? category.toLowerCase().replace(/\s+/g, '-') 
      : category.slug;

    return {
      title: `${categoryName} - Velora Craft | Premium ${categoryName}`,
      description: `Browse our collection of premium ${categoryName.toLowerCase()}. Factory direct pricing, custom options available. Free delivery in Mumbai.`,
      keywords: [categoryName, `${categoryName} Mumbai`, `buy ${categoryName}`, 'furniture'],
      canonicalUrl: `${this.baseUrl}/category/${categorySlug}`,
      ogImage: typeof category === 'object' ? category.imageUrl : undefined
    };
  }

  private generateSearchMeta(query?: string): PageMeta {
    const searchQuery = query || '';
    return {
      title: searchQuery 
        ? `Search Results for "${searchQuery}" - Velora Craft`
        : 'Search - Velora Craft',
      description: searchQuery
        ? `Find furniture matching "${searchQuery}". Browse our collection of premium furniture.`
        : 'Search for furniture products',
      keywords: [searchQuery, 'furniture search', 'find furniture'],
      canonicalUrl: `${this.baseUrl}/search`
    };
  }

  private getProductImages(product: ProductDetail): string[] {
    const images: string[] = [];
    
    // Add primary image
    if (product.imageUrl) {
      images.push(product.imageUrl);
    }

    // Add additional images from gallery
    if (product.images && product.images.length > 0) {
      product.images
        .sort((a, b) => a.order - b.order)
        .forEach(img => {
          if (!images.includes(img.url)) {
            images.push(img.url);
          }
        });
    }

    return images;
  }

  private getNextYear(): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  }
}

// Export singleton instance
export const seoService = new SEOService();
