import React, { useState } from "react";
import Prism from "../components/Prism";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Card from "../components/ui/Card";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName || ""; // Course from clicked item

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    highestEducation: "",
    profession: "",
    institute: "",
    reason: "",
    skills: "",
    learningPreferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    const requiredFields = ['fullName', 'email', 'mobileNumber', 'reason'];
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4400/registration", {
        ...formData,
        courseName,
      });

      if (res.status === 201) {
        alert("Registration submitted successfully!");
        navigate("/"); // Redirect to homepage
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
      <div className="min-h-screen text-white px-4 py-20 flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="heading-2 mb-4 text-gradient">Course Registration</h1>
            <p className="text-xl text-white/70">
              Register for <span className="text-purple-400 font-semibold">{courseName}</span>
            </p>
          </div>

          <Card className="animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Course Information</h3>
                <Input
                  label="Course Name"
                  name="courseName"
                  value={courseName}
                  onChange={() => {}}
                  readOnly
                  className="opacity-60"
                />
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
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
                    name="mobileNumber"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    error={errors.mobileNumber}
                    required
                  />
                  <Input
                    label="Highest Education"
                    name="highestEducation"
                    placeholder="B.Tech, M.Sc, PhD"
                    value={formData.highestEducation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Profession"
                    name="profession"
                    placeholder="Software Engineer, Designer"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                  <Input
                    label="Institute Affiliation"
                    name="institute"
                    placeholder="College, Workplace, etc."
                    value={formData.institute}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Learning Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Learning Information</h3>
                <Textarea
                  label="Reason for Joining"
                  name="reason"
                  placeholder="Why do you want to join this course? What do you hope to learn?"
                  value={formData.reason}
                  onChange={handleChange}
                  error={errors.reason}
                  rows={3}
                  required
                />
                <Textarea
                  label="Additional Skills"
                  name="skills"
                  placeholder="Highlight any relevant skills or experience you have"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                />
                <Textarea
                  label="Learning Preferences"
                  name="learningPreferences"
                  placeholder="How do you prefer to learn? (Hands-on, live sessions, self-paced, etc.)"
                  value={formData.learningPreferences}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
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
                  {loading ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
