import type { Product, ProductDetail, Category } from '../models/types';
import { mockProducts, mockProductDetails } from '../data/mockProducts';
import { mockCategories } from '../data/mockCategories';

/**
 * Cache configuration
 */
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * ProductService handles all product-related operations
 * including retrieval, filtering, and search functionality
 * with in-memory caching for performance optimization
 */
export class ProductService {
  private productCache: Map<string, CacheEntry<ProductDetail>> = new Map();
  private categoryCache: Map<string, CacheEntry<Product[]>> = new Map();
  private searchCache: Map<string, CacheEntry<Product[]>> = new Map();
  private featuredCache: CacheEntry<Product[]> | null = null;
  private categoriesCache: CacheEntry<Category[]> | null = null;

  /**
   * Get a product by its ID with full details
   * Uses in-memory cache to avoid repeated lookups
   */
  async getProductById(id: string): Promise<ProductDetail | null> {
    // Check cache first
    const cached = this.productCache.get(id);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    // Simulate async operation
    await this.delay(100);
    
    const product = mockProductDetails.find(p => p.id === id);
    
    // Cache the result
    if (product) {
      this.productCache.set(id, {
        data: product,
        timestamp: Date.now()
      });
    }
    
    return product || null;
  }

  /**
   * Get all products belonging to a specific category
   * Centralized matching logic for category slugs and names
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!category) return [];

    const rawInput = category.toLowerCase().trim();
    // Normalize input by replacing hyphens and underscores with spaces, removing special chars
    const normalizedInput = rawInput.replace(/[-_]/g, ' ').replace(/[^\w\s]/g, '').trim();

    // Check cache first
    const cached = this.categoryCache.get(normalizedInput);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    await this.delay(100);

    const isSofaQuery = 
      normalizedInput === 'sofa' || 
      normalizedInput === 'sofas' || 
      normalizedInput.includes('sofa');

    const products = mockProducts.filter(p => {
      const catLower = p.category.toLowerCase();
      const subLower = (p.subcategory || '').toLowerCase();
      const nameLower = p.name.toLowerCase();
      const slugLower = p.slug.toLowerCase();

      // If querying for sofas (e.g. 'sofas', 'sofa-sets', 'sofa', etc.)
      if (isSofaQuery) {
        return (
          catLower.includes('sofa') ||
          subLower.includes('sofa') ||
          nameLower.includes('sofa') ||
          slugLower.includes('sofa')
        );
      }

      // Check exact or partial match after stripping hyphens/spaces
      const catNormalized = catLower.replace(/[-_]/g, ' ').replace(/[^\w\s]/g, '').trim();
      const subNormalized = subLower.replace(/[-_]/g, ' ').replace(/[^\w\s]/g, '').trim();

      return (
        catNormalized === normalizedInput ||
        catNormalized.includes(normalizedInput) ||
        normalizedInput.includes(catNormalized) ||
        subNormalized.includes(normalizedInput) ||
        slugLower.includes(normalizedInput.replace(/\s+/g, '-'))
      );
    });

    // Cache the result
    this.categoryCache.set(normalizedInput, {
      data: products,
      timestamp: Date.now()
    });

    return products;
  }

  /**
   * Get featured products for homepage display
   * Uses in-memory cache to avoid repeated sorting
   */
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    // Check cache first
    if (this.featuredCache && this.isCacheValid(this.featuredCache.timestamp)) {
      return this.featuredCache.data.slice(0, limit);
    }

    await this.delay(100);
    
    // Return products with highest ratings or specific featured flag
    const featured = mockProducts
      .filter(p => p.inStock)
      .sort((a, b) => b.rating - a.rating);
    
    // Cache the full list
    this.featuredCache = {
      data: featured,
      timestamp: Date.now()
    };
    
    return featured.slice(0, limit);
  }

  /**
   * Search products by query string
   * Searches in product name, description, and category
   * Uses in-memory cache for repeated searches
   */
  async searchProducts(query: string): Promise<Product[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    
    // Check cache first
    const cached = this.searchCache.get(normalizedQuery);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    await this.delay(100);
    
    const results = mockProducts.filter(product => {
      const searchableText = [
        product.name,
        product.description,
        product.shortDescription,
        product.category,
        product.subcategory || ''
      ].join(' ').toLowerCase();
      
      return searchableText.includes(normalizedQuery);
    });

    // Cache the result
    this.searchCache.set(normalizedQuery, {
      data: results,
      timestamp: Date.now()
    });
    
    return results;
  }

  /**
   * Get all available product categories
   * Uses in-memory cache
   */
  async getAllCategories(): Promise<Category[]> {
    // Check cache first
    if (this.categoriesCache && this.isCacheValid(this.categoriesCache.timestamp)) {
      return this.categoriesCache.data;
    }

    await this.delay(50);
    
    // Cache the result
    this.categoriesCache = {
      data: mockCategories,
      timestamp: Date.now()
    };
    
    return mockCategories;
  }

  /**
   * Clear all caches (useful for testing or when data updates)
   */
  clearCache(): void {
    this.productCache.clear();
    this.categoryCache.clear();
    this.searchCache.clear();
    this.featuredCache = null;
    this.categoriesCache = null;
  }

  /**
   * Check if a cache entry is still valid
   */
  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  /**
   * Helper method to simulate async delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const productService = new ProductService();
