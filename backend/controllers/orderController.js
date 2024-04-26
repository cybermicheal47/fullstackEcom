import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// Create new Order
// Route: POST api/orders
// Access: Private

const Createorders = asyncHandler(async (req, res) => {
  // Destructure the required fields from the request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if orderItems exist and is not empty
  if (orderItems && orderItems.length === 0) {
    // If orderItems are empty, send an error response
    res.status(400);
    throw new Error("No Order Items");
  } else {
    // If orderItems exist, create a new order

    // Create a new Order instance
    const order = new Order({
      // Map through each order item and transform it to match the Order model
      orderItems: orderItems.map((x) => ({
        ...x, // Spread the properties of each order item
        product: x._id, // Assign the _id of the product to product field
        _id: undefined, // Exclude _id field (let MongoDB generate it)
      })),
      // Get user ID from the request (assumed to be stored in req.user._id)
      user: req.user._id,
      // Assign shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, and totalPrice
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save the new order to the database
    const createdOrder = await order.save();

    // Send a success response with the created order
    res.status(201).json(createdOrder);
  }
});

//Get LOged in User Orders
// route POST api/orders/myorders
//Private access
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//Update Order to paid
// route PUT api/orders/:id/pay
//Private access
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.payer.email_address,
    };

    const updatedorder = await order.save();
    res.status(200).json(updatedorder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//Update Order to delivered
// route PUT api/orders/deliver
//Private access / Admin
const UpdateOrderTodelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = !order.isDelivered;
    if (order.isDelivered) {
      order.deliveredAt = Date.now();
    } else {
      order.deliveredAt = null; // Reset deliveredAt if not delivered
    }

    const updateorder = await order.save();
    res.status(200).json(updateorder);
  } else {
    res.status(400);
    throw new Error("Order Not Found");
  }
});

//Get All Orders
// route POST api/orders
//Private access & Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

//Get Orders By Id
// route POST api/orders/:id
//Private access / Admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order Not Found ");
  }
});

export {
  Createorders,
  getMyOrders,
  UpdateOrderToPaid,
  UpdateOrderTodelivered,
  getOrders,
  getOrderById,
};
