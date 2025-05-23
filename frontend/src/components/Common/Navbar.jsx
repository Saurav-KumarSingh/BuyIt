import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
import Searchbar from './Searchbar';
import CartDrawer from '../Layout/CartDrawer';
import { RxCross2 } from "react-icons/rx";
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }
  const handleNavDrawerToggle = () => {
    setIsNavDrawerOpen(!isNavDrawerOpen);
  }

  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth);

  const {cart}=useSelector((state)=>state.cart);
  const cartItemCount=cart?.products?.reduce((total,product)=>total + product.quantity,0) || 0;
  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-3 px-5'>
        {/* logo */}
        <div><Link to='/' className='text-2xl font-medium'><Logo className='md:h-14 h-8 '/></Link></div>
        {/* center navlink */}
        <div className='hidden md:flex space-x-6'>
          <Link to="collections/all" className='text-gray-700 hover:text-black text-sm uppercase'>All</Link>
          <Link to="collections/all/?gender=Men" className='text-gray-700 hover:text-black text-sm uppercase'>Men</Link>
          <Link to="collections/all/?gender=Women" className='text-gray-700 hover:text-black text-sm uppercase'>Women</Link>
          <Link to="collections/all/?category=Top Wear" className='text-gray-700 hover:text-black text-sm uppercase'>Top wear</Link>
          <Link to="collections/all/?category=Bottom Wear" className='text-gray-700 hover:text-black text-sm uppercase'>Bottom Wear</Link>
        </div>
        {/* right icons */}
        <div className='flex items-center space-x-4'>
          {user && user?.role==="admin" && <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>}
          <Link to="/profile" className='text-gray-700 hover:text-black text-sm uppercase'><CiUser className='h-6 w-6 text-gray-700' /></Link>
          <button onClick={handleDrawerToggle} className='relative hover:text-black'>
            <CiShoppingCart className='h-6 w-6 text-gray-700' />
            {cartItemCount>0 &&<span className='absolute -top-1 bg-buyit-red text-white text-xs rounded-full px-1.5 py-0.5'>{cartItemCount}</span>}
          </button>
          {/* search */}
          <div className='overflow-hidden'><Searchbar /></div>
          {/* nav bars  */}
          <button onClick={handleNavDrawerToggle} className='md:hidden'>
            <FaBarsStaggered className='h-6 w-6 text-gray-700' />
          </button>
        </div>

      </nav>
      <CartDrawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* mobile navigation  */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:hidden h-full bg-white shadow-lg transform transition-transform duration-300 z-990 ${isNavDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Close button */}
        <div className="flex justify-end p-4 text-gray-600 hover:text-gray-800 transition hover:-translate-x-4 duration-200 ease-in-out hover:scale-110">
          <button onClick={handleNavDrawerToggle} aria-label="Close cart drawer">
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>
        <h2 className='p-4 font-semibold'>Menu</h2>
        <nav className=' flex flex-col space-y-4 '>
          <Link to="collections/all" className='text-gray-700 hover:text-black text-sm uppercase hover:bg-gray-100 p-4'>All</Link>
          <Link to="collections/all/?gender=Men" className='text-gray-700 hover:text-black text-sm uppercase hover:bg-gray-100 p-4'>Men</Link>
          <Link to="collections/all/?gender=Women" className='text-gray-700 hover:text-black text-sm uppercase hover:bg-gray-100 p-4'>Women</Link>
          <Link to="collections/all/?category=Top Wear" className='text-gray-700 hover:text-black text-sm uppercase hover:bg-gray-100 p-4'>Top wear</Link>
          <Link to="collections/all/?category=Bottom Wear" className='text-gray-700 hover:text-black text-sm uppercase hover:bg-gray-100 p-4'>Bottom Wear</Link>
          {/* <Link to="/admin" className='inline-block bg-black px-2 rounded text-sm text-white'>Admin</Link> */}

        </nav>
      </div>
    </>
  )
}

export default Navbar