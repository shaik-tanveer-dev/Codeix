import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function CourseDetails() {

  const { id } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {

    API.get(`course/${id}/`)
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  if (!course) {
    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }
  const handleEnroll = async () => {

  try {

    const token = localStorage.getItem("access");

    const response = await API.post(
      `enroll/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    alert("Enrollment Successful 🚀");

  } catch (error) {

    console.log(error);

    alert("Enrollment Failed");

  }
};

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold">
        {course.title}
      </h1>

      <p className="mt-5 text-lg">
        {course.description}
      </p>

      <p className="mt-5 text-2xl font-bold text-green-600">
        ₹ {course.price}
      </p>
      <button
        onClick={handleEnroll}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
        Enroll Now
        </button>

    </div>

  );
}

export default CourseDetails;