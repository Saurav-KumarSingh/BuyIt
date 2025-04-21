import React from 'react'
import { RxCross2 } from "react-icons/rx";
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ isDrawerOpen, handleDrawerToggle }) => {
  const navigate = useNavigate(); 
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart); // ✅ FIXED: pull cart from correct slice

  const userId = user ? user._id : null;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
    handleDrawerToggle();
  };

  return (
    <>
      <div className={`fixed top-0 right-0 w-1/1 sm:w-1/2 md:w-2/5 lg:1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-990 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Close button */}
        <div className="flex justify-end p-4 text-gray-600 hover:text-gray-800 transition hover:-translate-x-4 duration-200 ease-in-out hover:scale-110">
          <button onClick={handleDrawerToggle} aria-label="Close cart drawer">
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>

        {/* cart content */}
        <div className="flex-grow p-4 overflow-y-auto ">
          <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
          {
            cart?.products?.length > 0 
              ? <CartContents cart={cart} userId={userId} guestId={guestId} />
              : <p className="text-center text-xl font-semibold text-gray-600 mt-20">Your cart is empty</p>
          }
        </div>

        {/* checkout button */}
        <div className='p-4 bg-white stickey bottom-0'>
          <button onClick={handleCheckout} className='w-full bg-black py-3 text-white rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
          <p className='text-xs tracking-tighter text-gray-400 mt-2 text-center'>Shipping, taxes and discount codes are calculated at checkout.</p>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;
