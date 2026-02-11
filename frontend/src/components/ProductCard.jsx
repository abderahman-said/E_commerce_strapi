import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Check, Star, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, priority = false }) => {
  const { id, name, price, category, image, stock = 10, rating = 4.5 } = product;
  const { addToCart, isInCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount
  const discount = 20;
  const oldPrice = (price * (100 / (100 - discount))).toFixed(2);
  const inCart = isInCart?.(id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (addingToCart || inCart) return;
    
    setAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product);
    setAddingToCart(false);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement quick view modal
    console.log('Quick view:', id);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // Implement wishlist API call
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.floor(rating) ? "fill-primary text-primary" : "text-gray-300"}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <article 
      className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-secondary hover:border-primary
               touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
        aria-label={`View details for ${name}`}
      >
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {/* Shimmer Effect */}
          {!imageLoaded && (
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-secondary to-transparent animate-shimmer"></div>
            </div>
          )}

          {/* Product Image */}
          <img
            src={image}
            alt={name}
            className={`
              w-full h-full object-cover 
              transition-all duration-700 ease-out
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              group-hover:scale-110
            `}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Floating Badges */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 sm:gap-2 z-10">
            <span className="
              bg-primary 
              text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
              px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg
              transition-all duration-300
            ">
              New
            </span>
            {discount > 0 && (
              <span className="
                bg-primary 
                text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
                px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg
                transition-all duration-300
              ">
                -{discount}%
              </span>
            )}
            {stock < 5 && stock > 0 && (
              <span className="
                bg-primary 
                text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
                px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg
                transition-all duration-300
              ">
                Low Stock
              </span>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className={`
            absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 z-10
            transition-all duration-500 ease-out
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 sm:translate-x-8'}
          `}>
            <button
              onClick={handleQuickView}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg 
                       flex items-center justify-center text-gray-700 
                       hover:bg-primary hover:text-white 
                       hover:scale-125 hover:rotate-12
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-primary
                       touch-manipulation"
              title="Quick View"
              aria-label="Quick view product"
            >
              <Eye size={14} className="sm:size-16" />
            </button>
            <button
              onClick={handleWishlist}
              className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg 
                flex items-center justify-center 
                hover:scale-125 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-primary
                touch-manipulation
                ${isWishlisted 
                  ? 'text-primary hover:bg-secondary' 
                  : 'text-gray-700 hover:bg-primary hover:text-white'
                }
              `}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWishlisted}
            >
              <Heart 
                size={14} 
                fill={isWishlisted ? 'currentColor' : 'none'}
                className={`sm:size-16 ${isWishlisted ? 'animate-pulse' : ''}`}
              />
            </button>
          </div>

          {/* Out of Stock Overlay */}
          {stock === 0 && (
            <div className={`
              absolute inset-0 bg-primary/80 backdrop-blur-sm 
              flex items-center justify-center
              transition-all duration-500
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl">🚫</span>
                </div>
                <span className="text-white font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wider">
                  Sold Out
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2.5 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
          {/* Category and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide bg-secondary px-2 py-0.5 sm:py-1 rounded-full">
              {category}
            </span>
            {rating && renderStars(rating)}
          </div>
          
          {/* Product Name */}
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-primary line-clamp-2 
                     group-hover:text-primary transition-colors duration-300 leading-tight">
            {name}
          </h3>
          
          {/* Price and Actions */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg md:text-xl font-bold text-primary transition-all duration-300">
                ${price}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-[10px] sm:text-xs sm:text-sm text-gray-400 line-through">
                    ${oldPrice}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-primary bg-secondary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    Save ${(oldPrice - price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Indicator */}
            {stock > 0 && stock < 10 && (
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 bg-secondary px-2 py-1 rounded-full w-fit">
                <Truck size={10} className="sm:size-12" />
                Only {stock} left
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || inCart || stock === 0}
              className={`
                w-full py-2 sm:py-2.5 px-2 sm:px-3 md:px-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm 
                transition-all duration-300 ease-out
                flex items-center justify-center gap-1.5 sm:gap-2
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                relative overflow-hidden
                touch-manipulation min-h-[36px] sm:min-h-[40px]
                ${inCart
                  ? 'bg-primary text-white hover:bg-primary-hover'
                  : addingToCart
                  ? 'bg-primary text-white cursor-wait'
                  : stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-hover'
                }
              `}
              title={inCart ? 'In Cart' : addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              aria-label={inCart ? 'Already in cart' : 'Add to cart'}
            >
              {/* Button Ripple Effect */}
              <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300"></span>
              
              {inCart ? (
                <>
                  <Check size={16} className="size-[18px]" />
                  <span className="text-[10px] sm:text-xs">In Cart</span>
                </>
              ) : addingToCart ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] sm:text-xs">Adding...</span>
                </>
              ) : stock === 0 ? (
                <span className="text-[10px] sm:text-xs">Out of Stock</span>
              ) : (
                <>
                  <ShoppingBag size={16} className="size-[18px]" />
                  <span className="text-[10px] sm:text-xs">Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;