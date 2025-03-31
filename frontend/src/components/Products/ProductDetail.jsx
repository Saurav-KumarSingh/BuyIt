import React from 'react'

const ProductDetail = () => {
  const selectedProduct = {
    name: "Stylish Jacket",
    price: 1200,
    originalPrice: 1500,
    description: "This is a stylish jacket perfect for any occasion",
    brand: "FashinBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket"
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket"
      },
    ]
  }
  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* left thumnail */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
            {selectedProduct.images.map((image, index) => (
              <img key={index} src={image.url} alt={image.altText || `Thumnail ${index}`}
                className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
              />
            ))}
          </div>
          {/* main image */}
          <div className="md:1/2">
            <div className="mb-4">
              <img src={selectedProduct.images[0]?.url} alt="Main Product" className='w-full h-auto obcov
              rounded-lg' />
            </div>
          </div>
          {/* mobile thumbnail */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img key={index} src={image.url} alt={image.altText || `Thumnail ${index}`}
                className='w-20 h-20 object-cover rounded-lg cursor-pointer border'
              />
            ))}
          </div>
          {/* right side */}
          <div className="md:w-1/2 md:ml10">
            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
              {selectedProduct.name}
            </h1>
           <div className='flex gap-6'>
           <p className='text-lg text-gray-600 line-through'>
              {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
            </p>
            <p className='text-xl text-gray-500 mb-2'>₹ {selectedProduct.price}</p>
           </div>
            <p className=' text-gray-600 mb-4'>{selectedProduct.description}</p>
            <div className="mb-4 ">
              <p className=' text-gray-700 mb-4'>Colors:</p>
              <div className="flex gap-2 mt-2">{selectedProduct.colors.map((color, index) => (
                <button key={index} className='w-8 h-8 rounded-full border' style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.5" }}></button>
              ))}</div>

            </div>
            <div className="mb-4">
              <p className='text-gray-700'>Size:</p>
              <div className="flex gap-2 mt-2">{selectedProduct.sizes.map((size) => (
                <button key={size} className='px-4 py-2 rounded border'>{size}</button>
              ))}</div>
            </div>
            <div className="mb-6">
              <p className='text-gray-700'>Quantity:</p>
              <div className='flex items-center space-x-4 mt-2'>
                <button className='px-2 py-1 bg-gray-200 rounded text-lg'>-</button>
                  <span className='text-lg'>1</span>
                <button className='px-2 py-1 bg-gray-200 rounded text-lg'>+</button>
              </div>
            </div>
            <button className='bg-black text-white py-2 px-6 rounded w-full mb-4'>Add to Cart</button>
            <div className="mt-10 text-gray-700">
              <h3 className='text-xl font-bold mb-4'>Charcateristics:</h3>
              <table className='w-full text-left text-sm text-gray-600'>
              <tbody>
                <tr>
                  <td className='py-1'>Brand</td>
                  <td className='py-1'>{selectedProduct.brand}</td>
                </tr>
                <tr>
                  <td className='py-1'>Material</td>
                  <td className='py-1'>{selectedProduct.material}</td>
                </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail