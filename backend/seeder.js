import { Mongoose } from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import Usermodel from "./models/userModel.js";
import Productmodel from "./models/productModel.js";
import Ordermodel from "./models/orderModel.js";

import connectDB from "./config/db.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Ordermodel.deleteMany();
    await Productmodel.deleteMany();
    await Usermodel.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Productmodel.insertMany(sampleProducts);
    console.log(`data imported`);
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Ordermodel.deleteMany();
    await Productmodel.deleteMany();
    await Usermodel.deleteMany();

    console.error("data destroyed");
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
