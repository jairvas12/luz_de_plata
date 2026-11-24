
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
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import cl.luzdeplata.backend.dto.UsuarioResponse;
import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.service.UsuarioService;
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(
            UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Listar todos los usuarios
    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {

        List<UsuarioResponse> usuarios = usuarioService.listarTodos()
                .stream()
                .map(UsuarioResponse::desdeUsuario)
                .toList();

        return ResponseEntity.ok(usuarios);
    }

    // Buscar usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarPorId(
            @PathVariable Long id) {

        Usuario usuario = usuarioService.buscarPorId(id);

        return ResponseEntity.ok(
                UsuarioResponse.desdeUsuario(usuario));
    }

    // Crear usuario
    @PostMapping
    public ResponseEntity<UsuarioResponse> crear(
            @RequestBody Usuario usuario) {

        Usuario usuarioCreado = usuarioService.crear(usuario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        UsuarioResponse.desdeUsuario(usuarioCreado));
    }

    // Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> actualizar(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {

        Usuario usuarioActualizado = usuarioService.actualizar(id, usuario);

        return ResponseEntity.ok(
                UsuarioResponse.desdeUsuario(usuarioActualizado));
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        usuarioService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}
