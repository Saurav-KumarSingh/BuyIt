import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);

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
        }, 1000);
    }, []);

    const tableHeadings = ["Image", "Order ID", "Created", "Shipping", "Items", "Price", "Status"];

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                {/* Table container for scrolling on small screens */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        {/* Table Header */}
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                {tableHeadings.map((heading, index) => (
                                    <th key={index} className="py-2 px-4 sm:py-3">{heading}</th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                        {/* Image */}
                                        <td className="p-2 sm:p-3">
                                            <img
                                                src={order.orderItems[0].image}
                                                alt={order.orderItems[0].name}
                                                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                            />
                                        </td>

                                        {/* Order ID */}
                                        <td className="p-2 sm:p-3 truncate max-w-[100px]">{order._id}</td>

                                        {/* Created Date */}
                                        <td className="p-2 sm:p-3">{order.createdAt.toLocaleDateString()}</td>

                                        {/* Shipping Address */}
                                        <td className="p-2 sm:p-3 truncate max-w-[150px]">
                                            {order.shippingAddress.city}, {order.shippingAddress.country}
                                        </td>

                                        {/* Items (Show Item Names) */}
                                        <td className="p-2 sm:p-3 truncate max-w-[150px]">
                                            {order.orderItems.map((item) => item.name).join(", ")}
                                        </td>

                                        {/* Total Price */}
                                        <td className="p-2 sm:p-3 font-semibold">₹{order.totalPrice}</td>

                                        {/* Payment Status */}
                                        <td className="p-2 sm:p-3">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded 
                                                ${order.isPaid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                                            >
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-6 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrdersPage;
