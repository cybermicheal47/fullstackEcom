import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

//Get all products
// route GET api/products
//Public access
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//Get a products
// route GET api/products/:id
//Public access
const getProductbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Create a product
// route POST api/products/
//Private access & Admin

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  // Check if all required fields are provided
  if (!name || !price || !countInStock || !description) {
    res.status(400);
    throw new Error("Please provide all product details");
  }

  const product = new Product({
    name,
    price,
    user: req.user._id, // Assuming you're using authentication and storing user ID in req.user._id
    image,
    brand,
    category,
    countInStock,
    numReviews: 0, // Initialize numReviews to 0
    description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//Edit a product
// route PUT api/product/:id
//Private access & Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  const product = await Product.find(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resources Not Found");
  }
});

export { getProducts, getProductbyId, createProduct, updateProduct };
