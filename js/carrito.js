"use strict";
function getCart() {
  return LP.read(LP.keys.cart, []);
}
function saveCart(c) {
  LP.write(LP.keys.cart, c);
  updateCartCount();
  return c;
}
function addToCart(productId, qty = 1) {
  const p = Productos.getProduct(productId);
  if (!p || p.stock <= 0) return false;
  const c = getCart();
  const row = c.find(x => x.productId === productId);
  if (row) row.qty = Math.min(p.stock, row.qty + qty);
  else c.push( {
    productId, qty: Math.min(qty, p.stock)
  });
  saveCart(c);
  return true;
}
function setQty(productId, qty) {
  const p = Productos.getProduct(productId);
  let c = getCart();
  if (!p) return;
  c = c.map(x => x.productId === productId ? {
    ...x, qty: Math.max(1, Math.min(p.stock, qty))
  } : x);
  saveCart(c);
}
function removeFromCart(productId) {
  saveCart(getCart().filter(x => x.productId !== productId));
}
function cartDetail() {
  return getCart().map(x => ( {
    item: x, product: Productos.getProduct(x.productId)
  })).filter(x => x.product);
}
function cartTotal() {
  return cartDetail().reduce((s, x) => s + x.product.price * x.item.qty, 0);
}
function updateCartCount() {
  const el = document.querySelector("[data-cart-count]");
  if (el) el.textContent = getCart().reduce((s, x) => s + x.qty, 0);
}
function toggleFavorite(id) {
  let f = LP.read(LP.keys.favorites, []);
  f = f.includes(id) ? f.filter(x => x !== id) : [...f,
  id];
  LP.write(LP.keys.favorites, f);
  return f.includes(id);
}
function checkout() {
  const session = LP.session();
  if (!session) {
    location.href = "login.html?next=carrito";
    return;
  }
  const detail = cartDetail();
  if (!detail.length) {
    LP.notify("Tu carrito está vacío.", "error");
    return;
  }
  const products = Productos.getProducts();
  for (const row of detail) {
    const p = products.find(x => x.id === row.product.id);
    if (!p || row.item.qty > p.stock) {
      LP.notify(`No hay stock suficiente de ${row.product.name}.`, "error");
      return;
    }
  }
  detail.forEach(row => {
    const p = products.find(x => x.id === row.product.id);
    p.stock -= row.item.qty;
  });
  Productos.saveProducts(products);
  const purchase = {
    id: LP.uid("CMP"), userId: session.id, date: new Date().toISOString(), total: cartTotal(), items: detail.map(x => ( {
      productId: x.product.id, name: x.product.name, image: x.product.image, price: x.product.price, qty: x.item.qty
    }))
  };
  const purchases = LP.read(LP.keys.purchases, []);
  purchases.unshift(purchase);
  LP.write(LP.keys.purchases, purchases);
  const shipment = {
    id: LP.uid("ENV"), purchaseId: purchase.id, userId: session.id, status: "Preparación", carrier: "Starken", code: Math.floor(100000000 + Math.random() * 900000000).toString(), estimated: new Date(Date.now() + 5 * 86400000).toISOString()
  };
  const shipments = LP.read(LP.keys.shipments, []);
  shipments.unshift(shipment);
  LP.write(LP.keys.shipments, shipments);
  saveCart([]);
  sessionStorage.setItem("lp_last_purchase", purchase.id);
  location.href = "compra-exitosa.html";
}
window.Carrito = {
  getCart, saveCart, addToCart, setQty, removeFromCart, cartDetail, cartTotal, updateCartCount, toggleFavorite, checkout
};
