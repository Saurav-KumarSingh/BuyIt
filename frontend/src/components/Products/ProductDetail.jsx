import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import YouMayLike from "./YouMayLike";

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);

  const productFetchId = productId || id;

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

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

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images?.map((image, index) => (
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
                <img
                  key={mainImage}
                  src={mainImage || "/placeholder.png"}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {selectedProduct.images?.map((image, index) => (
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

            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>

              <div className="flex gap-6 items-center">
                {selectedProduct.originalPrice && (
                  <p className="text-lg text-gray-500 line-through">
                    ₹ {selectedProduct.originalPrice.toLocaleString()}
                  </p>
                )}
                <p className="text-xl text-black font-semibold">
                  ₹ {selectedProduct.price?.toLocaleString()}
                </p>
              </div>

              <p className="text-gray-600 mt-3 mb-6">{selectedProduct.description}</p>

              {/* Color Options */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Colors:</p>
                <div className="flex gap-2">
                  {selectedProduct.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border transition-transform ${
                        selectedColor === color ? "border-black border-3 scale-105" : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.75)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Size:</p>
                <div className="flex gap-2">
                  {selectedProduct.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black border-gray-300"
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
                  <button onClick={() => handleQuantityChange("minus")} className="px-3 py-1 bg-gray-200 rounded">
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button onClick={() => handleQuantityChange("plus")} className="px-3 py-1 bg-gray-200 rounded">
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`py-3 px-6 rounded w-full text-white font-medium ${
                  isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                } transition-all`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>

              {/* Product Details */}
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Product Info</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Brand</td>
                      <td className="py-1">{selectedProduct.brand || "N/A"}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Material</td>
                      <td className="py-1">{selectedProduct.material || "N/A"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* You May Like */}
          <div className="mt-16">
            <YouMayLike products={similarProducts} loading={loading} error={error} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
