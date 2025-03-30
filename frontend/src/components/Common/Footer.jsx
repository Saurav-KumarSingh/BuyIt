import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className='border-t py-12 px-4 md:px-8'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
                {/* Newsletter Section */}
                <div className='pr-3'>
                    <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                    <p className='text-gray-500 mb-4'>
                        Be the first to hear about new products, exclusive events, and online offers.
                    </p>
                    <p className='font-medium text-sm text-gray-600 mb-6'>Sign up and get 10% off on your first order.</p>
                    <form className='flex'>
                        <input 
                            type='email' 
                            placeholder='Enter your email' 
                            className='p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' 
                        />
                        <button 
                            type='submit' 
                            className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
                            Subscribe
                        </button>
                    </form>
                </div>
                
                {/* Shop Links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                    <ul className='space-y-2 text-gray-600'>
                        {["Men's top wear", "Women's top wear", "Men's bottom wear", "Women's bottom wear"].map((item, index) => (
                            <li key={index}>
                                <Link to="#" className='hover:text-gray-900 transition-colors'>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Support Links */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                    <ul className='space-y-2 text-gray-600'>
                        {['Contact Us', 'About Us', 'FAQs', 'Features'].map((item, index) => (
                            <li key={index}>
                                <Link to="#" className='hover:text-gray-900 transition-colors'>{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Follow Us */}
                <div>
                    <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                    <div className='text-gray-600 flex space-x-3'>
                        {[
                            { href: '#', icon: <TbBrandMeta className='h-5 w-5' /> },
                            { href: '#', icon: <IoLogoInstagram className='h-5 w-5' /> },
                            { href: '#', icon: <FaXTwitter className='h-5 w-5' /> }
                        ].map((social, index) => (
                            <a key={index} href={social.href} className='hover:text-gray-900 transition-colors'>
                                {social.icon}
                            </a>
                        ))}
                    </div>
                    <h3 className='text-md text-gray-700 mt-4 mb-2'>Call Us</h3>
                    <p>
                    <FiPhoneCall className='inline-block mr-2'/>
                    +91 72580-49434
                    </p>

                </div>
            </div>
            {/* footer bottom */}
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-600 pt-6'>
                <p className='text-gray-500 test-sm tracking-tighter text-center'>
                &copy; 2025, @sauravkumarsingh. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
