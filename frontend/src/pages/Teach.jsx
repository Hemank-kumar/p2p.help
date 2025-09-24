import React, { useState } from "react";
import Prism from "../components/Prism";
import TextType from "../components/TextType";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Card from "../components/ui/Card";
import axios from "axios";

export default function Teach() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobNumber: "",
    courseName: "",
    tDurationCourse: "",
    classDays: "",
    startTiming: "",
    venue: "",
    durationOfClass: "",
    noSeats: "",
    teacherHighQualification: "",
    instAff: "",
    department: "",
    prerequisites: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'mobNumber', 'courseName', 'tDurationCourse', 'classDays', 'startTiming', 'venue', 'prerequisites'];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4400/courses", formData);
      if (res.status === 201) {
        alert("Course registration submitted successfully!");
        setFormData({
          name: "",
          email: "",
          mobNumber: "",
          courseName: "",
          tDurationCourse: "",
          classDays: "",
          startTiming: "",
          venue: "",
          durationOfClass: "",
          noSeats: "",
          teacherHighQualification: "",
          instAff: "",
          department: "",
          prerequisites: "",
          description: "",
        });
      } else {
        alert(res.data.error || "Submission failed");
      }
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.error || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Prism Background */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
        className="bg-black"
      >
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.5}
          glow={1}
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10 min-h-screen text-white px-4 py-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-2 mb-4 text-gradient animate-fade-in-up">
              <TextType
                text={[
                  "Share Your Knowledge",
                  "Teach Others & Learn Together",
                  "Create Your Course",
                  "Start Teaching Today!",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Create and share your expertise with the community. Help others learn while building your teaching portfolio.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="heading-3 mb-8 text-center">Course Registration Form</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Mobile Number"
                    name="mobNumber"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={formData.mobNumber}
                    onChange={handleChange}
                    error={errors.mobNumber}
                    required
                  />
                  <Input
                    label="Teacher Qualification"
                    name="teacherHighQualification"
                    placeholder="M.Tech, PhD, etc."
                    value={formData.teacherHighQualification}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Course Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Course Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Course Name"
                    name="courseName"
                    placeholder="React Fundamentals"
                    value={formData.courseName}
                    onChange={handleChange}
                    error={errors.courseName}
                    required
                  />
                  <Input
                    label="Course Duration"
                    name="tDurationCourse"
                    placeholder="6 weeks, 3 months"
                    value={formData.tDurationCourse}
                    onChange={handleChange}
                    error={errors.tDurationCourse}
                    required
                  />
                  <Input
                    label="Class Days"
                    name="classDays"
                    placeholder="Mon, Wed, Fri"
                    value={formData.classDays}
                    onChange={handleChange}
                    error={errors.classDays}
                    required
                  />
                  <Input
                    label="Start Time"
                    name="startTiming"
                    type="time"
                    value={formData.startTiming}
                    onChange={handleChange}
                    error={errors.startTiming}
                    required
                  />
                  <Input
                    label="Venue"
                    name="venue"
                    placeholder="Room 204, Online, etc."
                    value={formData.venue}
                    onChange={handleChange}
                    error={errors.venue}
                    required
                  />
                  <Input
                    label="Class Duration"
                    name="durationOfClass"
                    placeholder="2 hours per session"
                    value={formData.durationOfClass}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Number of Seats"
                    name="noSeats"
                    type="number"
                    placeholder="30"
                    value={formData.noSeats}
                    onChange={handleChange}
                  />
                  <Input
                    label="Institute Affiliation"
                    name="instAff"
                    placeholder="University, Company, etc."
                    value={formData.instAff}
                    onChange={handleChange}
                  />
                  <Input
                    label="Department"
                    name="department"
                    placeholder="Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                  />
                  <Input
                    label="Prerequisites"
                    name="prerequisites"
                    placeholder="Basic JavaScript knowledge"
                    value={formData.prerequisites}
                    onChange={handleChange}
                    error={errors.prerequisites}
                    required
                  />
                </div>
                <Textarea
                  label="Course Description"
                  name="description"
                  placeholder="Provide a detailed overview of your course, what students will learn, and why they should take it..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="w-full sm:w-auto sm:ml-auto"
                >
                  {loading ? "Creating Course..." : "Create Course"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
