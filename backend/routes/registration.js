import express from "express";
import Registration from "../models/Registration.js";
import Courses from "../models/Courses.js";
const router = express.Router();

// POST registration
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      highestEducation,
      profession,
      institute,
      courseName,
      reasonForJoining,
      additionalSkills,
      learningPreferences,
    } = req.body;

    if (!fullName || !email || !mobileNumber || !courseName) {
      return res.status(400).json({ error: "Fill all required fields" });
    }

    const course = await Courses.findOne({ courseName: courseName });
    if (!course) return res.status(404).json({ error: "Course not found" });

    const newRegistration = new Registration({
      fullName,
      email,
      mobileNumber,
      highestEducation,
      profession,
      institute,
      courseName,
      reasonForJoining,
      additionalSkills,
      learningPreferences,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
