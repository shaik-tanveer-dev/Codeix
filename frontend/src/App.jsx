import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CourseLearning from "./pages/CourseLearning";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyLearning from "./pages/MyLearning";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        
        <Navbar />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning/:courseId" element={<CourseLearning />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/course/:id"element={<CourseDetails />}/>
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;