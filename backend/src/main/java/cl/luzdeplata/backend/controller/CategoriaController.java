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
import org.springframework.web.bind.annotation.RestController;

import cl.luzdeplata.backend.entity.Categoria;
import cl.luzdeplata.backend.service.CategoriaService;

@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(
        CategoriaService categoriaService
    ) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodas() {

        return ResponseEntity.ok(
            categoriaService.listarTodas()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(
        @PathVariable Long id
    ) {

        return ResponseEntity.ok(
            categoriaService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<Categoria> crear(
        @RequestBody Categoria categoria
    ) {

        Categoria categoriaGuardada =
            categoriaService.guardar(categoria);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(categoriaGuardada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(
        @PathVariable Long id,
        @RequestBody Categoria categoria
    ) {

        Categoria categoriaExistente =
            categoriaService.buscarPorId(id);

        categoriaExistente.setNombre(
            categoria.getNombre()
        );

        return ResponseEntity.ok(
            categoriaService.guardar(
                categoriaExistente
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
        @PathVariable Long id
    ) {

        categoriaService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}