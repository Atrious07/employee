// src/components/CreateTaskModal.jsx
import React, { useState } from "react";

export default function CreateTaskModal({ employees = [], onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState(employees[0]?.id || "");
  const [deadline, setDeadline] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title || !description || !assigneeId || !deadline) return alert("Fill all fields");
    onCreate({ title, description, assigneeId, deadline });
    // reset
    setTitle(""); setDescription(""); setAssigneeId(employees[0]?.id || ""); setDeadline("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Create Task</h3>
        <form onSubmit={submit} className="space-y-3">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded bg-gray-700" />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 rounded bg-gray-700" />
          <select value={assigneeId} onChange={e=>setAssigneeId(e.target.value)} className="w-full p-2 rounded bg-gray-700">
            {employees.map(emp=> <option key={emp.id} value={emp.id}>{emp.name} ({emp.email})</option>)}
          </select>
          <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} className="w-full p-2 rounded bg-gray-700" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-600 rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-emerald-500 rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
