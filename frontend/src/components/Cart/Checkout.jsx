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

    const [checkoutId,setCheckoutId]=useState(null)

    const [shippingAddress, setShippinAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })

    const habdleCreateCheckout=(e)=>{
        e.preventDefault();
        setCheckoutId(1234);
    }

    const handlePaymentSuccess=(details)=>{
        console.log("Payment Successful",details);
        navigate('/order-confirmation')
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-10 px-4 tracking-tighter'>
            {/* left section  */}
            <div className="bg-white rounded-lg p-6">
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
                        {!checkoutId?(<button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>):(<div>
                            <h3 className="text-lg mb-4">Pay with PayPal</h3>
                            {/* paypal component  */}
                            <PayPalButton amount={20} 
                            onSuccess={handlePaymentSuccess}
                            onError={(err)=>alert("Payment failed. Try again.")}
                            />

                        </div>)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout