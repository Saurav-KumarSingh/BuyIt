import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = async (orderId, status, showConfirm = false) => {
    const update = async () => {
      const result = await dispatch(updateOrderStatus({ id: orderId, status }));
      if (updateOrderStatus.fulfilled.match(result)) {
        toast.success("Order status updated.");
      } else {
        toast.error(result.payload?.message || "Failed to update status.");
      }
    };

    if (showConfirm && status === "Delivered") {
      toast(
        (t) => (
          <div className="flex flex-col items-center text-center gap-2">
            <span>
              Are you sure you want to mark this order as <b>Delivered</b>?
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  update();
                  toast.dismiss(t);
                }}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => toast.dismiss(t)}
                className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    } else {
      update();
    }
  };

  if (loading) return <div id="loading-overlay" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60">

  <svg class="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
  </svg>

  <span class="text-white text-3xl font-bold">Loading orders...</span>

</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{order._id}</td>
                  <td className="p-4">{order.user?.name}</td>
                  <td className="p-4">₹{order.totalPrice}</td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered", true)}
                      disabled={order.status === "Delivered"}
                      className={`px-4 py-2 rounded text-white transition 
    ${order.status === "Delivered"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      Mark as Delivered
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
