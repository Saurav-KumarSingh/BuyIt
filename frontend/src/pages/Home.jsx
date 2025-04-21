import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import BestSeller from '../components/Products/BestSeller'
import TopForWomen from '../components/Products/TopForWomen'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'

import { useDispatch, useSelector } from "react-redux"
import { fetchFilteredProducts } from '../redux/slices/productSlice'
import axios from 'axios'

const Home = () => {
  const dispatch = useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const [bestSellerProduct,setBestSellerProduct]=useState([]);

  useEffect(()=>{
    // fetch product for a specific collection 
    dispatch(fetchFilteredProducts({
      gender:"Women",
      category:"Top Wear",
      limit:8,
    }));

    const fetchBestSellerProduct=async()=>{
      try {
        const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);

        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchBestSellerProduct();
  },[dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {bestSellerProduct ? <BestSeller productId={bestSellerProduct._id} />:<p>Loading best seller product...</p>}
      <TopForWomen products={products} loading={loading} error={error}/>
      <FeaturedCollection />
      <FeatureSection />
    </div>
  )
}

export default Home