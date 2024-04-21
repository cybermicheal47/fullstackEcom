import express, { Router } from "express";
const router = express.Router();

import {
  Createorders,
  getMyOrders,
  UpdateOrderToPaid,
  UpdateOrderTodelivered,
  getOrders,
  getOrderById,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, Createorders).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, UpdateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, UpdateOrderTodelivered);

export default router;
