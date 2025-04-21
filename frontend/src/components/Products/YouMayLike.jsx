import React from 'react'
import ProductGrid from './ProductGrid';

const YouMayLike = ({products,loading, error}) => {

      
  return (
    <section className='mt-12'>
    <h2 className='text-3xl text-center font-bold mb-8'>You may Also Like</h2>
    <ProductGrid products={products} loading={loading} error={error} className={"md:mx-10 gap-4"}/>
</section>
  )
}

export default YouMayLike