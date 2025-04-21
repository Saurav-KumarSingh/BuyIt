import React from 'react'
import ProductDetail from './ProductDetail'

const BestSeller = ({productId}) => {
  return (
    <section className='mt-12'>
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetail productId={productId}/>
    </section>
  )
}

export default BestSeller