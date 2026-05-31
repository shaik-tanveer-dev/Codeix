import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchEnrollments = async () => {

      try {

        const token = localStorage.getItem("access");

        const response = await API.get(
          "my-enrollments/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        setEnrollments(response.data);

      } catch (err) {

        console.log(err);

        if (err.response?.status === 401) {
          setError("Unauthorized Access. Please login again.");
        } else {
          setError("Failed to load enrollments.");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Enrolled Courses
      </h1>

      {
        loading ? (

          <p>Loading...</p>

        ) : error ? (

          <p className="text-red-500 font-bold">
            {error}
          </p>

        ) : enrollments.length === 0 ? (

          <p>No enrolled courses found.</p>

        ) : (

          enrollments.map((item) => (

            <div
              key={item.id}
              className="bg-gray-200 p-5 rounded mb-4 shadow"
            >

              <h2 className="text-2xl font-bold">
                {item.course_title}
              </h2>

              <p className="mt-2">
                {item.course_description}
              </p>

              <p className="mt-2 font-bold text-green-600">
                ₹ {item.course_price}
              </p>
              <div className="mt-4">

              <p className="font-semibold mb-2">
                  Progress
                </p>

                <div className="w-full bg-gray-300 rounded-full h-4">

                 <div
                   className="bg-green-500 h-4 rounded-full"
                   style={{ width: `${item.progress}%` }}
                ></div>

            </div>

                    <p className="mt-2 text-sm">
                   {item.progress}% Completed
                </p>

              </div>

            </div>

          ))
        )
      }

    </div>

  );
}

export default Dashboard;