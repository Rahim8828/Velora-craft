import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBarEnhanced from './SearchBarEnhanced';
import MobileDrawer from './MobileDrawer';

interface NavigationProps {
  currentPage?: string;
  cartItemCount: number;
  wishlistItemCount: number;
  onSearch: (query: string) => void;
}

const Navigation = ({
  currentPage: _currentPage = '',
  cartItemCount,
  wishlistItemCount,
  onSearch,
}: NavigationProps) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  // Handle scroll for sticky shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Simple Header */}
      <div
        className={`bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <img 
                  src="/logo-transparent.png" 
                  alt="Velora Craft" 
                  className="h-10 w-auto object-contain flex-shrink-0 transition-transform group-hover:scale-105"
                  style={{ height: '40px', maxHeight: '40px', maxWidth: '200px', width: 'auto' }}
                />
                <span className="sr-only">Velora Craft</span>
              </Link>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:block flex-1 max-w-lg">
              <SearchBarEnhanced onSearch={onSearch} />
            </div>

            {/* Right: Action Icons + Mobile Menu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden text-gray-600 hover:text-brand-400 transition-colors p-2"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative text-gray-600 hover:text-brand-400 transition-colors p-2"
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-400 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistItemCount > 9 ? '9+' : wishlistItemCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-brand-400 transition-colors p-2"
                aria-label="Cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-400 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden text-gray-700 hover:text-brand-400 transition-colors p-1 ml-2"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (expandable) */}
        {showMobileSearch && (
          <div className="md:hidden px-4 pb-3 animate-fade-in">
            <SearchBarEnhanced onSearch={(q) => { onSearch(q); setShowMobileSearch(false); }} />
          </div>
        )}

        {/* Desktop Quick Navigation */}
        <nav className="hidden lg:block border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-12 gap-1">
              <Link
                to="/category/sofa-sets"
                className="text-sm text-gray-600 hover:text-brand-400 hover:bg-brand-50 px-4 py-2 rounded-md transition-colors font-medium"
              >
                Sofas
              </Link>
              <Link
                to="/category/beds-mattresses"
                className="text-sm text-gray-600 hover:text-brand-400 hover:bg-brand-50 px-4 py-2 rounded-md transition-colors font-medium"
              >
                Beds
              </Link>
              <Link
                to="/category/dining-tables"
                className="text-sm text-gray-600 hover:text-brand-400 hover:bg-brand-50 px-4 py-2 rounded-md transition-colors font-medium"
              >
                Dining
              </Link>
              <Link
                to="/category/wardrobes-storage"
                className="text-sm text-gray-600 hover:text-brand-400 hover:bg-brand-50 px-4 py-2 rounded-md transition-colors font-medium"
              >
                Storage
              </Link>
              <Link
                to="/category/office-furniture"
                className="text-sm text-gray-600 hover:text-brand-400 hover:bg-brand-50 px-4 py-2 rounded-md transition-colors font-medium"
              >
                Office
              </Link>
              <div className="flex-1"></div>
              <Link
                to="/custom-furniture"
                className="text-sm text-brand-400 hover:text-brand-500 px-4 py-2 font-semibold transition-colors"
              >
                Custom Furniture
              </Link>
              <Link
                to="/repair-polish"
                className="text-sm text-gray-600 hover:text-brand-400 px-4 py-2 transition-colors font-medium"
              >
                Repair & Polish
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        cartItemCount={cartItemCount}
        wishlistItemCount={wishlistItemCount}
      />
    </header>
  );
};

export default Navigation;
