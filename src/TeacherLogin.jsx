import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");

    const found = teachers.find(
      (t) => t.username === username && t.password === password
    );

    if (found) {
      const currentUser = { role: "teacher", name: found.username };
      onLogin(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/teacher-dashboard"); // ✅ corrected route
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");

    if (teachers.find((t) => t.username === username)) {
      alert("Teacher already exists");
      return;
    }

    const newTeacher = { username, password };
    localStorage.setItem("teachers", JSON.stringify([...teachers, newTeacher]));
    alert("Signup successful. You can now log in.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="p-6 border rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold">Teacher Login / Signup</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
