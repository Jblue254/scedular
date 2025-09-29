import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import RoleSelect from "./RoleSelect";

export default function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");   // <-- FIX
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role");
      return;
    }

    if (role === "student") {
      const students = JSON.parse(localStorage.getItem("students") || "[]");
      const found = students.find((s) => s.email === identifier);

      if (found) {
        const currentUser = { role: "student", name: found.name, email: found.email };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        if (onLogin) onLogin(currentUser);
        navigate("/student-dashboard");
      } else {
        alert("Student not found. Please sign up.");
      }
    }

    if (role === "teacher") {
      const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
      const found = teachers.find(
        (t) => t.username === identifier && t.password === password
      );

      if (found) {
        const currentUser = { role: "teacher", name: found.username };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        if (onLogin) onLogin(currentUser);
        navigate("/teacher-dashboard");
      } else {
        alert("Invalid teacher credentials.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <AuthInput
            label={role === "teacher" ? "Username" : "Email"}
            type={role === "teacher" ? "text" : "email"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RoleSelect role={role} setRole={setRole} />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
