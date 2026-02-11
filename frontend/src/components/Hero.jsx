import React, { useEffect, useState } from 'react';
import { Award, TrendingUp, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] lg:min-h-screen flex items-center bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`space-y-4 sm:space-y-6 md:space-y-8 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <img 
                src="/logo.png" 
                alt="Velvet Vibe" 
                className="h-4 w-auto object-contain sm:h-5"
              />
              <span className="text-xs font-semibold text-gray-700 tracking-wide">
                Est. 2024 — Collection
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Redefining{' '}
                <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-600">
                  Modern
                </span>{' '}
                Luxury
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-lg xl:max-w-xl">
                Experience the perfect fusion of contemporary design and timeless elegance.
                Crafted for those who dare to stand out.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link 
                to="/shop" 
                className="group relative inline-flex items-center justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gray-900 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:scale-105 w-full sm:w-auto text-sm sm:text-base touch-manipulation min-h-[44px]"
              >
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <button 
                className="group inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 transition-all duration-300 hover:border-gray-900 hover:shadow-lg w-full sm:w-auto text-sm sm:text-base touch-manipulation min-h-[44px]"
                aria-label="Watch our brand film"
              >
                <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-10 md:w-9 md:h-11 lg:w-10 lg:h-12 bg-accent rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Play size={12} fill="white" className="text-white ml-0.5 sm:size-14" />
                </span>
                <span className="text-xs sm:text-sm">Watch Film</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-2 sm:pt-4">
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">2K+</span>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Curated Items</p>
              </div>
              
              <div className="w-px h-6 sm:h-8 md:h-10 lg:h-12 bg-gray-200" />
              
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">50K+</span>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={`relative transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] xl:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              {/* Image */}
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90"
                alt="Fashion model showcasing luxury collection"
                className="w-full h-full object-cover"
                loading="eager" // Load hero image immediately
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg transform transition-transform duration-500 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Spring Collection 2024</p>
                    <p className="text-xs text-gray-600">Limited Edition Pieces</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-accent">-25%</p>
                    <p className="text-xs text-gray-600">This Week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 bg-accent/20 rounded-full blur-2xl sm:blur-3xl" />
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 bg-pink-600/20 rounded-full blur-2xl sm:blur-3xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs font-medium tracking-wider">SCROLL</span>
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-gray-400 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;