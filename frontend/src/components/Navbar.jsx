import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-5 flex justify-between items-center border-b border-gray-800">

      <h1 className="text-3xl font-bold text-blue-500">
        Codeix
      </h1>

      <div className="flex gap-6 text-lg items-center">

        <Link className="hover:text-blue-400 transition" to="/">
          Home
        </Link>

        <Link className="hover:text-blue-400 transition" to="/courses">
          Courses
        </Link>

        <Link className="hover:text-blue-400 transition" to="/about">
          About
        </Link>

        <Link className="hover:text-blue-400 transition" to="/contact">
          Contact
        </Link>

        {!token ? (
          <>
            <Link
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="border border-blue-500 px-5 py-2 rounded-lg hover:bg-blue-500 transition"
              to="/signup"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg transition"
              to="/dashboard"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;