package cl.luzdeplata.backend.controller;

import java.util.List;

import cl.luzdeplata.backend.dto.BoletaResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import cl.luzdeplata.backend.dto.CompraRequest;
import cl.luzdeplata.backend.entity.Boleta;
import cl.luzdeplata.backend.service.BoletaService;
import cl.luzdeplata.backend.dto.DetalleBoletaResponse;

@RestController
@RequestMapping("/api/v1/boletas")
public class BoletaController {

    private final BoletaService boletaService;

    public BoletaController(
            BoletaService boletaService) {
        this.boletaService = boletaService;
    }

    @GetMapping
    public ResponseEntity<List<BoletaResponse>> listarTodas() {

        List<BoletaResponse> boletas = boletaService
                .listarTodas()
                .stream()
                .map(
                        BoletaResponse::desdeBoleta)
                .toList();

        return ResponseEntity.ok(
                boletas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoletaResponse> buscarPorId(
            @PathVariable Long id) {

        Boleta boleta = boletaService.buscarPorId(id);

        BoletaResponse respuesta = BoletaResponse.desdeBoleta(boleta);

        List<DetalleBoletaResponse> detalles = boletaService
                .listarDetallesPorBoleta(id)
                .stream()
                .map(
                        DetalleBoletaResponse::desdeDetalle)
                .toList();

        respuesta.setDetalles(detalles);

        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<BoletaResponse>> listarPorUsuario(
            @PathVariable Long usuarioId) {

        List<BoletaResponse> boletas = boletaService
                .listarPorUsuario(usuarioId)
                .stream()
                .map(
                        BoletaResponse::desdeBoleta)
                .toList();

        return ResponseEntity.ok(
                boletas);
    }

    @PostMapping
    public ResponseEntity<BoletaResponse> crearCompra(
            @RequestBody CompraRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Boleta boleta = boletaService.crearCompra(
                email,
                request.getItems());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        BoletaResponse.desdeBoleta(
                                boleta));
    }
}