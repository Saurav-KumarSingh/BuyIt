import React from 'react'
import mensCollectionImg from '../../assets/mens-collection.webp';
import womensCollectionImg from '../../assets/womens-collection.webp';
import { Link } from 'react-router-dom';


const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-10'>
        <div className='coontainer mx-auto flex flex-col md:flex-row gap-8'>
            {/* women's collection */}
            <div className="relative flex-1">
                <img src={womensCollectionImg} alt="Women's Collection" className='w-full h-[350px] md:h[700px] object-cover'/>
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-2">
                    <h2 className='text-xl font-bold text-gray-900 mb-3'>Women's Collection</h2>
                    <Link to="/collections/all?gender=Women" className='underline'>Shop Now</Link>
                </div>
            </div>
             {/* men's collection */}
             <div className="relative flex-1">
                <img src={mensCollectionImg} alt="Men's Collection" className='w-full h-[350px] md:h[700px] object-cover'/>
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                    <h2 className='text-xl font-bold text-gray-900 mb-3 tracking-tighter'>Men's Collection</h2>
                    <Link to="/collections/all?gender=Men" className='underline'>Shop Now</Link>
                </div>
            </div>
        </div>

    </section>
  )
}

export default GenderCollectionSection