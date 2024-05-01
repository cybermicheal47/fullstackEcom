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

  const product = await Product.findById(req.params.id);
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

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne(); // Or use findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductbyId,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
};
