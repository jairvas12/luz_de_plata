"use strict";
function getUsers() {
  return LP.read(LP.keys.users, []);
}
function saveUsers(u) {
  return LP.write(LP.keys.users, u);
}
function findUser(id) {
  return getUsers().find(u => u.id === id);
}
function login(email, password) {
  const user = getUsers().find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password && u.active !== false);
  if (!user) return null;
  const session = {
    id: user.id, name: user.name, email: user.email, role: user.role
  };
  LP.write(LP.keys.session, session);
  return session;
}
function logout() {
  localStorage.removeItem(LP.keys.session);
}
function requireAdmin(allowed = ["Administrador", "Vendedor"]) {
  const s = LP.session();
  if (!s || !allowed.includes(s.role)) {
    location.href = "../login.html?next=admin";
    return null;
  }
  return s;
}
window.Usuarios = {
  getUsers, saveUsers, findUser, login, logout, requireAdmin
};
