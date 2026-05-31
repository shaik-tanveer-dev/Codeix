import React, { useEffect, useState } from "react";
import API from "../api";

function MyLearning() {

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {

    fetchEnrollments();

  }, []);

  const fetchEnrollments = async () => {

    try {

      const response = await API.get(
        "my-enrollments/"
      );

      console.log(response.data);

      setEnrollments(response.data);

    } catch (error) {

      console.log(error.response);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Learning 📚
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {enrollments.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-md"
          >

            <h2 className="text-2xl font-semibold">
              {item.course_title}
            </h2>

            <p className="text-gray-600 mt-2">
              {item.course_description}
            </p>

            <p className="mt-4 font-bold text-blue-600">
              ₹ {item.course_price}
            </p>

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Continue Learning
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyLearning;