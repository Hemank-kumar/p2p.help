// src/pages/AdminCourses.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Prism from "../components/Prism";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:4400/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch courses. Make sure you are logged in as admin.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete a course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`http://localhost:4400/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Course deleted successfully!");
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete course.");
    }
  };

  // Toggle course registration status
  const handleToggleStatus = async (course) => {
    const newStatus = course.status === "active" ? "inactive" : "active";

    try {
      const res = await fetch(`http://localhost:4400/courses/${course._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to update course status.");
    }
  };

  return (
    <>
      {/* Prism background */}
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

      {/* Foreground content */}
      <div className="relative z-10 min-h-screen text-white px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-2 mb-4 text-gradient">Course Management</h1>
            <p className="text-xl text-white/70">Manage and monitor all courses on the platform</p>
          </div>

          <Card className="animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Course Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Instructor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Schedule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Actions</th>
                  </tr>
                </thead>
                <tbody>   
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12">
                        <div className="text-white/60">
                          <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <p className="text-lg">No courses found</p>
                          <p className="text-sm">Courses will appear here once they are created</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => (
                      <tr key={course._id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-white">{course.courseName}</p>
                            <p className="text-sm text-white/60">{course.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/80">{course.name}</td>
                        <td className="px-6 py-4 text-white/80">{course.tDurationCourse}</td>
                        <td className="px-6 py-4 text-white/80">
                          <div>
                            <p className="text-sm">{course.classDays}</p>
                            <p className="text-xs text-white/60">{course.startTiming}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.status === 'active' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(course)}
                              className="text-xs"
                            >
                              {course.status === "active" ? "Close" : "Open"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(course._id)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="text-center mt-8">
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
