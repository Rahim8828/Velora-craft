import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, Wrench, Shield, RotateCcw, IndianRupee, Sparkles, TreePine, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// ─── Hero Asset Imports ─────────────────────────────────────────────
import heroImg1 from '../assets/Home 1.webp';

// ─── Category Asset Imports ─────────────────────────────────────────
import sofaImg from '../assets/Sofa.webp';
import sofaCumbedImg from '../assets/Sofa Cumbed.webp';
import reclinerImg from '../assets/Recliner.webp';
import bedImg from '../assets/Bed.webp';
import wardrobeImg from '../assets/Wardrobe.webp';
import tvUnitImg from '../assets/TV Unit.webp';
import tableImg from '../assets/Table.webp';
import chairsImg from '../assets/Chairs.webp';
import loungeChairsImg from '../assets/Lounge Chairs.webp';
import SkeletonCard from '../components/SkeletonCard';
import { productService } from '../services/ProductService';
import { cartService } from '../services/CartService';
import { wishlistService } from '../services/WishlistService';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Product } from '../models/types';

// ─── Shop by Category Circle Data ───────────────────────────────────
const shopByCategory = [
  { name: 'New Arrivals', image: '', link: '/category/sofa-sets', isNew: true },
  { name: 'Sofas', image: sofaImg, link: '/category/sofa-sets' },
  { name: 'Sofa Cum Beds', image: sofaCumbedImg, link: '/category/sofa-sets' },
  { name: 'Recliners', image: reclinerImg, link: '/category/sofa-sets' },
  { name: 'Beds', image: bedImg, link: '/category/beds-mattresses' },
  { name: 'Wardrobes', image: wardrobeImg, link: '/category/beds-mattresses' },
  { name: 'TV Units', image: tvUnitImg, link: '/category/sofa-sets' },
  { name: 'Tables', image: tableImg, link: '/category/sofa-sets' },
  { name: 'Chairs', image: chairsImg, link: '/category/sofa-sets' },
  { name: 'Lounge Chairs', image: loungeChairsImg, link: '/category/sofa-sets' },
];

