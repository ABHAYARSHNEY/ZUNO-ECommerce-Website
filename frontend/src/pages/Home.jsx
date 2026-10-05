import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/categories'
import BestSeller from '../components/BestSeller'
import { BottomBanner } from '../components/BottomBanner'
import Newsletter from '../components/Newsletter'
// import Footer from '../components/Footer'
// import Navbar from '../components/Navbar'

const Home = () => {
  return (
    
   <div className='mt-10'>
    <MainBanner/>
    <Categories/>
    <BestSeller/>
    <BottomBanner/>
    <Newsletter/>
   </div>
    
  )
}

export default Home