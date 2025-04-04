import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const itemRef = useRef(null); // Reference for image width
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [itemWidth, setItemWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Get the width of one image dynamically
    useEffect(() => {
        const updateItemWidth = () => {
            if (itemRef.current) {
                setItemWidth(itemRef.current.offsetWidth);
            }
        };

        updateItemWidth();
        window.addEventListener("resize", updateItemWidth);

        return () => window.removeEventListener("resize", updateItemWidth);
    }, []);

    // Scroll by exactly one image
    const scroll = (direction) => {
        if (!itemWidth) return;

        const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Update visibility of scroll buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        if (container) {
            const leftScroll = container.scrollLeft;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(leftScroll < maxScrollLeft);
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();

            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, []);

    // Handle Dragging (Click & Drag Scrolling)
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Speed of drag
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    const newArrivals = [
        { _id: "1", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }] },
        { _id: "2", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket" }] },
        { _id: "3", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Stylish Jacket" }] },
        { _id: "4", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Stylish Jacket" }] },
        { _id: "5", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Stylish Jacket" }] },
        { _id: "6", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=6", altText: "Stylish Jacket" }] },
        { _id: "7", name: "Stylish Jacket", price: 120, images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Stylish Jacket" }] },
    ];

    return (
        <section>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>
                {/* Scroll Buttons */}
                <div className="absolute right-1 bottom-[-30px] flex space-x-2">
                    <button onClick={() => scroll("left")} disabled={!canScrollLeft}
                        className={`p-2 rounded-full border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FaChevronLeft className='text-2xl' />
                    </button>
                    <button onClick={() => scroll("right")} disabled={!canScrollRight}
                        className={`p-2 rounded-full border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FaChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            {/* Scrollable Contents with Drag Feature */}
            <div 
                ref={scrollRef} 
                className={`container mx-auto overflow-x-scroll flex space-x-6 relative px-2 
                    scrollbar-hide scroll-smooth ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {newArrivals.map((product, index) => (
                    <div key={product._id} 
                        ref={index === 0 ? itemRef : null} // Set ref on the first image only
                        className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img src={product.images[0]?.url} alt={product.images[0]?.altText} className='w-full h-[450px] object-cover rounded-lg' />
                        <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
