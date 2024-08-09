import User from "../models/userModel.js";
import asyncHandeler from "express-async-handler";
import { generateToken } from "../utils/generateJWTToken.js";

export const registerUser = asyncHandeler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExixt = await User.findOne({ email });
  if (userExixt) {
    res.status(400).json("user Already Exist");
    return new Error("User Already Exist");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json("Invalid User Data");
    throw new Error("Invalid User Data");
  }
});

export const loginUser = asyncHandeler(async (req, res) => {
  // login logic here
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

export const updateInfo = asyncHandeler(async (req, res) => {
  try {
    const userExixt = await User.findById(req.user._id);
    const { name, email, password } = req.body;

    if (userExixt) {
      userExixt.name = name;
      userExixt.email = email;
      userExixt.password = password;

      const updateData = await userExixt.save();
      const data = updateData.toObject();
      const token = generateToken(data._id);

      delete data.password;
      data.token = token;
      
      return res.status(200).json(data);
    } else {
      res.status(400).json("Data did not updated");
      return new Error("Data did not updated");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Data did not updated");
  }
});
