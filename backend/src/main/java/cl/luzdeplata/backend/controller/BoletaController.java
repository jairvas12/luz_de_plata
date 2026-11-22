package cl.luzdeplata.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.luzdeplata.backend.dto.CompraRequest;
import cl.luzdeplata.backend.entity.Boleta;
import cl.luzdeplata.backend.service.BoletaService;

@RestController
@RequestMapping("/api/v1/boletas")
public class BoletaController {

    private final BoletaService boletaService;

    public BoletaController(
        BoletaService boletaService
    ) {
        this.boletaService = boletaService;
    }

    @GetMapping
    public ResponseEntity<List<Boleta>> listarTodas() {

        return ResponseEntity.ok(
            boletaService.listarTodas()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Boleta> buscarPorId(
        @PathVariable Long id
    ) {

        return ResponseEntity.ok(
            boletaService.buscarPorId(id)
        );
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Boleta>> listarPorUsuario(
        @PathVariable Long usuarioId
    ) {

        return ResponseEntity.ok(
            boletaService.listarPorUsuario(
                usuarioId
            )
        );
    }

    @PostMapping
    public ResponseEntity<Boleta> crearCompra(
        @RequestBody CompraRequest request
    ) {

        Boleta boleta =
            boletaService.crearCompra(
                request.getUsuarioId(),
                request.getItems()
            );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(boleta);
    }
}