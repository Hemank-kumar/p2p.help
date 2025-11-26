import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  mobNumber: { type: Number, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  tDurationCourse: { type: String, required: true, trim: true },
  classDays: { type: String, required: true, trim: true },
  startTiming: { type: String, required: true, trim: true },
  venue: { type: String, required: true, trim: true },
  durationOfClass: { type: String, trim: true },
  noSeats: { type: String, trim: true },
  collegeBranch: { type: String, trim: true },
  teacherHighQualification: { type: String, trim: true },
  instAff: { type: String, trim: true },
  department: { type: String, trim: true },
  prerequisites: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export default mongoose.model("Courses", courseSchema);
