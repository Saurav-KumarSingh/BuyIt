import React from 'react'
import ProductGrid from './ProductGrid';

const YouMayLike = () => {

    const products = [
        {
          id: 1,
          name: "Stylish Jacket",
          price: 1200,
          images: [
            { url: "https://picsum.photos/500/500?random=10", altText: "Stylish Jacket" },
            { url: "https://picsum.photos/500/500?random=11", altText: "Stylish Jacket" },
          ],
        },
        {
          id: 2,
          name: "Casual Hoodie",
          price: 900,
          images: [
            { url: "https://picsum.photos/500/500?random=20", altText: "Casual Hoodie" },
            { url: "https://picsum.photos/500/500?random=21", altText: "Casual Hoodie" },
          ],
        },
        {
          id: 3,
          name: "Denim Shirt",
          price: 1100,
          images: [
            { url: "https://picsum.photos/500/500?random=30", altText: "Denim Shirt" },
            { url: "https://picsum.photos/500/500?random=31", altText: "Denim Shirt" },
          ],
        },
        {
          id: 4,
          name: "Leather Boots",
          price: 2500,
          images: [
            { url: "https://picsum.photos/500/500?random=40", altText: "Leather Boots" },
            { url: "https://picsum.photos/500/500?random=41", altText: "Leather Boots" },
          ],
        },
      ];
      
  return (
    <section className='mt-12'>
    <h2 className='text-3xl text-center font-bold mb-8'>You may Also Like</h2>
    <ProductGrid products={products} className={"md:mx-10 gap-4"}/>
</section>
  )
}

export default YouMayLike