import React from 'react'
import ProductGrid from './ProductGrid'

const TopForWomen = ({products,loading,error}) => {
    
  return (
    <section className='mt-12'>
        <h2 className='text-3xl text-center font-bold mb-8'>Top Wear for Women</h2>
        <ProductGrid products={products} loading={loading} error={error}/>
    </section>
  )
}

export default TopForWomen