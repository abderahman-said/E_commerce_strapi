import React, { Suspense, lazy } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../data/products';

// Lazy load components that aren't immediately visible
const PromoSection = lazy(() => import('../components/PromoSection'));

const Home = () => {
  // Use first 3 products for featured section
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Above the fold */}
      <Hero />

      {/* Featured Products Section */}
      <section 
        id="new-arrivals" 
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
        aria-labelledby="new-arrivals-heading"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            <div className="max-w-2xl">
              <h2 
                id="new-arrivals-heading"
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight"
              >
                Curated Arrivals
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                Discover our latest pieces, crafted for longevity and style.
              </p>
            </div>
            
            <Link 
              to="/shop" 
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900 hover:text-accent transition-colors duration-200 self-start sm:self-auto"
              aria-label="View all products in our collection"
            >
              <span>View All Collection</span>
              <ArrowRight 
                size={14} 
                className="transform group-hover:translate-x-1 transition-transform duration-200 sm:size-16" 
              />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                priority={true} // Load these images with priority
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner - Lazy loaded */}
      <Suspense fallback={<div className="h-64 sm:h-80 md:h-96 bg-gray-50 animate-pulse" />}>
        <PromoSection />
      </Suspense>

      {/* Optional: Add trust badges section */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              { title: 'Free Shipping', desc: 'On orders over $100' },
              { title: 'Easy Returns', desc: '30-day return policy' },
              { title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { title: 'Premium Quality', desc: 'Handpicked materials' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;