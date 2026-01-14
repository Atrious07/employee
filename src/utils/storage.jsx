// src/utils/storage.js
// central place for localStorage operations

const USERS_KEY = "em_users_v1";
const TASKS_KEY = "em_tasks_v1";
const CURRENT_KEY = "em_current_v1";

// seed default users (only if none exist)
// Admin: admin@company.com / password: admin123  (role: admin)
// Employee: emp@company.com / password: emp123 (role: employee)
export function seedIfEmpty() {
  if (!localStorage.getItem(USERS_KEY)) {
    const seedUsers = [
      { id: "u_admin", name: "Admin", email: "admin@company.com", password: "admin123", role: "admin" },
      { id: "u_emp", name: "Employee", email: "emp@company.com", password: "emp123", role: "employee" }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    const seedTasks = [
      { id: "t1", title: "Welcome Task", description: "First onboarding task", assigneeId: "u_emp", deadline: "2025-08-31", status: "Running", createdAt: new Date().toISOString() }
    ];
    localStorage.setItem(TASKS_KEY, JSON.stringify(seedTasks));
  }
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
export function findUserByEmail(email) {
  return getUsers().find(u => u.email === email);
}

export function getTasks() {
  return JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
}
export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
export function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}
export function updateTask(updated) {
  const tasks = getTasks().map(t => t.id === updated.id ? updated : t);
  saveTasks(tasks);
}
export function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}

export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
}
export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_KEY);
}
