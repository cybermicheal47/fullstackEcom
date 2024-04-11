import userModel from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
//Auth user && get token
// route POST api/users/login
//Public access
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //set Jwt as Http Cookie Only
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 daays
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

//Register User
// route POST api/users
//Public access
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//Logout out and Clear Cookie
// route POST api/users/logout
//Private access
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: "Logged out Sucessfully" });
});

//Get Users Profile
// route GET api/users/profile
//Private access
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(" user Profile");
});

//Updating Users Profile
// route PUT api/users/profile
//Private access
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user Profile");
});

// Get All Users Profile
// route GET api/users
//Private access/ Admin access Only
const getUsersProfile = asyncHandler(async (req, res) => {
  res.send(" users Profile");
});

// Get Users  by id
// route GET api/users/:id
//Private access/ Admin access Only
const getUserById = asyncHandler(async (req, res) => {
  res.send(" users Id");
});

// Update User by Id
// route Delete api/users/:id
//Private access/ Admin access Only
const updateUser = asyncHandler(async (req, res) => {
  res.send(" Update user  by ID ");
});

// Delete Users Profile
// route Delete api/users/:id
//Private access/ Admin access Only
const deleteUser = asyncHandler(async (req, res) => {
  res.send(" Delete users Profile");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser,
  updateUser,
  getUsersProfile,
};
