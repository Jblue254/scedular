
import React, { useState } from "react";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

export default function App() {
  const [classes, setClasses] = useState([]);
  const [role, setRole] = useState("teacher");

  const addClass = (title, description, schedule) => {
    const newClass = {
      id: Date.now(),
      title,
      description,
      schedule,
      attendees: [],
      feedback: [],
    };
    setClasses([...classes, newClass]);
  };

  const enrollStudent = (classId, name, email) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId
          ? { ...cls, attendees: [...cls.attendees, { name, email }] }
          : cls
      )
    );
  };

  const addFeedback = (classId, email, rating, comments) => {
    setClasses((prev) =>
      prev.map((cls) => {
        if (cls.id !== classId) return cls;
        const attendee = cls.attendees.find((a) => a.email === email);
        if (!attendee) return cls;
        return {
          ...cls,
          feedback: [...cls.feedback, { attendee, rating, comments }],
        };
      })
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Scheduler</h1>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="teacher">Teacher View</option>
          <option value="student">Student View</option>
        </select>
      </div>

      {role === "teacher" ? (
        <TeacherDashboard classes={classes} onAddClass={addClass} />
      ) : (
        <StudentDashboard
          classes={classes}
          onEnroll={enrollStudent}
          onAddFeedback={addFeedback}
        />
      )}
    </div>
  );
}
