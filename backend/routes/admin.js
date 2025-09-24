import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import 'dotenv/config'

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || 'fallback-secret-key-for-development';

// Register Admin
router.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);
const admin = new Admin({ name, password: hashedPassword });
await admin.save();


    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Admin
router.post("/login", async (req, res) => {
  console.log("Login request body:", req.body);  
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ name: username });
    console.log("Admin found:", !!admin);
    if (!admin) {
      console.log("Admin not found for username:", username);
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    console.log("Comparing password...");
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    console.log("Creating JWT token...");
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Token created successfully");

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
