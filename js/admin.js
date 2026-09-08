"use strict";
let adminSession = null;
function adminLayout() {
  adminSession = Usuarios.requireAdmin();
  if (!adminSession) return false;
  document.querySelector("[data-admin-user]").textContent = `${adminSession.name} · ${adminSession.role}`;
  if (adminSession.role === "Vendedor") document.querySelectorAll("[data-admin-only]").forEach(x => x.remove());
  return true;
}
function adminDashboard() {
  if (!document.querySelector("[data-dashboard]")) return;
  const products = Productos.getProducts();
  const users = Usuarios.getUsers();
  const purchases = LP.read(LP.keys.purchases, []);
  const critical = products.filter(p => p.criticalStock !== "" && p.criticalStock != null && p.stock <= Number(p.criticalStock)).length;
  const map = {
    "[data-m-products]": products.length, "[data-m-users]": users.length, "[data-m-orders]": purchases.length, "[data-m-critical]": critical
  };
  Object.entries(map).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  });
}
function renderAdminProducts() {
  const body = document.querySelector("[data-admin-products]");
  if (!body) return;
  const list = Productos.getProducts();
  body.innerHTML = list.map(p => `<tr><td><img src="${LP.asset(p.image)}" alt=""></td><td>${LP.escape(p.code)}</td><td>${LP.escape(p.name)}</td><td>${LP.escape(p.category)}</td><td>${LP.money(p.price)}</td><td class="${p.criticalStock !== "" && p.stock <= Number(p.criticalStock) ? 'stock-critico' : ''}">${p.stock}</td><td><div class="tabla-acciones"><a class="boton boton--claro" href="../detalle-producto.html?id=${p.id}">Ver</a>${adminSession.role === "Administrador" ? `<a class="boton boton--claro" href="producto-editar.html?id=${p.id}">Editar</a><button class="boton boton--peligro" data-delete-product="${p.id}">Eliminar</button>` : ""}</div></td></tr>`).join("");
  body.addEventListener("click", e => {
    const b = e.target.closest("[data-delete-product]");
    if (b && confirm("¿Eliminar este producto?")) {
      Productos.saveProducts(Productos.getProducts().filter(p => p.id !== b.dataset.deleteProduct));
      renderAdminProducts();
    }
  });
}
function productForm(edit = false) {
  const form = document.querySelector("#producto-form");
  if (!form) return;
  if (adminSession.role !== "Administrador") {
    LP.notify("El perfil Vendedor solo puede visualizar productos y órdenes.", "error", form);
    Array.from(form.elements).forEach(x => x.disabled = true);
    return;
  }
  let current = null;
  if (edit) {
    current = Productos.getProduct(new URLSearchParams(location.search).get("id"));
    if (!current) {
      LP.notify("Producto no encontrado.", "error", form);
      return;
    }
    for (const k of ["code", "name", "description", "price", "stock", "criticalStock", "category", "image"]) {
      if (form[k]) form[k].value = current[k] ?? "";
    }
  }
  Validador.attachRealtime(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = Validador.validarTexto(form.code, {
      label: "Código", max: null
    });
    if (form.code.value.trim().length < 3) {
      Validador.setError(form.code, "El código requiere mínimo 3 caracteres.");
      ok = false;
    }
    ok = Validador.validarTexto(form.name, {
      max: 100, label: "Nombre"
    }) && ok;
    if (form.description.value.length > 500) {
      Validador.setError(form.description, "Máximo 500 caracteres.");
      ok = false;
    }  else Validador.setError(form.description, "");
    ok = Validador.validarNumero(form.price, {
      min: 0, label: "Precio"
    }) && ok;
    ok = Validador.validarNumero(form.stock, {
      min: 0, integer: true, label: "Stock"
    }) && ok;
    ok = Validador.validarNumero(form.criticalStock, {
      required: false, min: 0, integer: true, label: "Stock crítico"
    }) && ok;
    ok = Validador.validarTexto(form.category, {
      label: "Categoría"
    }) && ok;
    if (!ok) return;
    const products = Productos.getProducts();
    if (products.some(p => p.code.toLowerCase() === form.code.value.trim().toLowerCase() && (!current || p.id !== current.id))) {
      Validador.setError(form.code, "El código ya existe.");
      return;
    }
    const obj = {
      id: current?.id || LP.uid("LP"), code: form.code.value.trim(), name: form.name.value.trim(), description: form.description.value.trim(), price: Number(form.price.value), stock: Number(form.stock.value), criticalStock: form.criticalStock.value === "" ? "" : Number(form.criticalStock.value), category: form.category.value, image: form.image.value.trim() || "img/aros/1.webp", featured: current?.featured || false
    };
    if (current) {
      const i = products.findIndex(p => p.id === current.id);
      products[i] = obj;
    }  else products.push(obj);
    Productos.saveProducts(products);
    LP.notify(edit ? "Producto actualizado." : "Producto creado.", "exito", form);
    setTimeout(() => location.href = "productos.html", 700);
  });
}
function renderAdminUsers() {
  const body = document.querySelector("[data-admin-users]");
  if (!body) return;
  if (adminSession.role !== "Administrador") {
    body.closest(".tabla-wrap").innerHTML = '<div class="mensaje-vacio">Tu perfil no tiene permiso para administrar usuarios.</div>';
    return;
  }
  const list = Usuarios.getUsers();
  body.innerHTML = list.map(u => `<tr><td>${LP.escape(u.run || "No registrado")}</td><td>${LP.escape(u.name)} ${LP.escape(u.surname)}</td><td>${LP.escape(u.email)}</td><td><span class="badge">${LP.escape(u.role)}</span></td><td>${LP.escape(u.region || "")}</td><td><div class="tabla-acciones"><a class="boton boton--claro" href="usuario-editar.html?id=${u.id}">Editar</a>${u.id !== adminSession.id ? `<button class="boton boton--peligro" data-delete-user="${u.id}">Eliminar</button>` : ""}</div></td></tr>`).join("");
  body.addEventListener("click", e => {
    const b = e.target.closest("[data-delete-user]");
    if (b && confirm("¿Eliminar este usuario?")) {
      Usuarios.saveUsers(Usuarios.getUsers().filter(u => u.id !== b.dataset.deleteUser));
      renderAdminUsers();
    }
  });
}
function userForm(edit = false) {
  const form = document.querySelector("#usuario-form");
  if (!form) return;
  if (adminSession.role !== "Administrador") {
    form.innerHTML = '<div class="mensaje-vacio">Tu perfil no tiene permiso para administrar usuarios.</div>';
    return;
  }
  let current = null;
  if (edit) {
    current = Usuarios.findUser(new URLSearchParams(location.search).get("id"));
    if (!current) {
      LP.notify("Usuario no encontrado.", "error", form);
      return;
    }
    for (const k of ["run", "name", "surname", "email", "birth", "role", "address"]) {
      if (form[k]) form[k].value = current[k] || "";
    }
    cargarRegiones(form.region, form.commune, current.region, current.commune);
  }  else cargarRegiones(form.region, form.commune);
  Validador.attachRealtime(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = Validador.validarRun(form.run);
    ok = Validador.validarTexto(form.name, {
      max: 50, label: "Nombre"
    }) && ok;
    ok = Validador.validarTexto(form.surname, {
      max: 100, label: "Apellidos"
    }) && ok;
    ok = Validador.validarEmail(form.email) && ok;
    if (!edit || form.password.value) {
      ok = Validador.validarPassword(form.password, !edit) && ok;
      if (form.password.value !== form.confirmPassword.value) {
        Validador.setError(form.confirmPassword, "Las contraseñas no coinciden.");
        ok = false;
      }  else Validador.setError(form.confirmPassword, "");
    }
    ok = Validador.validarTexto(form.role, {
      label: "Tipo de usuario"
    }) && ok;
    ok = Validador.validarTexto(form.region, {
      label: "Región"
    }) && ok;
    ok = Validador.validarTexto(form.commune, {
      label: "Comuna"
    }) && ok;
    ok = Validador.validarTexto(form.address, {
      max: 300, label: "Dirección"
    }) && ok;
    if (!ok) return;
    const users = Usuarios.getUsers();
    if (users.some(u => u.email.toLowerCase() === form.email.value.toLowerCase() && (!current || u.id !== current.id))) {
      Validador.setError(form.email, "Correo ya registrado.");
      return;
    }
    if (users.some(u => u.run === form.run.value && (!current || u.id !== current.id))) {
      Validador.setError(form.run, "RUN ya registrado.");
      return;
    }
    const obj = {
      id: current?.id || LP.uid("USR"), run: form.run.value, name: form.name.value.trim(), surname: form.surname.value.trim(), email: form.email.value.trim(), password: form.password.value || current?.password || "1234", birth: form.birth.value, role: form.role.value, region: form.region.value, commune: form.commune.value, address: form.address.value.trim(), active: true
    };
    if (current) {
      users[users.findIndex(u => u.id === current.id)] = obj;
    }  else users.push(obj);
    Usuarios.saveUsers(users);
    LP.notify(edit ? "Usuario actualizado." : "Usuario creado.", "exito", form);
    setTimeout(() => location.href = "usuarios.html", 700);
  });
}
function renderAdminOrders() {
  const body = document.querySelector("[data-admin-orders]");
  if (!body) return;
  const orders = LP.read(LP.keys.purchases, []), users = Usuarios.getUsers();
  body.innerHTML = orders.length ? orders.map(o => {
    const u = users.find(x => x.id === o.userId);
    const qty = (o.items || []).reduce((n, i) => n + i.qty, 0);
    return `<tr><td>${LP.escape(o.id)}</td><td>${LP.escape(u ? u.name + " " + u.surname : "Usuario")}</td><td>${new Date(o.date).toLocaleDateString("es-CL")}</td><td>${qty}</td><td>${LP.money(o.total)}</td><td><a class="boton boton--claro" href="orden-detalle.html?id=${encodeURIComponent(o.id)}">Ver detalle</a></td></tr>`;
  }).join("") : '<tr><td colspan="6">Aún no hay órdenes registradas.</td></tr>';
}
function renderAdminOrderDetail() {
  const host = document.querySelector("[data-admin-order-detail]");
  if (!host) return;
  const id = new URLSearchParams(location.search).get("id"), order = LP.read(LP.keys.purchases, []).find(o => o.id === id);
  if (!order) {
    host.innerHTML = '<div class="mensaje-vacio">Orden no encontrada.</div>';
    return;
  }
  const user = Usuarios.getUsers().find(u => u.id === order.userId);
  host.innerHTML = `<h1>Orden ${LP.escape(order.id)}</h1><p><strong>Cliente:</strong> ${LP.escape(user ? user.name + " " + user.surname : "Usuario")} · <strong>Fecha:</strong> ${new Date(order.date).toLocaleString("es-CL")}</p><div class="tabla-wrap"><table class="tabla"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th></tr></thead><tbody>${order.items.map(i => `<tr><td>${LP.escape(i.name)}</td><td>${i.qty}</td><td>${LP.money(i.price)}</td><td>${LP.money(i.price * i.qty)}</td></tr>`).join("")}</tbody></table></div><p style="font-size:1.2rem"><strong>Total: ${LP.money(order.total)}</strong></p>`;
}
document.addEventListener("DOMContentLoaded", () => {
  if (!adminLayout()) return;
  adminDashboard();
  renderAdminProducts();
  renderAdminUsers();
  renderAdminOrders();
  renderAdminOrderDetail();
  productForm(document.body.dataset.page === "producto-editar");
  userForm(document.body.dataset.page === "usuario-editar");
  document.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
    Usuarios.logout();
    location.href = "../login.html";
  });
});
