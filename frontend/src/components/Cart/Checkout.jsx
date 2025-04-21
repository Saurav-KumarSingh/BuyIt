import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    const INR_TO_USD_RATE = 83;
    const usdAmount = cart?.totalPrice ? (cart.totalPrice / INR_TO_USD_RATE).toFixed(2) : 0;

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
            setCheckoutId(null);
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(createCheckout({
                checkoutItems: cart.products,
                shippingAddress,
                paymentMethod: "PayPal",
                totalPrice: cart.totalPrice,
            }));
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id);
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                });

            await handleFinalizeCheckout(checkoutId);

        } catch (error) {
            console.error("Error during payment: ", error);
            alert("Payment failed. Try again.");
        }
    };

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                });
            navigate('/order-confirmation');

        } catch (error) {
            console.error("Error finalizing checkout: ", error);
        }
    };

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-4 tracking-tighter'>
            {/* left section */}
            <div className="bg-white rounded-lg p-6 lg:w-full lg:h-auto">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={user ? user?.email : ""} className="w-full px-2 py-1 border rounded" disabled />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className='block text-gray-700'>First Name</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last Name</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input type="text" className="w-full px-2 py-1 border rounded"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className='block text-gray-700'>City</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Postal Code</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Country</label>
                        <input type="text" className="w-full px-2 py-1 border rounded"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input type="text" className="w-full px-2 py-1 border rounded"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        {!checkoutId ? (
                            <button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                                <PayPalButton
                                    amount={usdAmount}
                                    currency="USD"
                                    onSuccess={handlePaymentSuccess}
                                    onError={() => alert("Payment failed. Try again.")}
                                />
                                <p className="text-sm mt-2 text-gray-500">Amount in USD: ${usdAmount}</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* right section */}
            <div className="bg-gray-50 p-6 rounded-lg lg:w-full lg:h-auto">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart.products.map((product, index) => (
                        <div key={index} className="flex items-start justify-between py-2 border-b">
                            <div className="flex w-full">
                                <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded-lg" />
                                <div className="flex justify-between w-full items-center">
                                    <div>
                                        <h3 className="text-base">{product.name}</h3>
                                        <p className="text-gray-500">Size: {product.size}</p>
                                        <p className="text-gray-500">Color: {product.color}</p>
                                    </div>
                                    <p className="text-xl">₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>₹{cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                    <p>Total</p>
                    <div>
                        <p>₹{cart.totalPrice?.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">~ ${usdAmount} USD</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
