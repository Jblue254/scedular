import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import RoleSelect from "./RoleSelect";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
    year: "",
    specialization: "",
    qualification: "",
    contact: "",
  });

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (role === "student") {
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      if (students.find((s) => s.email === formData.email)) {
        alert("Student already exists");
        return;
      }
      const newStudent = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        course: formData.course,
        year: formData.year,
        contact: formData.contact,
      };
      localStorage.setItem("students", JSON.stringify([...students, newStudent]));
      alert("Student signup successful!");
      navigate("/login");
    }

    if (role === "teacher") {
      const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
      if (teachers.find((t) => t.username === formData.username)) {
        alert("Teacher already exists");
        return;
      }
      const newTeacher = {
        name: formData.name,
        username: formData.username,
        password: formData.password,
        specialization: formData.specialization,
        qualification: formData.qualification,
        contact: formData.contact,
      };
      localStorage.setItem("teachers", JSON.stringify([...teachers, newTeacher]));
      alert("Teacher signup successful!");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <RoleSelect role={role} setRole={setRole} />

          <AuthInput
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          {role === "student" && (
            <>
              <AuthInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <AuthInput
                label="Course/Department"
                name="course"
                type="text"
                value={formData.course}
                onChange={handleChange}
              />
              <AuthInput
                label="Year of Study"
                name="year"
                type="text"
                value={formData.year}
                onChange={handleChange}
              />
            </>
          )}

          {role === "teacher" && (
            <>
              <AuthInput
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
              <AuthInput
                label="Subject Specialization"
                name="specialization"
                type="text"
                value={formData.specialization}
                onChange={handleChange}
              />
              <AuthInput
                label="Qualification"
                name="qualification"
                type="text"
                value={formData.qualification}
                onChange={handleChange}
              />
            </>
          )}

          <AuthInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <AuthInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <AuthInput
            label="Contact Number"
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
