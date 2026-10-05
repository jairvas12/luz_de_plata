"use strict";
function getProducts() {
  return LP.read(LP.keys.products, []);
}
function saveProducts(p) {
  return LP.write(LP.keys.products, p);
}
function getProduct(id) {
  return getProducts().find(p => p.id === id || p.code === id);
}
function productCard(p) {
  const fav = LP.read(LP.keys.favorites, []).includes(p.id);
  return `<article class="producto-card">
    <div class="producto-card__imagen"><a href="detalle-producto.html?id=${encodeURIComponent(p.id)}"><img loading="lazy" src="${LP.asset(p.image)}" alt="${LP.escape(p.name)}"></a>
    <button class="producto-card__favorito" data-favorite="${LP.escape(p.id)}" aria-label="${fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">${fav ? '♥' : '♡'}</button></div>
    <div class="producto-card__cuerpo"><span class="producto-card__categoria">${LP.escape(p.category)}</span><h3>${LP.escape(p.name)}</h3><p class="producto-card__precio">${LP.money(p.price)}</p>
    <div class="producto-card__acciones"><a class="boton boton--claro" href="detalle-producto.html?id=${encodeURIComponent(p.id)}">Ver detalle</a><button class="boton" data-add-cart="${LP.escape(p.id)}" ${p.stock <= 0 ? 'disabled' : ''}>${p.stock <= 0 ? 'Sin stock' : 'Añadir'}</button></div></div>
  </article>`;
}
function renderProducts(container, products) {
  if (!container) return;
  container.innerHTML = products.length ? products.map(productCard).join("") : '<div class="mensaje-vacio">No se encontraron productos.</div>';
}
window.Productos = {
  getProducts, saveProducts, getProduct, productCard, renderProducts
};
