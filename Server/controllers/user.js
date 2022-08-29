import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => { 
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const existingUser = await User.findOne({ email });
  console.log("existingUser",existingUser)

     if (!existingUser)
      return res.status(500).json({ message: "User dose not exits" }); 

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(403).json({ message: "Password does not match" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret"
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log("error")
    res.status(500).json({ message: error });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(email)
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(500).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password dosen't match" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async (req, res) =>{

  try {
    const users = await User.find();        
    res.status(200).json(users);
} catch (error) {
    res.status(404).json({ message: error.message });
}
}
