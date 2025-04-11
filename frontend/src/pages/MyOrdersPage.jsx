import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // ← Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "12345",
                    createdAt: new Date(),
                    shippingAddress: { city: "Hazaribagh", country: "India" },
                    orderItems: [
                        {
                            name: "Product A",
                            image: "https://picsum.photos/500/500?random=1",
                        },
                    ],
                    totalPrice: 1000,
                    isPaid: true,
                },
                {
                    _id: "12346",
                    createdAt: new Date(),
                    shippingAddress: { city: "Hazaribagh", country: "India" },
                    orderItems: [
                        {
                            name: "Product B",
                            image: "https://picsum.photos/500/500?random=2",
                        },
                    ],
                    totalPrice: 1500,
                    isPaid: false,
                },
            ];
            setOrders(mockOrders);
            setLoading(false); 
        }, 1000);
    }, []);

    const tableHeadings = ["Image", "Order ID", "Created", "Shipping", "Items", "Price", "Status"];

    const handleRowClick = (orderID) => {
        navigate(`/order/${orderID}`);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div class="flex items-center justify-center overflow-y-hidden text-gray-900 py-3">
                        <div>
                          <h1 class="text-xl md:text-6xl font-bold flex items-center">L<svg stroke="currentColor" fill="currentColor" stroke-width="0"
                              viewBox="0 0 22 25" class="animate-spin" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z">
                              </path>
                            </svg> ading . . .</h1>
                        </div>
                      </div>
                    ) : orders.length > 0 ? (
                        <table className="min-w-full text-left text-gray-500">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                                <tr>
                                    {tableHeadings.map((heading, index) => (
                                        <th key={index} className="py-2 px-4 sm:py-3">
                                            {heading}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} onClick={() => handleRowClick(order._id)} className="border-b hover:bg-gray-50 cursor-pointer">
                                        <td className="p-2 sm:p-3">
                                            <img
                                                src={order.orderItems[0].image}
                                                alt={order.orderItems[0].name}
                                                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="p-2 sm:p-3 truncate max-w-[100px]">{order._id}</td>
                                        <td className="p-2 sm:p-3">{order.createdAt.toLocaleDateString()}</td>
                                        <td className="p-2 sm:p-3 truncate max-w-[150px]">
                                            {order.shippingAddress.city}, {order.shippingAddress.country}
                                        </td>
                                        <td className="p-2 sm:p-3 truncate max-w-[150px]">
                                            {order.orderItems.map((item) => item.name).join(", ")}
                                        </td>
                                        <td className="p-2 sm:p-3 font-semibold">₹{order.totalPrice}</td>
                                        <td className="p-2 sm:p-3">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded 
                                                ${order.isPaid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                                            >
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-6 text-gray-500">No orders found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrdersPage;
