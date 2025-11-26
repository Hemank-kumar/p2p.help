import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST message to the public route

router.post("/",async (req,res) => {
  try{
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
      return res.status(404).send({error: "Please fill name, email and message"});
    }
  

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address"});
    }

    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    await newContact.save();

    res.status(201).json({
      message: "Thank You for contacting us. We'll get back to you soon.",
      success: true,
    });
  } catch (err){
    console.error("Contact Submission Report.",err);
    res.status(500).json({
      error: "Sorry, There was an errorsending your message. Please try again."
    });
  }
});

export default router;