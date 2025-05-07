import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createProduct } from '../../redux/slices/adminProductSlice'; 
import axios from 'axios';

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',       
    brand: '',
    sizes: [],
    colors: [],
    collections: '',    
    material: '',
    gender: '',         
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgUrl = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: '' }],
      }));
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success('Product created successfully!', { duration: 5000 });
      navigate('/admin/products');
    } catch (err) {
      toast.error('Failed to create product');
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md bg-white rounded-md">
      <h2 className="text-3xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Category</label>
          <input
            type="text"
            name="category"
            placeholder='Top Wear/Bottom Wear'
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Collections */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Collections</label>
          <input
            type="text"
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Gender */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Gender</label>
          <input
            type="text"
            name="gender"
            placeholder='Men, Women or Unisex'
            value={productData.gender}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            placeholder='X, XL...'
            value={productData.sizes.join(', ')}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(',').map((s) => s.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            placeholder='black, blue...'
            value={productData.colors.join(', ')}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(',').map((c) => c.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleImgUrl}
            className="w-full border border-gray-300 rounded-md py-2 px-3"
          />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.altText || 'Product'}
                className="w-20 h-20 object-cover rounded-md shadow"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
