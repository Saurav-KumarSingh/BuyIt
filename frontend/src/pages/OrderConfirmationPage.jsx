import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const OrderConfirmationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    // Format date to DD/MM/YYYY
    const formatDateToDDMMYYYY = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Calculate estimated delivery (10 days from createdAt)
    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10);
        return formatDateToDDMMYYYY(orderDate);
    };

    // Clear the cart when order is confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-order");
        }
    }, [checkout, dispatch, navigate]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
                Thank You for Your Order!
            </h1>

            {checkout && (
                <div className="p-6 rounded-lg border">
                    <div className="flex justify-between mb-20">
                        {/* Order Id and Date */}
                        <div>
                            <h2 className="text-xl font-semibold">
                                Order ID: {checkout._id}
                            </h2>
                            <p className='text-gray-500'>
                                Order date: {formatDateToDDMMYYYY(checkout.createdAt)}
                            </p>
                        </div>
                        {/* Estimated Delivery */}
                        <div>
                            <p className="text-emerald-700 text-sm">
                                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* Ordered items */}
                    <div className="mb-20">
                        {checkout.checkoutItems.map((item) => (
                            <div key={item.productId} className="item items-center mb-4 flex border-b-2 pb-2">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                                    <div>
                                        <h4 className="text-base font-semibold">{item.name}</h4>
                                        <p className='text-sm text-gray-500 '>
                                            {item.color} | {item.size}
                                        </p>
                                    </div>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className='text-base'>₹{item.price}</p>
                                    <p className='text-sm text-gray-500 '>Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment and Delivery Info */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Payment Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Payment</h4>
                            <p className="text-gray-600">PayPal</p>
                        </div>

                        {/* Delivery Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                            <p className="text-gray-600">
                                {checkout.shippingAddress.address}
                            </p>
                            <p className="text-gray-600">
                                {checkout.shippingAddress.city}, {checkout.shippingAddress.postalCode}, {checkout.shippingAddress.country}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmationPage;
