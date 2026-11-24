
package cl.luzdeplata.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.luzdeplata.backend.dto.BoletaResponse;
import cl.luzdeplata.backend.dto.CompraRequest;
import cl.luzdeplata.backend.dto.DetalleBoletaResponse;
import cl.luzdeplata.backend.entity.Boleta;
import cl.luzdeplata.backend.service.BoletaService;

@RestController
@RequestMapping("/api/v1/boletas")
public class BoletaController {

    private final BoletaService boletaService;

    public BoletaController(
            BoletaService boletaService) {
        this.boletaService = boletaService;
    }

    // ==========================================
    // 1. LISTAR TODAS LAS BOLETAS
    // Administrador y vendedor
    // ==========================================

    @GetMapping
    public ResponseEntity<List<BoletaResponse>> listarTodas() {

        List<BoletaResponse> boletas = boletaService
                .listarTodas()
                .stream()
                .map(BoletaResponse::desdeBoleta)
                .toList();

        return ResponseEntity.ok(boletas);
    }

    // ==========================================
    // 2. LISTAR MIS COMPRAS
    // Usuario autenticado
    // ==========================================

    @GetMapping("/mis")
    public ResponseEntity<List<BoletaResponse>> listarMisCompras(
            Authentication authentication) {

        String email = authentication.getName();

        List<BoletaResponse> compras = boletaService
                .listarMisBoletas(email)
                .stream()
                .map(BoletaResponse::desdeBoleta)
                .toList();

        return ResponseEntity.ok(compras);
    }

    // ==========================================
    // 3. CONSULTAR UNA COMPRA PROPIA
    // Usuario autenticado
    // ==========================================

    @GetMapping("/mis/{id}")
    public ResponseEntity<BoletaResponse> buscarMiCompra(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        Boleta boleta = boletaService.buscarMiBoleta(
                id,
                email);

        BoletaResponse respuesta = BoletaResponse.desdeBoleta(boleta);

        List<DetalleBoletaResponse> detalles = boletaService
                .listarDetallesPorBoleta(id)
                .stream()
                .map(DetalleBoletaResponse::desdeDetalle)
                .toList();

        respuesta.setDetalles(detalles);

        return ResponseEntity.ok(respuesta);
    }

    // ==========================================
    // 4. BUSCAR BOLETA POR ID
    // Administrador y vendedor
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<BoletaResponse> buscarPorId(
            @PathVariable Long id) {

        Boleta boleta = boletaService.buscarPorId(id);

        BoletaResponse respuesta = BoletaResponse.desdeBoleta(boleta);

        List<DetalleBoletaResponse> detalles = boletaService
                .listarDetallesPorBoleta(id)
                .stream()
                .map(DetalleBoletaResponse::desdeDetalle)
                .toList();

        respuesta.setDetalles(detalles);

        return ResponseEntity.ok(respuesta);
    }

    // ==========================================
    // 5. LISTAR BOLETAS DE UN USUARIO
    // Administrador y vendedor
    // ==========================================

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<BoletaResponse>> listarPorUsuario(
            @PathVariable Long usuarioId) {

        List<BoletaResponse> boletas = boletaService
                .listarPorUsuario(usuarioId)
                .stream()
                .map(BoletaResponse::desdeBoleta)
                .toList();

        return ResponseEntity.ok(boletas);
    }

    // ==========================================
    // 6. CREAR UNA COMPRA
    // Cliente o administrador
    // ==========================================

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
                .body(BoletaResponse.desdeBoleta(boleta));
    }
}