const Homepage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  usePageMeta('HOME');

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await productService.getFeaturedProducts(8);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddToCart = useCallback((productId: string) => {
    cartService.addItem(productId, 1);
  }, []);

  const handleAddToWishlist = useCallback((productId: string) => {
    wishlistService.addItem(productId);
  }, []);

  const handleProductClick = useCallback((productId: string) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
        <div className="container mx-auto px-4 py-12">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ SECTION 1: HERO SECTION - Split Layout ═══ */}
      <section className="bg-white pt-4 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-[#FFF5EE] text-[#C6A75E] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Premium Furniture Studio
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Crafted for <span className="text-[#C6A75E]">Comfort</span>
                <br />& Lasting Beauty
              </h1>
              
              <p className="text-gray-600 text-lg mb-6 max-w-xl">
                Handmade solid-wood furniture with factory-direct pricing. 
                Free delivery across Mumbai. 5-year warranty on all products.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link 
                  to="/category/sofa-sets"
                  className="inline-flex items-center gap-2 bg-[#C6A75E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B0914A] transition-colors shadow-lg shadow-[#C6A75E]/20"
                >
                  Shop Sofas
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/category/beds-mattresses"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:border-[#C6A75E] hover:text-[#C6A75E] transition-colors"
                >
                  Shop Beds
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-gray-900">5,000+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10+</p>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Products</p>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImg1} 
                  alt="Premium Furniture" 
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-gray-900">Premium Sheesham Wood</p>
                  <p className="text-xs text-gray-500">Factory Direct Pricing</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C6A75E]/10 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#C6A75E]/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: TRUST/SERVICE STRIP ═══ */}
      <section className="bg-[#FFF5EE] border-y border-[#FFE0CC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#FFE0CC]">
            {[
              { icon: <Truck className="w-6 h-6 text-[#C6A75E]" />, title: 'Free Delivery', desc: 'Across Mumbai' },
              { icon: <Wrench className="w-6 h-6 text-[#C6A75E]" />, title: 'Expert Assembly', desc: 'Free Installation' },
              { icon: <Shield className="w-6 h-6 text-[#C6A75E]" />, title: '5-Year Warranty', desc: 'On all furniture' },
              { icon: <RotateCcw className="w-6 h-6 text-[#C6A75E]" />, title: 'Easy Returns', desc: '7-day return policy' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 py-4 px-4 md:px-6 justify-center">
                <span className="flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: SHOP BY CATEGORY (Circle Icons) ═══ */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          <SectionHeader title="Shop by Category" subtitle="Explore our curated furniture collections" />
          {/* Category Grid - All items with consistent layout */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 sm:gap-y-8 gap-x-1 sm:gap-x-4">
            {shopByCategory.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group flex flex-col items-center gap-2 sm:gap-3"
              >
                <div className="w-[85px] h-[85px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[170px] lg:h-[170px] rounded-full bg-[#FFF5EE] overflow-hidden flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                  {cat.isNew ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#C6A75E] to-[#D45A1E] flex items-center justify-center">
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#C6A75E]" />
                    </div>
                  ) : (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[80%] h-[80%] object-contain"
                    />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800 text-center leading-tight group-hover:text-[#C6A75E] transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: TRENDING PRODUCTS ═══ */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader title="Trending Now" subtitle="Our most loved pieces this season" ctaText="View All" ctaLink="/category/sofa-sets" />
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onProductClick={handleProductClick} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: WHY CHOOSE US ═══ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-[#FFF5EE] text-[#C6A75E] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Why Choose Velora Craft
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Crafted with Care, Built to Last
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
              We take pride in creating furniture that transforms houses into homes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { icon: <IndianRupee className="w-7 h-7 md:w-8 md:h-8" />, title: 'Factory Direct Pricing', desc: 'No middlemen, best rates' },
              { icon: <Sparkles className="w-7 h-7 md:w-8 md:h-8" />, title: 'Custom Made', desc: 'Your design, your choice' },
              { icon: <TreePine className="w-7 h-7 md:w-8 md:h-8" />, title: 'Premium Wood', desc: 'Sheesham, Teak & Mango' },
              { icon: <Truck className="w-7 h-7 md:w-8 md:h-8" />, title: 'Free Delivery', desc: 'Across Mumbai' },
              { icon: <Shield className="w-7 h-7 md:w-8 md:h-8" />, title: '5-Year Warranty', desc: 'Quality assured' },
            ].map((item) => (
              <div 
                key={item.title} 
                className="group relative bg-white rounded-2xl p-5 md:p-6 text-center shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#C6A75E]/30 transition-all duration-300"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FFF5EE] rounded-full flex items-center justify-center text-[#C6A75E] shadow-lg group-hover:bg-[#C6A75E] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="pt-8 md:pt-10">
                  <h3 className="font-bold text-gray-900 mb-1.5 text-sm md:text-base">{item.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: NEWSLETTER ═══ */}
      <section className="py-12 md:py-20 bg-[#FFF5EE]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-[#C6A75E] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Get Exclusive Offers & Updates
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                Subscribe for 10% off your first order, new arrivals, and special deals
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A75E] focus:border-transparent" 
                required 
              />
              <button 
                type="submit" 
                className="bg-[#C6A75E] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#B0914A] transition-colors shadow-lg shadow-[#C6A75E]/20"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-400 text-xs">No spam, unsubscribe anytime. We respect your privacy.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Reusable Section Header ────────────────────────────────────────
const SectionHeader = ({ title, subtitle, ctaText, ctaLink }: { title: string; subtitle?: string; ctaText?: string; ctaLink?: string }) => (
  <div className="flex items-end justify-between mb-6 sm:mb-8 md:mb-10">
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">{title}</h2>
      {subtitle && <p className="text-gray-500 text-xs sm:text-sm">{subtitle}</p>}
    </div>
    {ctaText && ctaLink && (
      <Link to={ctaLink} className="inline-flex items-center gap-1 text-[#C6A75E] font-semibold text-xs sm:text-sm hover:text-[#D45A1E] transition-colors whitespace-nowrap group">
        {ctaText}
        <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </Link>
    )}
  </div>
);

export default Homepage;
