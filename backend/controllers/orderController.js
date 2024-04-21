import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//Create new Order
// route POST api/orders
//Private access
const Createorders = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no Order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

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
  res.send("update Order to deliver");
});

//Get All Orders
// route POST api/orders
//Private access & Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all Orders");
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
