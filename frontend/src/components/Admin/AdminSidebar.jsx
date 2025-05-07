import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaClipboardList, FaStore, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import Logo from "../Common/Logo";

const AdminSidebar = () => {
  const navItems = [
      { to: "/admin/users", label: "Users", icon: <FaUsers /> },
      { to: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
    { to: "/admin/orders", label: "Orders", icon: <FaClipboardList /> },
    { to: "/", label: "Shop", icon: <FaStore /> },
  ];

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=()=>{
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  }

  return (
    <div className="sticky top-0 p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-2xl font-medium">
          <Logo className="h-12"/>
        </Link>
      </div>
      <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-6">
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2">
        <FaSignOutAlt/>
        <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;