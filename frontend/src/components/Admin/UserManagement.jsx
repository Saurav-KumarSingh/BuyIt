import React, { useState } from 'react';

const UserManagement = () => {
    const [users, setUsers] = useState([
        {
            _id: 1,
            name: "Sks",
            email: "sks123@gmail.com",
            role: "admin",
        },
    ]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer", // default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            _id: Date.now(), // unique _id
            name: formData.name,
            email: formData.email,
            role: formData.role,
        };

        setUsers([...users, newUser]);

        // Reset the form
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        });
    };

    const handleRoleChange = (user_id, newRole) => {
        const updatedUsers = users.map((user) =>
            user._id === user_id ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);
        console.log(updatedUsers);
    };

    const handleDelete=(userId)=>{
        if(window.confirm("Are you sure, you want to delete this user?")){
            console.log("deleting user with ID:"+userId);
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>

            {/* Add New User Form */}
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
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add User
                    </button>
                </form>
            </div>

            {/* User List */}
            {/* User List */}
<div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-4">User List</h3>
    
    {/* Scrollable container */}
    <div className="overflow-x-auto max-h-96">
        <table className="min-w-full text-left leading-normal">
            <thead>
                <tr>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-w_ider">
                        Name
                    </th>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-w_ider">
                        Email
                    </th>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-w_ider">
                        Role
                    </th>
                    <th className="px-5 py-3 border-b-2 text-xs font-semibold text-gray-600 uppercase tracking-w_ider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td className="px-5 py-5 border-b text-sm">{user.name}</td>
                        <td className="px-5 py-5 border-b text-sm">{user.email}</td>
                        <td className="px-5 py-5 border-b text-sm">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                className="p-2 border rounded px-4"
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td className="px-5 py-5 border-b text-sm">
                            <button onClick={()=>handleDelete(user._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

        </div>
    );
};

export default UserManagement;
