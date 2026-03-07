import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

const Navbar = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>

    <header className={`sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b transition-all duration-300 ${
      isScrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Velvet Vibe Store" 
            className="h-10 w-auto object-contain transition-all duration-300
                     sm:h-12 lg:h-14
                     rounded-lg hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          {['New Arrivals', 'Men', 'Women', 'Accessories'].map((item) => (
            <Link
              key={item}
              to={`/shop?active=${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-semibold uppercase tracking-wide text-gray-900 hover:text-blue-600 transition-colors duration-200 relative group
                       py-2 px-1"
              aria-label={`Navigate to ${item}`}
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Tablet Navigation */}
        <nav className="hidden md:flex lg:hidden items-center gap-6" role="navigation" aria-label="Tablet navigation">
          {['Shop', 'Collections'].map((item) => (
            <Link
              key={item}
              to={item === 'Shop' ? '/shop' : '/collections'}
              className="text-sm font-semibold uppercase tracking-wide text-gray-900 hover:text-blue-600 transition-colors duration-200 relative group
                       py-2 px-1"
              aria-label={`Navigate to ${item}`}
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 hover:text-blue-600 hover:scale-110"
            aria-label="Search products"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} strokeWidth={2} />
          </button>
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/admin"
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 hover:text-purple-600"
                aria-label="Admin Dashboard"
              >
                <LayoutDashboard size={16} strokeWidth={2} />
              </Link>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <Link
                to="/account"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {user.name}
              </Link>
              <button
                onClick={logout}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 hover:text-red-600"
                aria-label="Logout"
              >
                <LogOut size={16} strokeWidth={2} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 hover:text-blue-600 hover:scale-110"
              aria-label="Sign in"
            >
              <User size={20} strokeWidth={2} />
            </Link>
          )}
          <Link
            to="/cart"
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 hover:text-blue-600 hover:scale-110 relative"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 hover:text-blue-600 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 py-6 px-4 sm:px-6 flex flex-col gap-2 shadow-xl animate-slideInDown"
             role="navigation"
             aria-label="Mobile navigation">
          {['New Arrivals', 'Men', 'Women', 'Accessories'].map((item) => (
            <Link
              key={item}
              to={`/shop/${item.toLowerCase().replace(' ', '-')}`}
              className="text-base font-semibold uppercase tracking-wide text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200
                       flex items-center justify-between group"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={`Navigate to ${item}`}
            >
              <span>{item}</span>
              <span className="text-gray-400 group-hover:text-blue-600 transition-colors">→</span>
            </Link>
          ))}
          {user ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 mt-2 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 mt-2 border-t border-gray-200">
              <Link
                to="/login"
                className="flex items-center justify-center gap-3 py-3 px-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} />
                <span>Sign In</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-3 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} />
                <span>Create Account</span>
              </Link>
            </div>
          )}
        </div>
      )}
      {/* Search Modal */}
    </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
