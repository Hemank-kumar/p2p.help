import express from "express";
import Courses from "../models/Courses.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();


// ➤ Create new course
router.post("/", async (req, res) => {
  console.log("Received course data:", req.body);

  try {
    const {
      name,
      email,
      mobNumber,
      courseName,
      tDurationCourse,
      classDays,
      startTiming,
      venue,
      durationOfClass,
      noSeats,
      teacherHighQualification,
      instAff,
      department,
      prerequisites,
      description,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !mobNumber ||
      !courseName ||
      !tDurationCourse ||
      !classDays ||
      !startTiming ||
      !venue ||
      !prerequisites
    ) {
      return res.status(400).json({ error: "Please fill all the required fields." });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const newCourse = new Courses({
      name,
      email,
      mobNumber,
      courseName,
      tDurationCourse,
      classDays,
      startTiming,
      venue,
      durationOfClass,
      noSeats,
      teacherHighQualification,
      instAff,
      department,
      prerequisites,
      description,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// ➤ Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Courses.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ➤ Get course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ➤ Update course info (Admin)
router.patch("/:id",authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    const course = await Courses.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course updated successfully", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ➤ Open/Close registration (Admin)
router.patch("/:id/status",authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const course = await Courses.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json({ message: "Course status updated", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ➤ Delete course (Admin)
router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    const course = await Courses.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
