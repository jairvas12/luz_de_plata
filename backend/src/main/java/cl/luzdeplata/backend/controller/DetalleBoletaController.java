package cl.luzdeplata.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.luzdeplata.backend.entity.DetalleBoleta;
import cl.luzdeplata.backend.service.DetalleBoletaService;

@RestController
@RequestMapping("/api/v1/detalles")
public class DetalleBoletaController {

    private final DetalleBoletaService detalleBoletaService;

    public DetalleBoletaController(
        DetalleBoletaService detalleBoletaService
    ) {
        this.detalleBoletaService = detalleBoletaService;
    }

    @GetMapping
    public ResponseEntity<List<DetalleBoleta>> listarTodos() {

        return ResponseEntity.ok(
            detalleBoletaService.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleBoleta> buscarPorId(
        @PathVariable Long id
    ) {

        return ResponseEntity.ok(
            detalleBoletaService.buscarPorId(id)
        );
    }

    @GetMapping("/boleta/{boletaId}")
    public ResponseEntity<List<DetalleBoleta>> listarPorBoleta(
        @PathVariable Long boletaId
    ) {

        return ResponseEntity.ok(
            detalleBoletaService.listarPorBoleta(
                boletaId
            )
        );
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<DetalleBoleta>> listarPorProducto(
        @PathVariable Long productoId
    ) {

        return ResponseEntity.ok(
            detalleBoletaService.listarPorProducto(
                productoId
            )
        );
    }
}