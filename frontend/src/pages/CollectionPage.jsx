import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        // Close sidebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicking outside
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchedProducts = [
            {
                id: 1,
                name: "Stylish Jacket",
                price: 1200,
                images: [
                    { url: "https://picsum.photos/500/500?random=10", altText: "Stylish Jacket" },
                    { url: "https://picsum.photos/500/500?random=11", altText: "Stylish Jacket" },
                ],
            },
            {
                id: 2,
                name: "Casual Hoodie",
                price: 900,
                images: [
                    { url: "https://picsum.photos/500/500?random=20", altText: "Casual Hoodie" },
                    { url: "https://picsum.photos/500/500?random=21", altText: "Casual Hoodie" },
                ],
            },
            {
                id: 3,
                name: "Denim Shirt",
                price: 1100,
                images: [
                    { url: "https://picsum.photos/500/500?random=30", altText: "Denim Shirt" },
                    { url: "https://picsum.photos/500/500?random=31", altText: "Denim Shirt" },
                ],
            },
            {
                id: 4,
                name: "Leather Boots",
                price: 2500,
                images: [
                    { url: "https://picsum.photos/500/500?random=40", altText: "Leather Boots" },
                    { url: "https://picsum.photos/500/500?random=41", altText: "Leather Boots" },
                ],
            },
            {
                id: 5,
                name: "Casual Hoodie",
                price: 900,
                images: [
                    { url: "https://picsum.photos/500/500?random=22", altText: "Casual Hoodie" },
                    { url: "https://picsum.photos/500/500?random=23", altText: "Casual Hoodie" },
                ],
            },
            {
                id: 6,
                name: "Denim Shirt",
                price: 1100,
                images: [
                    { url: "https://picsum.photos/500/500?random=24", altText: "Denim Shirt" },
                    { url: "https://picsum.photos/500/500?random=25", altText: "Denim Shirt" },
                ],
            },
            {
                id: 7,
                name: "Leather Boots",
                price: 2500,
                images: [
                    { url: "https://picsum.photos/500/500?random=26", altText: "Leather Boots" },
                    { url: "https://picsum.photos/500/500?random=27", altText: "Leather Boots" },
                ],
            },
        ];
        setProducts(fetchedProducts); // ✅ Now setting the products state
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile filter button */}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center text-center">
                <FaFilter className="mr-2" /> Filters
            </button>

            {/* Filter Sidebar */}
            <div
                ref={sidebarRef}
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-30 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>

            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>

                {/* Sort Options */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products} />
            </div>
        </div>
    );
};

export default CollectionPage;
