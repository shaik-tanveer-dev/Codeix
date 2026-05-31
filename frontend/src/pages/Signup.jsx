function Signup() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        <form className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg text-white font-semibold"
          >
            Sign Up
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;