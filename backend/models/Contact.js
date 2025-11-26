//models/Contact.js

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name:{type: String, required:true, trim: true, lowercase:true},
  email:{type: String, required:true, trim: true, lowercase:true},
  subject:{type: String, trim: true},
  message:{type: String, required:true, trim: true },
},{
  timestamps: true // Adds createdAt and updatedAt time
});

export default mongoose.model("Contact", contactSchema);