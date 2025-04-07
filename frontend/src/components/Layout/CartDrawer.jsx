import React from 'react'
import { RxCross2 } from "react-icons/rx";
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isDrawerOpen, handleDrawerToggle }) => {

  const navigate=useNavigate(); 

  const handleCheckout=()=>{
    navigate("/checkout")
    handleDrawerToggle();
    
  }
  return (
    <>
      <div className={`fixed top-0 right-0 w-1/1 sm:w-1/2 md:w-2/5 lg:1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-990 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close button */}
        <div className="flex justify-end p-4 text-gray-600 hover:text-gray-800 transition hover:-translate-x-4 duration-200 ease-in-out hover:scale-110">
          <button onClick={handleDrawerToggle} aria-label="Close cart drawer">
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>
        {/* card content */}
        <div className="flex-grow p-4 overflow-y-auto ">
          <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
          {/* cart components */}
          <CartContents />
        </div>

        {/* checkout button */}
        <div className='p-4 bg-white stickey bottom-0'>
          <button onClick={handleCheckout} className='w-full bg-black py-3 text-white rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
          <p className='text-xs tracking-tighter text-gray-400 mt-2 text-center'>Shipping, taxes and discount codes are calculated at checkout.</p>
        </div>
      </div>
    </>
  )
}

export default CartDrawer