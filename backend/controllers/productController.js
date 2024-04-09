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

export { getProducts, getProductbyId };
