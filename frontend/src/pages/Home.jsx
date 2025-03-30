import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import BestSeller from '../components/Products/BestSeller'

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection />
        <NewArrivals/>
        <BestSeller/>
    </div>
  )
}

export default Home