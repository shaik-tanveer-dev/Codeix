import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";

const CourseLearning = () => {

  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {

    API.get(`/courses/lessons/${courseId}/`)
      .then((response) => {

        setLessons(response.data);

        if (response.data.length > 0) {
          setSelectedVideo(
            response.data[0].video_url
          );
        }

      })
      .catch((error) => {
        console.log(error);
      });

  }, [courseId]);


  const handleComplete = async (lessonId) => {

    try {

      await API.post(
        `/courses/complete-lesson/${lessonId}/`
      );

      alert("Lesson Completed!");

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Course Learning
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Video Section */}

        <div className="md:col-span-2">

          <div className="bg-white p-4 rounded-2xl shadow-lg">

            <iframe
              width="100%"
              height="500"
              src={selectedVideo}
              title="Course Video"
              allowFullScreen
              className="rounded-xl"
            ></iframe>

          </div>

        </div>

        {/* Lessons Sidebar */}

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Lessons
          </h2>

          <div className="space-y-4">

            {lessons.map((lesson) => (

              <div
                key={lesson.id}
                className="p-4 border rounded-xl hover:bg-blue-50"
              >

                <div
                  onClick={() =>
                    setSelectedVideo(lesson.video_url)
                  }
                  className="cursor-pointer"
                >

                  <h3 className="font-semibold">
                    {lesson.title}
                  </h3>

                </div>

                <button
                  onClick={() =>
                    handleComplete(lesson.id)
                  }
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Mark Complete
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default CourseLearning;