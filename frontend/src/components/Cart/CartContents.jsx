import React from 'react';
import { FaTrashCan } from "react-icons/fa6";

const CartContents = () => {
    const cartProducts = [
        {
            productId: 1,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 500,
            image: "https://picsum.photos/200?random=1"
        },
        {
            productId: 2,
            name: "Jeans",
            size: "XL",
            color: "Black",
            quantity: 1,
            price: 1200,
            image: "https://picsum.photos/200?random=2"
        },
    ];

    return (
        <div>
            {cartProducts.map((product) => (
                <div key={product.productId} className="flex items-center justify-between py-4 border-b w-full">

                    {/* Left Section: Image + Product Info */}
                    <div className="flex items-start w-3/4">
                        <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg mr-4" />
                        <div>
                            <h3 className="text-sm font-medium">{product.name}</h3>
                            <p className="text-xs md:text-sm text-gray-600">Size: {product.size} | Color: {product.color}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-2">
                                <button className="border rounded px-1 py-0.5 text-sm font-medium">-</button>
                                <p className="text-xs md:text-sm text-gray-600 px-2">{product.quantity}</p>
                                <button className="border rounded px-1 py-0.5 text-sm font-medium">+</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Price + Delete Button */}
                    <div className="flex flex-col items-end">
                        <p className="text-xs md:text-sm text-gray-600">₹ {product.price.toLocaleString()}</p>
                        <button className="mt-2">
                            <FaTrashCan className="text-sm text-red-600 hover:text-red-800" />
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default CartContents;
