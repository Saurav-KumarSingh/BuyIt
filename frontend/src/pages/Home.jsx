import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import BestSeller from '../components/Products/BestSeller'
import YouMayLike from '../components/Products/YouMayLike'
import TopForWomen from '../components/Products/TopForWomen'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <BestSeller />
      <YouMayLike />
      <TopForWomen/>
      <FeaturedCollection/>
      <FeatureSection/>
    </div>
  )
}

export default Home