import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // HANDLE LOGIN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/token/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        // =========================
        // SAVE JWT TOKENS
        // =========================

        localStorage.setItem(
          "access",
          data.access
        );

        localStorage.setItem(
          "refresh",
          data.refresh
        );

        alert("Login Successful 🚀");

        navigate("/dashboard");

      } else {

        alert("Invalid Credentials");

      }

    } catch (error) {

      console.error(error);

      alert("Something Went Wrong");

    }
  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md shadow-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome Back
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* USERNAME */}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none"
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg text-white font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;