import React, { useState } from 'react';
import AnimatedCard from '../components/ui/AnimatedCard';
import { SAMPLE_PRODUCTS } from '../data/products';

const AnimatedDemo = () => {
  const [products] = useState(SAMPLE_PRODUCTS.slice(0, 6));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Smooth Animations
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the magic of smooth transitions and delightful micro-interactions
        </p>
      </div>

      {/* Animated Cards Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Animation Showcase */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Animation Effects Showcase
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Shimmer Effect */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shimmer Loading</h3>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-shimmer"></div>
              <div className="h-4 bg-gray-200 rounded animate-shimmer animate-delay-200"></div>
              <div className="h-4 bg-gray-200 rounded animate-shimmer animate-delay-400"></div>
            </div>
          </div>

          {/* Slide In Animation */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Slide In Effects</h3>
            <div className="space-y-4">
              <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg animate-slideInUp"></div>
              <div className="h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg animate-slideInLeft animate-delay-200"></div>
              <div className="h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg animate-slideInUp animate-delay-400"></div>
            </div>
          </div>

          {/* Bounce Animation */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bounce Effects</h3>
            <div className="flex justify-center gap-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full animate-bounce animate-delay-200"></div>
              <div className="w-16 h-16 bg-purple-500 rounded-full animate-bounce animate-delay-400"></div>
            </div>
          </div>

          {/* Glow Animation */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Glow Effects</h3>
            <div className="flex justify-center gap-8">
              <div className="w-16 h-16 bg-pink-500 rounded-full animate-glow"></div>
              <div className="w-16 h-16 bg-yellow-500 rounded-full animate-glow animate-delay-200"></div>
              <div className="w-16 h-16 bg-indigo-500 rounded-full animate-glow animate-delay-400"></div>
            </div>
          </div>

          {/* Float Animation */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Float Animation</h3>
            <div className="flex justify-center gap-8">
              <div className="w-16 h-16 bg-cyan-500 rounded-full animate-float"></div>
              <div className="w-16 h-16 bg-rose-500 rounded-full animate-float animate-delay-200"></div>
              <div className="w-16 h-16 bg-amber-500 rounded-full animate-float animate-delay-400"></div>
            </div>
          </div>

          {/* Ripple Effect */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ripple Effect</h3>
            <div className="flex justify-center gap-8">
              <button className="w-20 h-12 bg-blue-600 text-white rounded-lg animate-ripple hover:bg-blue-700">
                Click Me
              </button>
              <button className="w-20 h-12 bg-green-600 text-white rounded-lg animate-ripple hover:bg-green-700 animate-delay-200">
                Click Me
              </button>
              <button className="w-20 h-12 bg-purple-600 text-white rounded-lg animate-ripple hover:bg-purple-700 animate-delay-400">
                Click Me
              </button>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hover Effects</h3>
            <div className="flex justify-center gap-8">
              <div className="w-20 h-12 bg-red-500 text-white rounded-lg hover-lift flex items-center justify-center">
                Lift Up
              </div>
              <div className="w-20 h-12 bg-blue-500 text-white rounded-lg hover-glow flex items-center justify-center">
                Glow
              </div>
              <div className="w-20 h-12 bg-green-500 text-white rounded-lg hover-scale flex items-center justify-center">
                Scale
              </div>
              <div className="w-20 h-12 bg-purple-500 text-white rounded-lg hover-rotate flex items-center justify-center">
                Rotate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-600">
        <p className="mb-2">✨ All animations use CSS keyframes and Tailwind classes</p>
        <p className="text-sm">Smooth transitions, delightful micro-interactions, and professional effects</p>
      </div>
    </div>
  );
};

export default AnimatedDemo;
