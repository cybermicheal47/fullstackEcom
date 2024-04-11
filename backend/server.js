import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
connectDB();

//body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.get("/", (req, res) => {
  res.send("Api is Runing");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

console.log("hello");
app.listen(port, () => console.log(`Server is runing  on port ${port}`));
