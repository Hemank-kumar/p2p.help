import React, { useState, useEffect } from "react";
import TextType from "../components/TextType";
import Prism from "../components/Prism";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

export default function Learn() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseType, setCourseType] = useState("");
  const [facultyType, setFacultyType] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:4400/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesName = course.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = courseType ? course.type === courseType : true;
    const matchesFaculty = facultyType ? course.faculty === facultyType : true;
    return matchesName && matchesType && matchesFaculty;
  });

  if (loading) {
    return <p className="text-white text-center mt-20">Loading courses...</p>;
  }

  return (
    <>
      {/* Background animation */}
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

      <div className="text-center text-white relative z-10">
        {/* Heading */}
        <div className="heading-2 mb-8 animate-fade-in-up py-10 pt-20 px-4">
          <TextType
            text={[
              "Welcome,",
              "To Make New Connection",
              "and Learn from New Perspective.",
              "Enjoy Your Journey!",
            ]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>

        {/* Search + Filters */}
        <div className="text-white px-4 py-10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
            <div className="w-full sm:w-auto sm:flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full form-input text-center sm:text-left"
                placeholder="Search Courses"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="form-input text-sm min-w-[140px]"
              >
                <option value="">All Types</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>

              <select
                value={facultyType}
                onChange={(e) => setFacultyType(e.target.value)}
                className="form-input text-sm min-w-[140px]"
              >
                <option value="">All Faculty</option>
                <option value="Technical">Technical</option>
                <option value="Creative">Creative</option>
                <option value="Non-Technical">Non-Technical</option>
              </select>
            </div>
          </div>

          {/* Filtered Results */}
          <div className="grid gap-4 md:gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <Card key={course._id || index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Basic Info */}
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-semibold mb-2">{course.courseName || course.name}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                          {course.tDurationCourse || 'Duration: N/A'}
                        </span>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                          {course.classDays || 'Schedule: N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-white/70">
                        Instructor: {course.name}
                      </p>
                      <p className="text-sm text-white/70">
                        Email: {course.email}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          navigate("/learn/register", {
                            state: { courseName: course.courseName || course.name },
                          })
                        }
                        className="w-full sm:w-auto lg:w-full"
                      >
                        Register
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toggleExpand(index)}
                        className="w-full sm:w-auto lg:w-full"
                      >
                        {expandedIndex === index ? "Less Info" : "More Info"}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Info */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      expandedIndex === index
                        ? "max-h-[1000px] opacity-100 mt-6"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="text-left text-white/70 text-sm space-y-4">
                      <div className="border-t border-white/20 pt-4 space-y-2">
                        <h5 className="text-base font-semibold text-white">
                          Course Details
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <p><strong>Description:</strong> {course.description || 'N/A'}</p>
                          <p><strong>Duration:</strong> {course.tDurationCourse || 'N/A'}</p>
                          <p><strong>Class Days:</strong> {course.classDays || 'N/A'}</p>
                          <p><strong>Start Time:</strong> {course.startTiming || 'N/A'}</p>
                          <p><strong>Venue:</strong> {course.venue || 'N/A'}</p>
                          <p><strong>Prerequisites:</strong> {course.prerequisites || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="border-t border-white/20 pt-4 space-y-2">
                        <h5 className="text-base font-semibold text-white">
                          Instructor Details
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <p><strong>Name:</strong> {course.name}</p>
                          <p><strong>Email:</strong> {course.email}</p>
                          <p><strong>Qualification:</strong> {course.teacherHighQualification || 'N/A'}</p>
                          <p><strong>Institute:</strong> {course.instAff || 'N/A'}</p>
                          <p><strong>Department:</strong> {course.department || 'N/A'}</p>
                          <p><strong>Mobile:</strong> {course.mobNumber || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <div className="text-white/60">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.57M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-lg mb-2">No courses found</p>
                  <p className="text-sm">Try adjusting your search filters or check back later for new courses.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
