import React from 'react';
import { Link } from 'react-router-dom';
import featuredImage from '../../assets/featuredb.webp';

const FeaturedCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-10'>
      <div className='container mx-auto flex flex-col-reverse justify-between lg:flex-row items-center bg-green-50 rounded-3xl'>
        {/* Left Content */}
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>Comfort and Style</h2>
          <h2 className='text-4xl lg:text-5xl mb-6'>Apparel made for your everyday life.</h2>
          <p className='text-lg text-gray-600 mb-6'>
            Discover high-quality, comfortable clothing that effortlessly blends fashion. Designed to make you look and feel great every day.
          </p>
          <Link to="collections/all" className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>
            Shop Now
          </Link>
        </div>

        {/* Right Content (Image) */}
        <div className="lg:w-1/2 md:p-4 lg:p-0 max-h-screen overflow-hidden  lg:rounded-tr-3xl lg:rounded-br-2xl" >
          <img 
            src={featuredImage} 
            alt="Featured Collection" 
            className=' w-full object-cover' 
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
