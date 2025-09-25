import React, { useState } from "react";

export default function StudentDashboard({
  classes,
  onEnroll,
  onAddFeedback,
  user,
  onLogout,
}) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Available Classes</h2>
      {classes.length === 0 && <p>No classes available.</p>}
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="p-3 border rounded">
            <h3 className="font-bold">{cls.title}</h3>
            <p>{cls.description}</p>
            <p className="text-sm text-gray-600">{cls.schedule}</p>

            <button
              className="bg-green-600 text-white px-3 py-1 rounded mt-2"
              onClick={() => {
                onEnroll(cls.id, user.name, user.email);
                setSelectedClass(cls.id);
              }}
            >
              Enroll
            </button>

            {selectedClass === cls.id && (
              <form
                className="mt-3 space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!rating) return;
                  onAddFeedback(cls.id, user.email, rating, comments);
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
