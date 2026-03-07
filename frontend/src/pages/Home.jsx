import React, { Suspense, lazy } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { SAMPLE_PRODUCTS } from '../data/products';


const Home = () => {
  // Use first 3 products for featured section
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section - Above the fold */}
      <Hero />

 {/* Categories Section */}
      <section 
        id="categories" 
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50"
        aria-labelledby="categories-heading"
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 
              id="categories-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight"
            >
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Explore our curated collections designed to elevate your wardrobe.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
    name: "New Arrivals",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop",
    link: "/shop",
    count: "24 items"
  },
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop",
    link: "/shop",
    count: "48 items"
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop",
    link: "/shop",
    count: "62 items"
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",
    link: "/shop",
    count: "31 items"
  }
            ].map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                aria-label={`Shop ${category.name} collection`}
              >
                {/* Category Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Category Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-medium">{category.count}</p>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
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
                className="transform group-hover:translate-x-1 transition-transform duration-200" 
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