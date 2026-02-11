import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ cartCount = 0 }) => {
  const { setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 md:h-18 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Velvet Vibe" 
            className="h-8 w-auto object-contain transition-all duration-300
                     sm:h-10 md:h-12 lg:h-14
                     rounded-lg sm:rounded-xl"
          />
        </Link>

        {/* Desktop Nav - Hidden on mobile, visible on md and up */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {['New Arrivals', 'Men', 'Women', 'Accessories'].map((item) => (
            <Link
              key={item}
              to="/shop"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors relative group
                       sm:text-sm
                       py-2"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Tablet Nav - Simplified on md screens */}
        <nav className="hidden md:flex lg:hidden items-center gap-4">
          {['Shop', 'Collections'].map((item) => (
            <Link
              key={item}
              to="/shop"
              className="text-xs font-bold uppercase tracking-wider text-primary hover:text-accent transition-colors relative group
                       py-2"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button className="p-2 sm:p-2.5 hover:bg-secondary rounded-full transition-colors text-primary
                           touch-manipulation">
            <Search size={18} strokeWidth={1.5} className="sm:size-20" />
          </button>
          <button className="hidden sm:flex p-2 sm:p-2.5 hover:bg-secondary rounded-full transition-colors text-primary
                           touch-manipulation">
            <User size={18} strokeWidth={1.5} className="sm:size-20" />
          </button>
          <button
            className="p-2 sm:p-2.5 hover:bg-secondary rounded-full transition-colors text-primary relative
                     touch-manipulation"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={18} strokeWidth={1.5} className="sm:size-20" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center rounded-full border-2 border-white
                               xs:text-xs">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden p-2 sm:p-2.5 hover:bg-secondary rounded-full transition-colors text-primary
                     touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-secondary py-4 px-3 sm:px-4 md:px-6 flex flex-col gap-3 sm:gap-4 shadow-lg animate-slideInDown">
          {['New Arrivals', 'Men', 'Women', 'Accessories'].map((item) => (
            <Link
              key={item}
              to="/shop"
              className="text-sm sm:text-base font-bold uppercase tracking-widest text-primary py-3 px-4 rounded-lg hover:bg-secondary transition-all duration-200
                       touch-manipulation min-h-[44px] flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3 border-t border-gray-200">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-primary touch-manipulation min-h-[44px]">
              <Search size={18} />
              <span className="text-sm font-medium">Search</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-primary touch-manipulation min-h-[44px]">
              <User size={18} />
              <span className="text-sm font-medium">Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
