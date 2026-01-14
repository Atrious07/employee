// src/components/TaskList.jsx
import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onAccept, onDelete, isAdmin }) {
  if (!tasks || tasks.length === 0) {
    return <div className="text-gray-400">No tasks found.</div>;
  }
  return (
    <div className="grid gap-4">
      {tasks.map(t => (
        <TaskCard key={t.id} task={t} onAccept={onAccept} onDelete={onDelete} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
