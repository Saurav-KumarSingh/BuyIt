import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    }
    const handleSearch = (e) => {
        e.preventDefault(); 
        console.log("search term: " + searchTerm);
        setIsOpen(false);
        setSearchTerm("");
    };
    
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute left-0 top-0 w-full bg-white h-24 z-999" : "w-auto"}`}>
            {isOpen ? (<form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                <div className='relative w-1/2 flex'>
                    <input type="text" placeholder='search...' value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className='bg-gray-100  py-3 pl-2 pr-12 rounded-lg focus:outline-none w-full' />
                    <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition delay-150 duration-200 ease-in-out hover:-translate-y-3 hover:scale-105'><CiSearch className='h-6 w-6' /></button>
                </div>
                <button onClick={handleSearchToggle} className='absolute right-4  top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition delay-150 duration-200 ease-in-out hover:-translate-y-3 hover:scale-125'><RxCross2 className='h-5 w-5' /></button>
            </form>) : (<button onClick={handleSearchToggle}><CiSearch className='h-6 w-6 space-x-6 text-gray-700' /></button>)}
        </div>
    )
}

export default Searchbar 