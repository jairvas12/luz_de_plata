"use strict";
window.LP = window.LP || {
};
LP.keys = {
  products: "lp_products_v1", users: "lp_users_v1", cart: "lp_cart_v1", favorites: "lp_favorites_v1", session: "lp_session_v1", purchases: "lp_purchases_v1", shipments: "lp_shipments_v1", contacts: "lp_contacts_v1"
};
LP.read = function (key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  }  catch (e) {
    return fallback;
  }
};
LP.write = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};
LP.uid = function (prefix = "ID") {
  return prefix + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
};
LP.money = function (value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency", currency: "CLP", maximumFractionDigits: 0
  }).format(Number(value) || 0);
};
LP.asset = function (path) {
  if (!path) return "";
  if (path.startsWith("data:") || /^https?:/i.test(path)) return path;
  return location.pathname.includes("/admin/") ? "../" + path.replace(/^\.\//, "") : path.replace(/^\.\//, "");
};
LP.allowedEmail = function (email) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test((email || "").trim());
};
LP.session = function () {
  return LP.read(LP.keys.session, null);
};
LP.escape = function (s) {
  return String(s ?? "").replace(/[&<>'"]/g, c => ( {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[c]));
};
LP.notify = function (message, type = "exito", target = null) {
  const el = document.createElement("div");
  el.className = "alerta alerta--" + type;
  el.textContent = message;
  const host = target || document.querySelector("main .contenedor") || document.querySelector("main") || document.body;
  host.prepend(el);
  setTimeout(() => el.remove(), 4200);
};
LP.seed = function () {
  if (!localStorage.getItem(LP.keys.products)) {
    LP.write(LP.keys.products, [ {
      id: "LP001", code: "ARO001", name: "Aros Luna", description: "Aros de plata 925 de acabado pulido, livianos y versátiles para uso diario.", price: 24990, stock: 18, criticalStock: 4, category: "Aros", image: "img/aros/1.webp", featured: true
    }, {
      id: "LP002", code: "ARO002", name: "Aros Estrella", description: "Aros de plata 925 con diseño delicado inspirado en el brillo nocturno.", price: 29990, stock: 12, criticalStock: 3, category: "Aros", image: "img/aros/3.webp", featured: true
    }, {
      id: "LP003", code: "ARO003", name: "Argollas Aura", description: "Argollas minimalistas de plata 925, cómodas y combinables.", price: 21990, stock: 24, criticalStock: 5, category: "Aros", image: "img/aros/6.webp", featured: false
    }, {
      id: "LP004", code: "DIJ001", name: "Dije Corazón Luz", description: "Dije de plata 925 con silueta de corazón, ideal para regalar.", price: 19990, stock: 10, criticalStock: 3, category: "Dijes", image: "img/dijes/13.webp", featured: true
    }, {
      id: "LP005", code: "DIJ002", name: "Dije Destello", description: "Dije de plata 925 con líneas geométricas y terminación brillante.", price: 22990, stock: 8, criticalStock: 3, category: "Dijes", image: "img/dijes/16.webp", featured: false
    }, {
      id: "LP006", code: "PUL001", name: "Pulsera Esquila", description: "Pulsera de plata 925 con eslabones finos y cierre seguro.", price: 39990, stock: 14, criticalStock: 4, category: "Pulseras", image: "img/pulseras/19.webp", featured: true
    }, {
      id: "LP007", code: "PUL002", name: "Pulsera Brisa", description: "Pulsera de plata 925 de estilo sobrio para combinar con otras piezas.", price: 34990, stock: 9, criticalStock: 3, category: "Pulseras", image: "img/pulseras/23.webp", featured: false
    }, {
      id: "LP008", code: "PUL003", name: "Pulsera Eclipse", description: "Diseño contemporáneo en plata 925 con acabado espejo.", price: 42990, stock: 6, criticalStock: 2, category: "Pulseras", image: "img/pulseras/30.webp", featured: true
    }, {
      id: "LP009", code: "CAD001", name: "Cadena Serena", description: "Cadena de plata 925 de trama fina, ideal para dijes pequeños.", price: 45990, stock: 20, criticalStock: 5, category: "Cadenas", image: "img/cadena/40.webp", featured: true
    }, {
      id: "LP010", code: "CAD002", name: "Cadena Aurora", description: "Cadena de plata 925 con presencia elegante y terminación pulida.", price: 54990, stock: 11, criticalStock: 3, category: "Cadenas", image: "img/cadena/44.webp", featured: false
    }, {
      id: "LP011", code: "CAD003", name: "Cadena Horizonte", description: "Cadena de diseño clásico con eslabones definidos en plata 925.", price: 59990, stock: 7, criticalStock: 2, category: "Cadenas", image: "img/cadena/52.webp", featured: true
    }, {
      id: "LP012", code: "ARO004", name: "Aros Círculo Plata", description: "Aros de plata 925 con forma circular y acabado brillante.", price: 26990, stock: 16, criticalStock: 4, category: "Aros", image: "img/aros/10.webp", featured: false
    }]);
  }
  if (!localStorage.getItem(LP.keys.users)) {
    LP.write(LP.keys.users, [ {
      id: "USRADMIN", run: "190110222", name: "Admin", surname: "Luz de Plata", email: "admin@duoc.cl", password: "admin123", birth: "", role: "Administrador", region: "Metropolitana de Santiago", commune: "Santiago", address: "Administración", active: true
    }, {
      id: "USRVENTA", run: "123456785", name: "Valentina", surname: "Ventas", email: "vendedor@duoc.cl", password: "venta123", birth: "", role: "Vendedor", region: "Metropolitana de Santiago", commune: "Santiago", address: "Tienda", active: true
    }, {
      id: "USRCLIENTE", run: "111111111", name: "Cliente", surname: "Demo", email: "cliente@gmail.com", password: "clave123", birth: "", role: "Cliente", region: "Valparaíso", commune: "Viña del Mar", address: "Dirección demo", active: true
    }]);
  } [LP.keys.cart, LP.keys.favorites, LP.keys.purchases, LP.keys.shipments, LP.keys.contacts].forEach(k => {
    if (!localStorage.getItem(k)) LP.write(k, []);
  });
};
LP.seed();
