import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImage from "../assets/login.webp";

import { loginUser } from '../redux/slices/authSlice';
import { mergeCart } from '../redux/slices/cartSlice'; // ✅ ADD THIS IMPORT
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]); 

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(data));
        // ✅ Optional: You can also chain `.unwrap()` and show toast or errors
    };

    return (
        <div className='flex'>
            <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
                <form className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex justify-center mb-6'>
                        <h2 className='text-xl font-medium'>BuyIt</h2>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋🏻</h2>
                    <p className='text-center mb-6'>Enter email and password to login</p>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            className='w-full p-2 border rounded'
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='w-full bg-black text-white p-2 rounded-md font-semibold hover:bg-gray-800 transition duration-200'
                    >
                        Login
                    </button>
                    <div className="mt-6 text-center text-sm flex justify-center gap-2">
                        <p>Don't have an account?</p>
                        <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
            <div className='hidden md:block w-1/2 bg-gray-800'>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={loginImage} alt="Login to Account" className='h-[650px] w-full object-cover' />
                </div>
            </div>
        </div>
    );
};

export default Login;
