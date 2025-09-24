// file: src/StudentDashboard.jsx
import React, { useState } from "react";

export default function StudentDashboard({ classes, onEnroll, onAddFeedback }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Available Classes</h2>
      {classes.length === 0 && <p>No classes available.</p>}
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="p-3 border rounded">
            <h3 className="font-bold">{cls.title}</h3>
            <p>{cls.description}</p>
            <p className="text-sm text-gray-600">📅 {cls.schedule}</p>

            {/* Enroll form */}
            <form
              className="mt-2 flex space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!name || !email) return;
                onEnroll(cls.id, name, email);
                setSelectedClass(cls.id);
              }}
            >
              <input
                className="border p-1 rounded flex-1"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border p-1 rounded flex-1"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-green-600 text-white px-3 rounded">
                Enroll
              </button>
            </form>

            {/* Feedback form (only after enrolled) */}
            {selectedClass === cls.id && (
              <form
                className="mt-3 space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!rating) return;
                  onAddFeedback(cls.id, email, rating, comments);
                  setRating("");
                  setComments("");
                }}
              >
                <input
                  className="border p-1 rounded w-full"
                  placeholder="Rating (1-5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <input
                  className="border p-1 rounded w-full"
                  placeholder="Comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
                <button className="bg-purple-600 text-white px-3 py-1 rounded">
                  Submit Feedback
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
