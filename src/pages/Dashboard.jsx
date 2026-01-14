// src/pages/Dashboard.jsx
import React, { useContext, useMemo, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTasks, addTask, updateTask, deleteTask, getUsers } from "../utils/storage";
import TaskList from "../components/TaskList";
import CreateTaskModal from "../components/CreateTaskModal";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const employees = useMemo(()=> getUsers().filter(u=>u.role === "employee"), []);

  useEffect(()=> {
    // load tasks and enrich assignee name
    const t = getTasks().map(task => {
      const assignee = getUsers().find(u => u.id === task.assigneeId);
      return { ...task, assigneeName: assignee?.name || "—" };
    });
    setTasks(t);
  }, []);

  const refresh = () => {
    const t = getTasks().map(task => {
      const assignee = getUsers().find(u => u.id === task.assigneeId);
      return { ...task, assigneeName: assignee?.name || "—" };
    });
    setTasks(t);
  };

  const handleCreate = ({ title, description, assigneeId, deadline }) => {
    const id = "t_" + Date.now().toString(36);
    addTask({ id, title, description, assigneeId, deadline, status: "Running", createdAt: new Date().toISOString() });
    refresh();
  };

  const handleAccept = (task) => {
    // admin marks complete
    updateTask({ ...task, status: "Completed" });
    refresh();
  };

  const handleDelete = (task) => {
    if (!confirm("Delete this task?")) return;
    deleteTask(task.id);
    refresh();
  };

  // counts (for current user if employee)
  const visibleTasks = tasks.filter(t => user.role === "admin" ? true : t.assigneeId === user.id);

  const counts = useMemo(() => {
    const total = visibleTasks.length;
    const completed = visibleTasks.filter(t=>t.status==="Completed").length;
    const failed = visibleTasks.filter(t=>t.status==="Failed").length;
    const running = visibleTasks.filter(t=>t.status==="Running").length;
    return { total, completed, failed, running };
  }, [visibleTasks]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {user.role === "admin" && <button onClick={()=>setShowCreate(true)} className="bg-emerald-500 px-3 py-1 rounded">Create Task</button>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded">{/* Total */}
            <div className="text-sm text-gray-300">Total</div>
            <div className="text-2xl font-bold">{counts.total}</div>
          </div>
          <div className="bg-white/5 p-4 rounded">
            <div className="text-sm text-gray-300">Completed</div>
            <div className="text-2xl font-bold text-green-400">{counts.completed}</div>
          </div>
          <div className="bg-white/5 p-4 rounded">
            <div className="text-sm text-gray-300">Failed</div>
            <div className="text-2xl font-bold text-red-400">{counts.failed}</div>
          </div>
          <div className="bg-white/5 p-4 rounded">
            <div className="text-sm text-gray-300">Running</div>
            <div className="text-2xl font-bold text-yellow-400">{counts.running}</div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Tasks</h2>
          <TaskList tasks={visibleTasks} onAccept={handleAccept} onDelete={handleDelete} isAdmin={user.role==="admin"} />
        </div>
      </div>

      {showCreate && <CreateTaskModal employees={employees} onClose={()=>setShowCreate(false)} onCreate={handleCreate} />}
    </div>
  );
}
