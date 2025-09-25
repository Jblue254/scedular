import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem("students") || "[]");

    const found = students.find((s) => s.email === email);

    if (found) {
      const currentUser = { role: "student", name: found.name, email };
      onLogin(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/student-dashboard"); // ✅ corrected route
    } else {
      alert("Student not found. Please sign up.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem("students") || "[]");

    if (students.find((s) => s.email === email)) {
      alert("Student already exists");
      return;
    }

    const newStudent = { name, email };
    localStorage.setItem("students", JSON.stringify([...students, newStudent]));
    alert("Signup successful. You can now log in.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="p-6 border rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold">Student Login / Signup</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
