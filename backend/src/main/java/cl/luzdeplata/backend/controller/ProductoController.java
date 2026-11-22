package cl.luzdeplata.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.luzdeplata.backend.entity.Producto;
import cl.luzdeplata.backend.service.ProductoService;

@RestController
@RequestMapping("/api/v1/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(
        ProductoService productoService
    ) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<Producto>> listarTodos() {

        return ResponseEntity.ok(
            productoService.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarPorId(
        @PathVariable Long id
    ) {

        return ResponseEntity.ok(
            productoService.buscarPorId(id)
        );
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Producto> buscarPorCodigo(
        @PathVariable String codigo
    ) {

        return ResponseEntity.ok(
            productoService.buscarPorCodigo(codigo)
        );
    }

    @GetMapping("/destacados")
    public ResponseEntity<List<Producto>> listarDestacados() {

        return ResponseEntity.ok(
            productoService.listarDestacados()
        );
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<Producto>> listarPorCategoria(
        @RequestParam Long categoriaId
    ) {

        return ResponseEntity.ok(
            productoService.listarPorCategoria(
                categoriaId
            )
        );
    }

    @PostMapping
    public ResponseEntity<Producto> crear(
        @RequestBody Producto producto,
        @RequestParam Long categoriaId
    ) {

        Producto productoGuardado =
            productoService.guardar(
                producto,
                categoriaId
            );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productoGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(
        @PathVariable Long id,
        @RequestBody Producto producto,
        @RequestParam Long categoriaId
    ) {

        Producto productoExistente =
            productoService.buscarPorId(id);

        productoExistente.setCodigo(
            producto.getCodigo()
        );

        productoExistente.setNombre(
            producto.getNombre()
        );

        productoExistente.setDescripcion(
            producto.getDescripcion()
        );

        productoExistente.setPrecio(
            producto.getPrecio()
        );

        productoExistente.setStock(
            producto.getStock()
        );

        productoExistente.setStockCritico(
            producto.getStockCritico()
        );

        productoExistente.setImagen(
            producto.getImagen()
        );

        productoExistente.setDestacado(
            producto.getDestacado()
        );

        return ResponseEntity.ok(
            productoService.guardar(
                productoExistente,
                categoriaId
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
        @PathVariable Long id
    ) {

        productoService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}