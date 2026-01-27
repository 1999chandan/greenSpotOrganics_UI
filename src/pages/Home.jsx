import React from 'react'
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';  
import ProductGrid from '../components/product/ProductGrid'; 
import HeroSection from '../components/layout/HeroSection';
function Home() {
  return (
    
<div className="min-h-screen bg-gray-50">
  {/* Header */}
  <Navbar/>
  
  {/* Hero Section */}
  <HeroSection/>

  {/* Products Grid */}
  <ProductGrid/>

  {/* Footer */}
  <Footer/>
</div>
  )
}

export default Home