// src/components/TaskCard.jsx
import React from "react";

const statusColors = {
  Completed: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  Running: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-blue-100 text-blue-800",
  Pending: "bg-gray-100 text-gray-800"
};

export default function TaskCard({ task, onAccept, onDelete, isAdmin }) {
  return (
    <div className="border rounded-lg p-4 bg-white/5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{task.description}</p>
          <p className="text-xs text-gray-400 mt-2">Deadline: {task.deadline}</p>
          <p className="text-xs text-gray-400">Assignee: {task.assigneeName || "—"}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${statusColors[task.status] || statusColors.Pending}`}>
          {task.status}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {isAdmin && <button onClick={() => onAccept && onAccept(task)} className="px-3 py-1 bg-green-600 rounded text-white text-sm">Mark Complete</button>}
        {isAdmin && <button onClick={() => onDelete && onDelete(task)} className="px-3 py-1 bg-red-600 rounded text-white text-sm">Delete</button>}
      </div>
    </div>
  );
}
