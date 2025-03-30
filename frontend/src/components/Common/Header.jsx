import React from 'react'
import TopBar from '../Layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='border border-b-1 sticky top-0 z-10 bg-white'>
        {/* Topbar */}
        <TopBar />
        {/* navbar */}
        <Navbar />
    </header>
  )
}

export default Header