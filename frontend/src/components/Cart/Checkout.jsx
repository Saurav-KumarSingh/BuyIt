import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';

const cart = {
    cartProducts: [
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
    ], totalPrice: 1700,
};

const Checkout = () => {

    const navigate = useNavigate();

    const [checkoutId, setCheckoutId] = useState(null)

    const [shippingAddress, setShippinAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })

    const habdleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(1232321);
    }

    const handlePaymentSuccess = (details) => {
        console.log("Payment Successful", details);
        navigate('/order-confirmation')
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-4 tracking-tighter'>
            {/* left section  */}
            <div className="bg-white rounded-lg p-6 lg:w-full lg:h-auto">
                <h2 className="text-2xl uppercase mb-6">Checkout</h2>
                <form onSubmit={habdleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value="test@gmail.com" className="w-full px-2 py-1 border rounded" disabled />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className='block text-gray-700'>First Name</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippinAddress({ ...shippingAddress, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'>Last Name</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippinAddress({ ...shippingAddress, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4 ">
                        <label className="block text-gray-700">Address</label>
                        <input type="text" className="w-full px-2 py-1 border rounded"
                            value={shippingAddress.address}
                            onChange={(e) => setShippinAddress({ ...shippingAddress, address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className='block text-gray-700'> City</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.city}
                                onChange={(e) => setShippinAddress({ ...shippingAddress, city: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700'> Postal Code</label>
                            <input type="text" className="w-full px-2 py-1 border rounded"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippinAddress({ ...shippingAddress, postalCode: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4 ">
                        <label className="block text-gray-700">Country</label>
                        <input type="text" className="w-full px-2 py-1 border rounded"
                            value={shippingAddress.country}
                            onChange={(e) => setShippinAddress({ ...shippingAddress, country: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4 ">
                        <label className="block text-gray-700">Phone</label>
                        <input type="text" className="w-full px-2 py-1 border rounded"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippinAddress({ ...shippingAddress, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        {!checkoutId ? (<button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>) : (<div>
                            <h3 className="text-lg mb-4">Pay with PayPal</h3>
                            {/* paypal component  */}
                            <PayPalButton amount={20}
                                onSuccess={handlePaymentSuccess}
                                onError={(err) => alert("Payment failed. Try again.")}
                            />

                        </div>)}
                    </div>
                </form>
            </div>
            {/* right side  */}
            <div className="bg-gray-50 p-6 rounded-lg lg:w-full lg:h-auto">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart.cartProducts.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between py-2 border-b"
                        >
                            <div className="flex w-full"> {/* Added w-full here for full width container */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-24 object-cover mr-4 rounded-lg"
                                />
                                <div className="flex justify-between w-full items-center"> {/* Added items-center for vertical alignment */}
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
                    <p>₹{cart.totalPrice?.toLocaleString()}</p>

                </div>
            </div>
        </div>
    )
}

export default Checkout