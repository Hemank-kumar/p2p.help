import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, trim: true },
  highestEducation: { type: String, trim: true },
  profession: { type: String, trim: true },
  institute: { type: String, trim: true },
  courseName: { type: String, required: true, trim: true },
  reasonForJoining: { type: String, trim: true },
  additionalSkills: { type: String, trim: true },
  learningPreferences: { type: String, trim: true },
  registeredAt: { type: Date, default: Date.now },
  registrationDeadline: { type: Date },
});

registrationSchema.index({ email: 1, courseName: 1 }, { unique: true }); 
// prevents same student registering twice for same course

export default mongoose.model("Registration", registrationSchema);
