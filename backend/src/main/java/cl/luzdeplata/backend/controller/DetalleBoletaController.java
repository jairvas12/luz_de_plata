package cl.luzdeplata.backend.controller;

import java.util.List;


import cl.luzdeplata.backend.dto.DetalleBoletaResponse;
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
    public ResponseEntity<List<DetalleBoletaResponse>> listarTodos() {

        List<DetalleBoletaResponse> detalles =
            detalleBoletaService
                .listarTodos()
                .stream()
                .map(
                    DetalleBoletaResponse::desdeDetalle
                )
                .toList();

        return ResponseEntity.ok(
            detalles
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleBoletaResponse> buscarPorId(
        @PathVariable Long id
    ) {

        DetalleBoleta detalle =
            detalleBoletaService.buscarPorId(id);

        return ResponseEntity.ok(
            DetalleBoletaResponse.desdeDetalle(
                detalle
            )
        );
    }

    @GetMapping("/boleta/{boletaId}")
    public ResponseEntity<List<DetalleBoletaResponse>> listarPorBoleta(
        @PathVariable Long boletaId
    ) {

        List<DetalleBoletaResponse> detalles =
            detalleBoletaService
                .listarPorBoleta(boletaId)
                .stream()
                .map(
                    DetalleBoletaResponse::desdeDetalle
                )
                .toList();

        return ResponseEntity.ok(
            detalles
        );
    }

    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<DetalleBoletaResponse>> listarPorProducto(
        @PathVariable Long productoId
    ) {

        List<DetalleBoletaResponse> detalles =
            detalleBoletaService
                .listarPorProducto(productoId)
                .stream()
                .map(
                    DetalleBoletaResponse::desdeDetalle
                )
                .toList();

        return ResponseEntity.ok(
            detalles
        );
    }
}