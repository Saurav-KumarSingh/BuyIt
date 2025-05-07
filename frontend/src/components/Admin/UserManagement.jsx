import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import {
  addUser,
  deleteUser,
  updateUser,
  fetchUsers,
} from '../../redux/slices/adminSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      dispatch(fetchUsers());
    }
  }, [user, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData)).then((res) => {
      if (!res.error) {
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'customer',
        });
      }
    });
  };

  const handleRoleChange = (user_id, newRole) => {
    const userToUpdate = users.find((u) => u._id === user_id);
    if (!userToUpdate) return;
  
    dispatch(updateUser({
      id: user_id,
      name: userToUpdate.name,
      email: userToUpdate.email,
      role: newRole,
    })).then((res) => {
      if (!res.error) {
        toast.success(`Role updated to ${newRole} successfully`);
        dispatch(fetchUsers());
      }
    });
  };
  

  const handleDelete = (userId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this user?</span>
          <div className="flex justify-evenly mt-2">
            <button
              onClick={() => {
                dispatch(deleteUser(userId));
                toast.dismiss(t); // close toast
                toast.success("User deleted successfully");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000, 
        position:"top-center",
      }
    );
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {loading ? <div id="loading-overlay" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60">

<svg class="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
    viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
    </path>
</svg>


<span class="text-white text-3xl font-bold">Loading...</span>

</div> : (
        <>
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Add New User */}
          <div className="p-6 rounded-lg mb-6 bg-white shadow">
            <h3 className="text-lg font-bold mb-4">Add New User</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-700'
                } text-white font-bold py-2 px-4 rounded`}
              >
                {loading ? 'Adding...' : 'Add User'}
              </button>
            </form>
          </div>

          {/* Users Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">User List</h3>
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full text-left leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="px-5 py-5 border-b text-sm">{u.name}</td>
                      <td className="px-5 py-5 border-b text-sm">{u.email}</td>
                      <td className="px-5 py-5 border-b text-sm">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="p-2 border rounded px-4"
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-5 py-5 border-b text-sm">
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !loading && (
                    <tr>
                      <td colSpan="4" className="px-5 py-5 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
