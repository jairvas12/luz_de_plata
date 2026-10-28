import {act} from "react";
import {createRoot} from "react-dom/client";
import {MemoryRouter} from "react-router-dom";
import ProductoCard from "../src/components/ProductoCard.jsx";
import Catalogo from "../src/pages/Catalogo.jsx";
import productos from "../src/data/productos.js";

describe("Pruebas de componentes React",() => {
    let contenedor;
    let root;
    beforeAll(() => {globalThis.IS_REACT_ACT_ENVIRONMENT = true;});

    beforeEach(() => {
        localStorage.clear();
        contenedor = document.createElement("div");

        document.body.appendChild(contenedor);
        root = createRoot(contenedor);
      }
    );

    afterEach(() => {act(() => {root.unmount();}); contenedor.remove();});

    function renderizar(
      componente
    ) {
      act(() => {
          root.render(
            <MemoryRouter>
              {componente}
            </MemoryRouter>
          );
        }
      );
    }

    it("debería renderizar los datos recibidos por props en ProductoCard", () => {
        const producto =productos[0];

        renderizar(<ProductoCard producto={producto}/>);

        const nombre = contenedor.querySelector("h3").textContent;

        const categoria = contenedor.querySelector(".producto-card__categoria").textContent;

        const precio = contenedor.querySelector(".producto-card__precio").textContent;

        expect(nombre).toBe(producto.name);

        expect(categoria).toBe(producto.category);

        expect(precio).toContain(producto.price.toLocaleString("es-CL"));
      }
    );

    it("debería agregar un producto a favoritos al presionar el botón",() => {

        const producto =productos[0];

        const almacenamiento = spyOn(Storage.prototype,"setItem").and.callThrough();

        renderizar(<ProductoCard producto={producto}/>);

        const boton = contenedor.querySelector(".producto-card__favorito");

        expect(boton.textContent).toBe("♡");

        act(() => {boton.dispatchEvent(new MouseEvent("click", {bubbles: true}));});

        expect(boton.textContent).toBe("♥");

        expect(almacenamiento).toHaveBeenCalled();

        const favoritos =JSON.parse(localStorage.getItem("favoritos"));

        expect(favoritos.length).toBe(1);

        expect(favoritos[0].id).toBe(producto.id);
      }
    );


    it(
      "debería filtrar el catálogo por la categoría Aros",
      () => {renderizar(<Catalogo />);

        const botonAros = Array.from(contenedor.querySelectorAll(".categoria-chip")).find((boton) => boton.textContent.trim()==="Aros");

        act(() => {botonAros.dispatchEvent(new MouseEvent("click",{bubbles: true}));});

        const tarjetas = contenedor.querySelectorAll(".producto-card");

        const cantidadEsperada = productos.filter((producto) => producto.category === "Aros").length;

        expect(tarjetas.length).toBe(cantidadEsperada);

        tarjetas.forEach((tarjeta) => {const categoria = tarjeta.querySelector(".producto-card__categoria").textContent;
            expect(categoria).toBe("Aros");
          }
        );
      }
    );

    it("debería ordenar los productos de menor a mayor precio", () => {renderizar(<Catalogo />);

        const selects = contenedor.querySelectorAll(".toolbar select");

        const selectOrden = selects[1];

        act(() => {selectOrden.value = "precio-asc";

            selectOrden.dispatchEvent(new Event("change", {bubbles: true}));
          }
        );

        const primerProducto = contenedor.querySelector(".producto-card h3").textContent;

        const esperado =[...productos].sort((a, b) => a.price - b.price)[0].name;

        expect(primerProducto).toBe(esperado);

      }
    );


    it("debería ordenar los productos alfabéticamente",() => {renderizar(<Catalogo />);

        const selects =contenedor.querySelectorAll(".toolbar select");

        const selectOrden = selects[1];
        act(() => {selectOrden.value = "nombre";

            selectOrden.dispatchEvent(new Event("change", {bubbles: true}));

          }
        );

        const nombres = Array.from(contenedor.querySelectorAll(".producto-card h3")).map(
              (elemento) =>
                elemento.textContent
            );

        const nombresEsperados = [...productos].sort((a, b) => a.name.localeCompare(b.name)).map(
              (producto) =>
                producto.name
            );

        expect(nombres).toEqual(nombresEsperados);
        
      }
    );
  }
);