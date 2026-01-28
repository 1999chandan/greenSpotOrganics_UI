import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * HeroSection - Carousel/banner showcasing organic product promotions
 * Auto-rotates with manual navigation controls
 */
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Fresh Organic Vegetables',
      subtitle: 'Farm-to-table freshness in every bite',
      cta: 'Shop Now',
      image:
        'https://images.unsplash.com/photo-1464226184485-280280a3edd0?w=1200&h=400&fit=crop',
      color: 'from-green-600 to-emerald-500',
    },
    {
      id: 2,
      title: 'Sustainable Farming',
      subtitle: 'Supporting local, organic farmers',
      cta: 'Learn More',
      image:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=1200&h=400&fit=crop',
      color: 'from-emerald-600 to-teal-500',
    },
    {
      id: 3,
      title: 'Summer Harvest Sale',
      subtitle: 'Up to 40% off on fresh produce',
      cta: 'Explore Deals',
      image:
        'https://images.unsplash.com/photo-1488459716781-6f3ee86783a0?w=1200&h=400&fit=crop',
      color: 'from-yellow-600 to-orange-500',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="mt-20 relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 max-w-2xl">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">
              {slide.subtitle}
            </p>
            <Link
              to="/products"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 transition"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;