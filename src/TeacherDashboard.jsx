import React, { useState } from "react";

export default function TeacherDashboard({ classes, onAddClass }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !schedule) return;
    onAddClass(title, description, schedule);
    setTitle("");
    setDescription("");
    setSchedule("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded-lg shadow-sm space-y-2"
      >
        <h2 className="text-lg font-semibold">Add Class</h2>
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          className="border p-2 w-full rounded"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">My Classes</h2>
      {classes.length === 0 && <p>No classes scheduled.</p>}
      <ul className="space-y-4">
        {classes.map((cls) => (
          <li key={cls.id} className="p-3 border rounded">
            <h3 className="font-bold">{cls.title}</h3>
            <p>{cls.description}</p>
            <p className="text-sm text-gray-600">📅 {cls.schedule}</p>
            <p className="mt-2 font-semibold">Attendees:</p>
            <ul className="list-disc ml-5">
              {cls.attendees.map((a, i) => (
                <li key={i}>
                  {a.name} ({a.email})
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Feedback:</p>
            <ul className="list-disc ml-5">
              {cls.feedback.map((f, i) => (
                <li key={i}>
                  {f.attendee.name}: {f.rating}/5 - {f.comments}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
