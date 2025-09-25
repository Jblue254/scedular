import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Chemistry 101",
      description: "Intro to basic chemistry",
      schedule: "2025-10-27T10:00",
      attendees: [{ name: "John", email: "john@example.com" }],
      feedback: [
        { attendee: { name: "John" }, rating: 5, comments: "Great class!" },
      ],
    },
    {
      id: 2,
      title: "Physics 202",
      description: "Advanced mechanics",
      schedule: "2025-10-28T14:00",
      attendees: [],
      feedback: [],
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const handleAddClass = (title, description, schedule) => {
    const newClass = {
      id: classes.length + 1,
      title,
      description,
      schedule,
      attendees: [],
      feedback: [],
    };
    setClasses([...classes, newClass]);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/student-dashboard"
        element={
          user?.role === "student" ? (
            <StudentDashboard
              classes={classes}
              user={user}
              onEnroll={(classId, name, email) => {
                setClasses((prev) =>
                  prev.map((cls) =>
                    cls.id === classId
                      ? {
                          ...cls,
                          attendees: [...cls.attendees, { name, email }],
                        }
                      : cls
                  )
                );
              }}
              onAddFeedback={(classId, email, rating, comments) => {
                setClasses((prev) =>
                  prev.map((cls) =>
                    cls.id === classId
                      ? {
                          ...cls,
                          feedback: [
                            ...cls.feedback,
                            { attendee: { name: user.name }, rating, comments },
                          ],
                        }
                      : cls
                  )
                );
              }}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/teacher-dashboard"
        element={
          user?.role === "teacher" ? (
            <TeacherDashboard
              classes={classes}
              onAddClass={handleAddClass}
              user={user}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
