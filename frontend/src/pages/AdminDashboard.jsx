import React, { useState, useEffect } from "react";
import API from "../services/api";

const AdminDashboard = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    price: "",
  });

  const [courses, setCourses] = useState([]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const fetchCourses = async () => {

    try {

      const response = await API.get(
        "/courses/"
      );

      setCourses(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchCourses();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/courses/create/",
        formData
      );

      alert("Course Added Successfully!");

      setFormData({
        title: "",
        description: "",
        instructor: "",
        duration: "",
        price: "",
      });

      fetchCourses();

    } catch (error) {

      console.log(error);

      alert("Failed to Add Course");

    }
  };

  const handleDelete = async (courseId) => {

    try {

      await API.delete(
        `/courses/delete/${courseId}/`
      );

      alert("Course Deleted Successfully!");

      fetchCourses();

    } catch (error) {

      console.log(error);

      alert("Failed to Delete Course");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}

      <div className="w-64 bg-black text-white p-6">

        <h1 className="text-3xl font-bold text-blue-500 mb-10">
          Admin Panel
        </h1>

        <ul className="space-y-6 text-lg">

          <li className="hover:text-blue-400 cursor-pointer">
            Dashboard
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Add Course
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Manage Courses
          </li>

          <li className="hover:text-blue-400 cursor-pointer">
            Lessons
          </li>

        </ul>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-3">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Manage courses and platform content
        </p>

        {/* Add Course Form */}

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Add New Course
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              className="p-4 border rounded-xl"
              required
            />

            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="p-4 border rounded-xl"
              required
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="p-4 border rounded-xl"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="p-4 border rounded-xl"
              required
            />

            <textarea
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleChange}
              className="p-4 border rounded-xl md:col-span-2"
              rows="4"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl md:col-span-2"
            >
              Add Course
            </button>

          </form>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-semibold text-gray-600">
              Total Courses
            </h2>

            <p className="text-4xl font-bold mt-4">
              {courses.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-semibold text-gray-600">
              Total Students
            </h2>

            <p className="text-4xl font-bold mt-4">
              10
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-xl font-semibold text-gray-600">
              Total Lessons
            </h2>

            <p className="text-4xl font-bold mt-4">
              5
            </p>

          </div>

        </div>

        {/* Manage Courses */}

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">
            Manage Courses
          </h2>

          <div className="space-y-4">

            {courses.map((course) => (

              <div
                key={course.id}
                className="flex items-center justify-between border p-5 rounded-xl"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {course.title}
                  </h3>

                  <p className="text-gray-600">
                    {course.instructor}
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleDelete(course.id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;