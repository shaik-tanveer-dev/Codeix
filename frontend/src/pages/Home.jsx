
function Home() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Learn Smarter with{" "}
          <span className="text-blue-500">
            Codeix
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-3xl">
          Master programming, AI, data science, and full stack development
          with industry-level courses and real-world projects.
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">

          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl text-lg font-semibold transition">
            Explore Courses
          </button>

          <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-xl text-lg font-semibold transition">
            Get Started
          </button>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="grid md:grid-cols-3 gap-8 px-8 pb-24">

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Industry Courses
          </h2>

          <p className="text-gray-300">
            Learn from real-world projects designed for placements,
            internships, and top tech companies.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            AI Powered Learning
          </h2>

          <p className="text-gray-300">
            Personalized recommendations, AI quizzes, and interview preparation
            tools.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            Career Growth
          </h2>

          <p className="text-gray-300">
            Build projects, improve skills, and prepare for high-paying tech
            jobs.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;