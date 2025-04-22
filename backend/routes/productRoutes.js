const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const { isLoggedIn, admin } = require('../middleware/authMiddleWare');

const router = express.Router();

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

//get best-seller product based on highest rating

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });//sort in desc
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best-selling product found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//get new-arrivals product based on recent date

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);//sort in desc
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      res.status(404).json({ message: "No new-arrivals product found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});




// delete route 

router.delete("/:id", isLoggedIn, admin, async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne()
      res.json({ message: "Product Removed" });
    } else {
      return res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    console.error('Error Deleting product:', error);
    res.status(500).json({ message: 'Server Error.', error: error.message });
  }
});


// get all product with optional query 

router.get("/", async (req, res) => {
  try {
    const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query;
    let query = {};

    // Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort Logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch products and apply sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

// get single product by Id 
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//get similar product based on current gender and category
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    const similarProducts = await Product.find({
      _id: { $ne: id },//excluding the current product id
      gender: product.gender,
      category: product.category,
    }).limit(4);//only display 4 products
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});



module.exports = router;