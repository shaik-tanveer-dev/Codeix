import React, { useEffect, useState } from "react";
import API from "../services/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses/")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold">{course.title}</h2>

            <p className="mt-2 text-gray-600">
              {course.description}
            </p>

            <p className="mt-2">
              <strong>Instructor:</strong> {course.instructor}
            </p>

            <p>
              <strong>Duration:</strong> {course.duration}
            </p>

            <p className="mt-2 text-xl font-bold text-green-600">
              ₹{course.price}
            </p>

            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;