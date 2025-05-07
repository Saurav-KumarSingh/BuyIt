const express = require('express');
const Product = require('../models/Product');
const {isLoggedIn,admin} = require('../middleware/authMiddleWare');
const router = express.Router();

// @route POST /api/admin/products
// @desc Create new Product
// @access Private/Admin
router.post("/", isLoggedIn, admin, async (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    sku,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    rating,
    numReviews,
    tags,
    user,
    metaTitle,
    metaDescription,
    metaKeywords,
    dimensions,
    weight,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      rating,
      numReviews,
      tags,
      user,
      metaTitle,
      metaDescription,
      metaKeywords,
      dimensions,
      weight,
      user: req.user._id,
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }


});

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin

router.get("/",isLoggedIn,admin, async (req, res) => {
    try {
        const products =await Product.find({});
        res.status(201).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});

//update existed product by the user (admin)

router.put("/:id", isLoggedIn, admin, async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        discountPrice,
        countInStock,
        sku,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        rating,
        numReviews,
        tags,
        user,
        metaTitle,
        metaDescription,
        metaKeywords,
        dimensions,
        weight,
      } = req.body;
  
      // Find the product by ID
      const product = await Product.findById(req.params.id);
  
      if (product) {
        // Update the product fields if they are provided in the request body
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.countInStock = countInStock || product.countInStock;
  
        // Check if the new SKU is provided and if it's different from the existing one
        if (sku && sku !== product.sku) {
          // Check if a product with the new SKU already exists
          const existingProductWithSku = await Product.findOne({ sku });
          if (existingProductWithSku && existingProductWithSku._id.toString() !== product._id.toString()) {
            return res.status(409).json({ message: 'Product with this SKU already exists.' });
          }
          product.sku = sku;
        }
  
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.collections = collections || product.collections;
        product.material = material || product.material;
        product.gender = gender || product.gender;
        product.images = images || product.images;
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
        product.rating = rating !== undefined ? rating : product.rating;
        product.numReviews = numReviews !== undefined ? numReviews : product.numReviews;
        product.tags = tags || product.tags;
  
        product.metaTitle = metaTitle || product.metaTitle;
        product.metaDescription = metaDescription || product.metaDescription;
        product.metaKeywords = metaKeywords || product.metaKeywords;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;
  
        // Save the updated product
        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        return res.status(404).json({ message: 'Product not found.' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product.', error: error.message });
    }
  });

  
module.exports=router;
