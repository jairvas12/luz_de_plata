import {
  agregarAlCarrito,
  obtenerCarrito,
  vaciarCarrito,
} from "../src/utils/carrito.js";

import { alternarFavorito, obtenerFavoritos } from "../src/utils/favoritos.js";

import { obtenerUsuarios, registrarUsuario } from "../src/utils/usuarios.js";

describe("Pruebas unitarias Luz de Plata", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("debería agregar un producto al carrito", () => {
    const producto = {
      id: "TEST001",
      name: "Anillo de prueba",
      price: 10000,
      stock: 5,
    };

    agregarAlCarrito(producto);

    const carrito = obtenerCarrito();

    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe("TEST001");
    expect(carrito[0].cantidad).toBe(1);
  });

  it("debería vaciar completamente el carrito", () => {
    const producto = {
      id: "TEST002",
      name: "Collar de prueba",
      price: 15000,
      stock: 3,
    };

    agregarAlCarrito(producto);

    vaciarCarrito();

    const carrito = obtenerCarrito();

    expect(carrito.length).toBe(0);
  });

  it("debería agregar y quitar un producto de favoritos", () => {
    const producto = {
      id: "FAV001",
      name: "Pulsera de prueba",
      price: 12000,
    };

    alternarFavorito(producto);

    let favoritos = obtenerFavoritos();

    expect(favoritos.length).toBe(1);
    expect(favoritos[0].id).toBe("FAV001");

    alternarFavorito(producto);

    favoritos = obtenerFavoritos();

    expect(favoritos.length).toBe(0);
  });

  it("debería registrar un usuario correctamente", () => {
    const usuario = {
      id: "USRTEST",
      run: "123456789",
      name: "Usuario",
      lastName: "Prueba",
      email: "prueba@gmail.com",
      password: "123456",
      birthDate: "2000-01-01",
      role: "Cliente",
      region: "Valparaíso",
      commune: "Viña del Mar",
      address: "Dirección prueba",
      active: true,
    };

    const resultado = registrarUsuario(usuario);

    expect(resultado.ok).toBeTrue();

    const usuarios = obtenerUsuarios();

    const usuarioGuardado = usuarios.find(
      (item) => item.email === "prueba@gmail.com",
    );

    expect(usuarioGuardado).toBeDefined();
    expect(usuarioGuardado.name).toBe("Usuario");
  });

  it("debería impedir registrar un correo duplicado", () => {
    const usuario = {
      id: "USRTEST2",
      run: "987654321",
      name: "Cliente",
      lastName: "Duplicado",
      email: "duplicado@gmail.com",
      password: "123456",
      birthDate: "2001-01-01",
      role: "Cliente",
      region: "Valparaíso",
      commune: "Viña del Mar",
      address: "Dirección prueba",
      active: true,
    };

    const primerRegistro = registrarUsuario(usuario);

    const segundoRegistro = registrarUsuario({
      ...usuario,
      id: "USRTEST3",
    });

    expect(primerRegistro.ok).toBeTrue();
    expect(segundoRegistro.ok).toBeFalse();
    expect(segundoRegistro.mensaje).toBe("El correo ya está registrado.");
  });
});
