import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ cartCount = 0 }) => {
  const { setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-heading font-bold text-2xl uppercase tracking-tighter text-primary">
          VELVET<span className="font-normal text-accent">VIBE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['New Arrivals', 'Men', 'Women', 'Accessories'].map((item) => (
            <Link
              key={item}
              to="/shop"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-primary">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors text-primary">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-primary relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-4 px-6 flex flex-col gap-4 shadow-lg">
          {['New Arrivals', 'Men', 'Women', 'Accessories'].map((item) => (
            <Link
              key={item}
              to="/shop"
              className="text-sm font-bold uppercase tracking-widest text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
