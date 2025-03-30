import React from 'react'
import { TbBrandMeta } from "react-icons/tb"
import { IoLogoInstagram } from "react-icons/io"
import { FaXTwitter } from "react-icons/fa6";

const TopBar = () => {
  return (
    <>
      <div className=" flex justify-between items-center px-4 md:px-6 bg-buyit-red text-white py-2">
        {/* Social Icons */}
        <div className='hidden md:flex items-center gap-x-4'>
          <a href="#" className='hover:text-gray-300'><TbBrandMeta className='h-5 w-5'/></a>
          <a href="#" className='hover:text-gray-300'><IoLogoInstagram className='h-5 w-5'/></a>
          <a href="#" className='hover:text-gray-300'><FaXTwitter className='h-4 w-4'/></a>
        </div>

        {/* Shipping Info */}
        <div className='text-sm text-center flex-grow'>
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>

        {/* Contact Info */}
        <div className='hidden md:block text-sm ml-auto'>
          <a href="tel:+91 7258049434" className='hover:text-gray-300'>+91 7258049434</a>
        </div>
      </div>
    </>
  )
}

export default TopBar;
