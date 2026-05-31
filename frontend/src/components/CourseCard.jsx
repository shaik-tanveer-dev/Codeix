const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800">
          {course.title}
        </h2>

        <p className="text-gray-600 mt-2 text-sm">
          {course.description}
        </p>

        <div className="mt-4 space-y-1">
          <p className="text-sm font-medium">
            Instructor: {course.instructor}
          </p>

          <p className="text-sm font-medium">
            Duration: {course.duration}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5">
          <span className="text-2xl font-bold text-blue-600">
            ₹{course.price}
          </span>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Enroll
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard