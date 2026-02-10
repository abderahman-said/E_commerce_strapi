import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Check, Star, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCardBW = ({ product, priority = false }) => {
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
            className={i < Math.floor(rating) ? "fill-gray-900 text-gray-900" : "text-gray-300"}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <article 
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/product/${id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-2xl"
        aria-label={`View details for ${name}`}
      >
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          {/* Shimmer Effect */}
          {!imageLoaded && (
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-100 to-transparent animate-shimmer"></div>
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
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <span className="
              bg-gray-900 
              text-white text-[10px] font-bold uppercase tracking-wider 
              px-3 py-1.5 rounded-lg shadow-lg
              transition-all duration-300
            ">
              New
            </span>
            {discount > 0 && (
              <span className="
                bg-gray-900 
                text-white text-[10px] font-bold uppercase tracking-wider 
                px-3 py-1.5 rounded-lg shadow-lg
                transition-all duration-300
              ">
                -{discount}%
              </span>
            )}
            {stock < 5 && stock > 0 && (
              <span className="
                bg-gray-900 
                text-white text-[10px] font-bold uppercase tracking-wider 
                px-3 py-1.5 rounded-lg shadow-lg
                transition-all duration-300
              ">
                Low Stock
              </span>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className={`
            absolute top-3 right-3 flex flex-col gap-2 z-10
            transition-all duration-500 ease-out
            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
          `}>
            <button
              onClick={handleQuickView}
              className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg 
                       flex items-center justify-center text-gray-700 
                       hover:bg-gray-900 hover:text-white 
                       hover:scale-125 hover:rotate-12
                       transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-gray-900"
              title="Quick View"
              aria-label="Quick view product"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={handleWishlist}
              className={`
                w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg 
                flex items-center justify-center 
                hover:scale-125 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-gray-900
                ${isWishlisted 
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-gray-700 hover:bg-gray-900 hover:text-white'
                }
              `}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={isWishlisted}
            >
              <Heart 
                size={16} 
                fill={isWishlisted ? 'currentColor' : 'none'}
                className={isWishlisted ? 'animate-pulse' : ''}
              />
            </button>
          </div>

          {/* Out of Stock Overlay */}
          {stock === 0 && (
            <div className={`
              absolute inset-0 bg-gray-900/80 backdrop-blur-sm 
              flex items-center justify-center
              transition-all duration-500
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚫</span>
                </div>
                <span className="text-white font-bold text-lg uppercase tracking-wider">
                  Sold Out
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded-full">
              {category}
            </span>
            {rating && renderStars(rating)}
          </div>
          
          {/* Product Name */}
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 line-clamp-2 
                     group-hover:text-gray-900 transition-colors duration-300 leading-tight">
            {name}
          </h3>
          
          {/* Price and Actions */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900 transition-all duration-300">
                ${price}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ${oldPrice}
                  </span>
                  <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    Save ${(oldPrice - price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Indicator */}
            {stock > 0 && stock < 10 && (
              <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full w-fit">
                <Truck size={12} />
                Only {stock} left
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || inCart || stock === 0}
              className={`
                w-full py-2.5 px-4 rounded-xl font-medium text-sm 
                transition-all duration-300 ease-out
                flex items-center justify-center gap-2
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1
                relative overflow-hidden
                ${inCart
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : addingToCart
                  ? 'bg-gray-900 text-white cursor-wait'
                  : stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
                }
              `}
              title={inCart ? 'In Cart' : addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              aria-label={inCart ? 'Already in cart' : 'Add to cart'}
            >
              {/* Button Ripple Effect */}
              <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300"></span>
              
              {inCart ? (
                <>
                  <Check size={16} />
                  <span>In Cart</span>
                </>
              ) : addingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : stock === 0 ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCardBW;
