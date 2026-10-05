"use strict";
function publicHeaderState() {
  Carrito.updateCartCount();
  const s = LP.session();
  const user = document.querySelector("[data-user-state]");
  if (user) user.textContent = s ? `${s.name}` : "Cuenta";
  document.querySelectorAll("[data-logout]").forEach(b => b.classList.toggle("oculto", !s));
}
function initSearch() {
  document.querySelectorAll("[data-search-form]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    const q = form.querySelector("input").value.trim();
    location.href = `catalogo.html${q ? `?q=${encodeURIComponent(q)}` : ""}`;
  }));
}
function initGlobalButtons() {
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add-cart]");
    if (add) {
      if (Carrito.addToCart(add.dataset.addCart)) LP.notify("Producto añadido al carrito.");
      else LP.notify("Producto sin stock.", "error");
    }
    const fav = e.target.closest("[data-favorite]");
    if (fav) {
      const on = Carrito.toggleFavorite(fav.dataset.favorite);
      fav.textContent = on ? "♥" : "♡";
      LP.notify(on ? "Agregado a favoritos." : "Eliminado de favoritos.");
    }
    const out = e.target.closest("[data-logout]");
    if (out) {
      Usuarios.logout();
      location.href = "index.html";
    }
  });
}
function initHome() {
  const grid = document.querySelector("[data-home-products]");
  if (grid) Productos.renderProducts(grid, Productos.getProducts().filter(p => p.featured).slice(0, 4));
}
function initCatalog() {
  const grid = document.querySelector("[data-catalog-grid]");
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const q = (params.get("q") || "").toLowerCase();
  const catSelect = document.querySelector("#filtro-categoria"), order = document.querySelector("#orden-productos");
  if (params.get("categoria")) catSelect.value = params.get("categoria");
  const draw = () => {
    let list = Productos.getProducts();
    const cat = catSelect.value;
    if (cat) list = list.filter(p => p.category === cat);
    if (q) list = list.filter(p => (p.name + " " + p.description + " " + p.category).toLowerCase().includes(q));
    if (order.value === "precio-asc") list.sort((a, b) => a.price - b.price);
    if (order.value === "precio-desc") list.sort((a, b) => b.price - a.price);
    if (order.value === "nombre") list.sort((a, b) => a.name.localeCompare(b.name));
    Productos.renderProducts(grid, list);
    const count = document.querySelector("[data-result-count]");
    if (count) count.textContent = `${list.length} producto(s)${q ? ` para “${params.get("q")}”` : ""}`;
  };
  catSelect.addEventListener("change", draw);
  order.addEventListener("change", draw);
  draw();
}
function initBest() {
  const grid = document.querySelector("[data-best-grid]");
  if (grid) Productos.renderProducts(grid, Productos.getProducts().filter(p => p.featured).slice(0, 8));
}
function initDetail() {
  const host = document.querySelector("[data-product-detail]");
  if (!host) return;
  const id = new URLSearchParams(location.search).get("id") || "LP001", p = Productos.getProduct(id);
  if (!p) {
    host.innerHTML = '<div class="mensaje-vacio">Producto no encontrado.</div>';
    return;
  }
  host.innerHTML = `<div class="detalle-producto__imagen"><img src="${LP.asset(p.image)}" alt="${LP.escape(p.name)}"><button class="producto-card__favorito" data-favorite="${p.id}">♡</button></div><article class="detalle-producto__info"><span class="producto-card__categoria">${LP.escape(p.category)}</span><h1>${LP.escape(p.name)}</h1><p class="detalle-producto__precio">${LP.money(p.price)}</p><p class="muted">Código: ${LP.escape(p.code)} · Stock: ${p.stock}</p><div class="detalle-producto__descripcion"><h2>Descripción</h2><p>${LP.escape(p.description)}</p></div><button class="boton boton--bloque" data-add-cart="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>🛒 ${p.stock <= 0 ? 'Sin stock' : 'Agregar al carrito'}</button></article>`;
}
function initFavorites() {
  const host = document.querySelector("[data-favorites]");
  if (!host) return;
  const ids = LP.read(LP.keys.favorites, []), list = ids.map(Productos.getProduct).filter(Boolean);
  host.innerHTML = list.length ? list.map(p => `<article class="deseo-item"><img src="${LP.asset(p.image)}" alt="${LP.escape(p.name)}"><div><h3>${LP.escape(p.name)}</h3><p>${LP.escape(p.description)}</p><strong>${LP.money(p.price)}</strong></div><div class="deseo-item__acciones"><button class="boton" data-add-cart="${p.id}">🛒 Seleccionar</button> <button class="boton boton--claro" data-remove-favorite="${p.id}">♡ Quitar</button></div></article>`).join("") : '<div class="mensaje-vacio">Aún no tienes joyas favoritas.</div>';
  host.addEventListener("click", e => {
    const b = e.target.closest("[data-remove-favorite]");
    if (b) {
      Carrito.toggleFavorite(b.dataset.removeFavorite);
      initFavorites();
    }
  });
}
function initCart() {
  const list = document.querySelector("[data-cart-list]");
  if (!list) return;
  const draw = () => {
    const detail = Carrito.cartDetail();
    list.innerHTML = detail.length ? detail.map(( {
      item, product: p
    }) => `<article class="carrito-item"><img src="${LP.asset(p.image)}" alt="${LP.escape(p.name)}"><div><h3>${LP.escape(p.name)}</h3><p class="muted">${LP.escape(p.description)}</p><div class="cantidad"><button aria-label="Disminuir" data-qty="-1" data-id="${p.id}">−</button><span>${item.qty}</span><button aria-label="Aumentar" data-qty="1" data-id="${p.id}">+</button></div> <button class="boton boton--claro" data-remove-cart="${p.id}">Eliminar</button></div><div class="carrito-item__precio"><strong>${LP.money(p.price)}</strong><p>Subtotal: ${LP.money(p.price * item.qty)}</p></div></article>`).join("") : '<div class="mensaje-vacio">Tu carrito está vacío. <a href="catalogo.html">Ir al catálogo</a>.</div>';
    document.querySelector("[data-cart-subtotal]").textContent = LP.money(Carrito.cartTotal());
    document.querySelector("[data-cart-total]").textContent = LP.money(Carrito.cartTotal());
    Carrito.updateCartCount();
  };
  list.addEventListener("click", e => {
    const q = e.target.closest("[data-qty]");
    if (q) {
      const row = Carrito.getCart().find(x => x.productId === q.dataset.id);
      Carrito.setQty(q.dataset.id, row.qty + Number(q.dataset.qty));
      draw();
    }
    const rm = e.target.closest("[data-remove-cart]");
    if (rm) {
      Carrito.removeFromCart(rm.dataset.removeCart);
      draw();
    }
  });
  document.querySelector("[data-checkout]")?.addEventListener("click", Carrito.checkout);
  draw();
}
function initLogin() {
  const form = document.querySelector("#login-form");
  if (!form) return;
  Validador.attachRealtime(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = form.email, password = form.password;
    const ok = Validador.validarEmail(email) && Validador.validarPassword(password);
    if (!ok) return;
    const session = Usuarios.login(email.value, password.value);
    if (!session) {
      LP.notify("Correo o contraseña incorrectos.", "error", form);
      return;
    }
    const next = new URLSearchParams(location.search).get("next");
    if (session.role !== "Cliente" && (next === "admin" || session.role === "Administrador" || session.role === "Vendedor")) location.href = "admin/index.html";
    else if (next === "carrito") location.href = "carrito.html";
    else location.href = "index.html";
  });
}
function validateUserForm(form, isEdit = false) {
  let ok = true;
  if (form.run) ok = Validador.validarRun(form.run) && ok;
  ok = Validador.validarTexto(form.name, {
    max: 50, label: "Nombre"
  }) && ok;
  ok = Validador.validarTexto(form.surname, {
    max: 100, label: "Apellidos"
  }) && ok;
  ok = Validador.validarEmail(form.email) && ok;
  if (!isEdit || form.password.value) {
    ok = Validador.validarPassword(form.password, !isEdit) && ok;
    if (form.password.value !== form.confirmPassword.value) {
      Validador.setError(form.confirmPassword, "Las contraseñas no coinciden.");
      ok = false;
    }  else Validador.setError(form.confirmPassword, "");
  }
  ok = Validador.validarTexto(form.region, {
    label: "Región"
  }) && ok;
  ok = Validador.validarTexto(form.commune, {
    label: "Comuna"
  }) && ok;
  ok = Validador.validarTexto(form.address, {
    max: 300, label: "Dirección"
  }) && ok;
  return ok;
}
function initRegister() {
  const form = document.querySelector("#registro-form");
  if (!form) return;
  cargarRegiones(form.region, form.commune);
  Validador.attachRealtime(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateUserForm(form)) return;
    if (form.terms && !form.terms.checked) {
      LP.notify("Debes aceptar los términos para crear la cuenta.", "error", form);
      return;
    }
    const users = Usuarios.getUsers();
    if (users.some(u => u.email.toLowerCase() === form.email.value.toLowerCase())) {
      Validador.setError(form.email, "Este correo ya está registrado.");
      return;
    }
    users.push( {
      id: LP.uid("USR"), run: "", name: form.name.value.trim(), surname: form.surname.value.trim(), email: form.email.value.trim(), password: form.password.value, birth: form.birth.value, role: "Cliente", region: form.region.value, commune: form.commune.value, address: form.address.value.trim(), active: true
    });
    Usuarios.saveUsers(users);
    LP.notify("Cuenta creada correctamente. Ya puedes iniciar sesión.", "exito", form);
    form.reset();
    setTimeout(() => location.href = "login.html", 900);
  });
}
function initContact() {
  const form = document.querySelector("#contacto-form");
  if (!form) return;
  Validador.attachRealtime(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = Validador.validarTexto(form.name, {
      max: 100, label: "Nombre"
    });
    ok = Validador.validarEmail(form.email, false) && ok;
    ok = Validador.validarTexto(form.comment, {
      max: 500, label: "Comentario"
    }) && ok;
    if (!ok) return;
    const data = LP.read(LP.keys.contacts, []);
    data.unshift( {
      id: LP.uid("MSG"), name: form.name.value.trim(), email: form.email.value.trim(), comment: form.comment.value.trim(), date: new Date().toISOString()
    });
    LP.write(LP.keys.contacts, data);
    LP.notify("Mensaje enviado. Gracias por contactarnos.", "exito", form);
    form.reset();
  });
}
function initHistory() {
  const host = document.querySelector("[data-purchases]");
  if (host) {
    const s = LP.session();
    if (!s) {
      host.innerHTML = '<div class="mensaje-vacio">Inicia sesión para ver tus compras.</div>';
      return;
    }
    const rows = LP.read(LP.keys.purchases, []).filter(p => p.userId === s.id);
    host.innerHTML = rows.length ? rows.flatMap(p => p.items.map(i => `<article class="historial-item"><img src="${LP.asset(i.image)}" alt="${LP.escape(i.name)}"><div><h3>${LP.escape(i.name)}</h3><p>${i.qty} unidad(es) · ${LP.money(i.price)}</p><small>Compra ${LP.escape(p.id)}</small></div><div class="historial-item__fecha"><strong>FECHA DE COMPRA</strong><br>${new Date(p.date).toLocaleDateString("es-CL")}</div></article>`)).join("") : '<div class="mensaje-vacio">Aún no registras compras.</div>';
  }
  const sh = document.querySelector("[data-shipments]");
  if (sh) {
    const s = LP.session();
    if (!s) {
      sh.innerHTML = '<div class="mensaje-vacio">Inicia sesión para ver tus envíos.</div>';
      return;
    }
    const ships = LP.read(LP.keys.shipments, []).filter(x => x.userId === s.id);
    sh.innerHTML = ships.length ? ships.map(x => `<article class="envio-seguimiento"><div class="seguimiento-barra"><div class="estado activo">Paquete en preparación</div><div class="estado">Paquete preparado</div><div class="estado">Entregado a repartidor</div></div><p><strong>Orden:</strong> ${LP.escape(x.purchaseId)} &nbsp; <strong>Transportista:</strong> ${LP.escape(x.carrier)} &nbsp; <strong>Código:</strong> ${LP.escape(x.code)}</p><p><strong>Fecha estimada:</strong> ${new Date(x.estimated).toLocaleDateString("es-CL")}</p></article>`).join("") : '<div class="mensaje-vacio">No tienes envíos activos.</div>';
  }
}
function initSuccess() {
  const el = document.querySelector("[data-last-purchase]");
  if (el) el.textContent = sessionStorage.getItem("lp_last_purchase") || "Compra registrada";
}
document.addEventListener("DOMContentLoaded", () => {
  publicHeaderState();
  initSearch();
  initGlobalButtons();
  initHome();
  initCatalog();
  initBest();
  initDetail();
  initFavorites();
  initCart();
  initLogin();
  initRegister();
  initContact();
  initHistory();
  initSuccess();
});
