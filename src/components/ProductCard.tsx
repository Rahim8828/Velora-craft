import { useState } from 'react';
import type { Product } from '../models/types';
import LazyImage from './LazyImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onProductClick,
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleCardClick = () => {
    onProductClick(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWishlist(product.id);
    setWishlisted((prev) => !prev);
  };

  const displayPrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice !== undefined && product.discountPrice < product.price;

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#FBF9F5] rounded-xl border border-[#C6A75E]/10 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group relative"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <LazyImage
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5">
          {product.subcategory && (
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[8px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded">
              {product.subcategory}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm z-10 ${
            wishlisted
              ? 'bg-red-50 text-red-500'
              : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
          aria-label="Add to wishlist"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill={wishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View on Hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg ${
              addedToCart
                ? 'bg-green-500 text-white'
                : product.inStock
                  ? 'bg-[#C6A75E] text-white hover:bg-[#A9894D] active:scale-[0.98]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {addedToCart ? (
              <span className="flex items-center justify-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1 sm:mb-1.5 line-clamp-2 leading-snug group-hover:text-[#C6A75E] transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
          {product.ratingCount > 0 ? (
            <>
              <span className="inline-flex items-center gap-0.5 bg-brand-400 text-white text-xs sm:text-sm font-bold px-1 sm:px-1.5 py-0.5 rounded">
                {product.rating.toFixed(1)}
                <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              <span className="text-xs sm:text-sm text-gray-400">({product.ratingCount})</span>
            </>
          ) : (
            <span className="text-xs sm:text-sm text-gray-400">No ratings yet</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-0.5">
          <span className="text-sm sm:text-lg font-bold text-[#171717]">
            ₹{displayPrice.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* EMI hint */}
        <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">
          EMI from ₹{Math.round(displayPrice / 12).toLocaleString()}/mo
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
