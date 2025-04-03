import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const selectedProduct = {
    name: "Stylish Jacket",
    price: 1200,
    originalPrice: 1500,
    description: "This is a stylish jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket",
      },
    ],
  };

  const [mainImage, setMainImage] = useState(selectedProduct.images[0].url);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Initially enabled

  // Handle quantity increase/decrease
  const handleQuantityChange = (action) => {
    setQuantity((prev) => {
      if (action === "plus") return prev + 1;
      if (action === "minus" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart", { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);
    
    // Re-enable the button after 5 seconds
    setTimeout(() => {
      toast.success("Product added to cart!", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 5000);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                onClick={() => setMainImage(image.url)}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:1/2">
            <div className="mb-4">
              <img key={mainImage} src={mainImage} alt="Main Product" className="w-full h-auto object-cover rounded-lg" />
            </div>
          </div>

          {/* mobile Thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
          {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                onClick={() => setMainImage(image.url)}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Right Side Details */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>

            <div className="flex gap-6">
              <p className="text-lg text-gray-600 line-through">{selectedProduct.originalPrice && `₹ ${selectedProduct.originalPrice}`}</p>
              <p className="text-xl text-gray-500 mb-2">₹ {selectedProduct.price}</p>
            </div>

            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Colors */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Colors:</p>
              <div className="flex gap-2">
                {selectedProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? "border-black border-3 scale-105" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.5)" }}
                  ></button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Size:</p>
              <div className="flex gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button onClick={() => handleQuantityChange("minus")} className="px-2 py-1 bg-gray-200 rounded text-lg">
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button onClick={() => handleQuantityChange("plus")} className="px-2 py-1 bg-gray-200 rounded text-lg">
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`py-2 px-6 rounded w-full mb-4 transition-all ${
                isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to cart"}
            </button>

            {/* Product Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> {/* End Right Side */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
