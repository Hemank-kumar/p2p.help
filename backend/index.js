// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import adminRoutes from "./routes/admin.js";
import coursesRoutes from "./routes/courses.js";
import contactRoutes from "./routes/contact.js";
import registrationRoutes from "./routes/registration.js";

// Middleware
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/admin", adminRoutes);
app.use("/courses", coursesRoutes);
app.use("/contact", contactRoutes);
app.use("/registration", registrationRoutes);


// Health check route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
