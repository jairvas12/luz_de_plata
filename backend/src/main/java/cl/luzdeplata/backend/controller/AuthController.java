package cl.luzdeplata.backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import cl.luzdeplata.backend.dto.RegistroRequest;
import cl.luzdeplata.backend.dto.UsuarioResponse;

import cl.luzdeplata.backend.dto.AuthResponse;
import cl.luzdeplata.backend.dto.LoginRequest;
import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.security.JwtService;
import cl.luzdeplata.backend.service.AuthService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    private final JwtService jwtService;

    public AuthController(
        AuthService authService,
        JwtService jwtService
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
        @Valid @RequestBody LoginRequest request
    ) {

        Usuario usuario =
            authService.autenticar(request);

        String token =
            jwtService.generarToken(usuario);

        AuthResponse respuesta =
            new AuthResponse(
                token,
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol().name()
            );

        return ResponseEntity.ok(
            respuesta
        );
    }
    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> register(
        @Valid @RequestBody RegistroRequest request
    ) {

        Usuario usuario =
            authService.registrar(
                request
            );

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                UsuarioResponse.desdeUsuario(
                    usuario
                )
            );
    }
}