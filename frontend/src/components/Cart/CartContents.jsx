import React from 'react';
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId, quantity, size, color, increment) => {
        const newQuantity = increment ? quantity + 1 : quantity - 1;

        // Prevent quantity going below 1
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                userId,
                guestId,
                size,
                color
            }));
        }
    };



    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({ productId, userId, guestId, size, color }));
    };

    return (
        <div>
            {(cart?.products || []).map((product) => ( // ✅ FIXED: fallback to empty array
                <div key={product.productId} className="flex items-center justify-between py-4 border-b w-full">
                    {/* Left Section */}
                    <div className="flex items-start w-3/4">
                        <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg mr-4" />
                        <div>
                            <h3 className="text-sm font-medium">{product.name}</h3>
                            <p className="text-xs md:text-sm text-gray-600">Size: {product.size} | Color: {product.color}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => handleAddToCart(product.productId, product.quantity, product.size, product.color, false)}
                                    className="border rounded px-1 py-0.5 text-sm font-medium"
                                >-</button>
                                <p className="text-xs md:text-sm text-gray-600 px-2">{product.quantity}</p>
                                <button
                                    onClick={() => handleAddToCart(product.productId, product.quantity, product.size, product.color, true)}
                                    className="border rounded px-1 py-0.5 text-sm font-medium"
                                >+</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-end">
                        <p className="text-xs md:text-sm text-gray-600">₹ {Number(product.price).toLocaleString()}</p>
                        <button
                            onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                            className="mt-2"
                        >
                            <FaTrashCan className="text-sm text-red-600 hover:text-red-800" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;
