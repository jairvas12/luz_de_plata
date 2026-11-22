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

import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.service.UsuarioService;

@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(
        UsuarioService usuarioService
    ) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {

        return ResponseEntity.ok(
            usuarioService.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(
        @PathVariable Long id
    ) {

        return ResponseEntity.ok(
            usuarioService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<Usuario> crear(
        @RequestBody Usuario usuario
    ) {

        Usuario usuarioGuardado =
            usuarioService.guardar(usuario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(usuarioGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(
        @PathVariable Long id,
        @RequestBody Usuario usuario
    ) {

        Usuario usuarioExistente =
            usuarioService.buscarPorId(id);

        usuarioExistente.setRun(
            usuario.getRun()
        );

        usuarioExistente.setNombre(
            usuario.getNombre()
        );

        usuarioExistente.setApellidos(
            usuario.getApellidos()
        );

        usuarioExistente.setEmail(
            usuario.getEmail()
        );

        usuarioExistente.setFechaNacimiento(
            usuario.getFechaNacimiento()
        );

        usuarioExistente.setRol(
            usuario.getRol()
        );

        usuarioExistente.setRegion(
            usuario.getRegion()
        );

        usuarioExistente.setComuna(
            usuario.getComuna()
        );

        usuarioExistente.setDireccion(
            usuario.getDireccion()
        );

        usuarioExistente.setActivo(
            usuario.getActivo()
        );

        return ResponseEntity.ok(
            usuarioService.guardar(
                usuarioExistente
            )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
        @PathVariable Long id
    ) {

        usuarioService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}