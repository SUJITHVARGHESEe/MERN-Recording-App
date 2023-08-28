import express from "express";
import User from "../Model.js/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const UserRouter = express.Router();
UserRouter.use(express.json());
dotenv.config();

UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body, "dedjsdsdoao");
    if (name && email && password) {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).json({ error: "Email already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        res
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //1day
          })
          .json({
            token,
            user: { _id: newUser._id, name: name, email: email },
          });
      }
    } else {
      res.status(500).json({ error: "internal error " });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userEmailExist = await User.findOne({ email });
      if (!userEmailExist) {
        res.status(400).json({ error: "email doest have account" });
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          userEmailExist.password
        );
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Password" });
        }
        const token = jwt.sign(
          { _id: userEmailExist._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );

        res
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          })
          .json({
            token,
            user: { name: userEmailExist.name, email: userEmailExist.email },
          });
      }
    } else {
      res.status(500).json({ error: "internal error " });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
UserRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logged out succeessfully" });
  } catch (error) {
    res.status(400).json({ message: "Logout not working" });
  }
});
export default UserRouter;
