package cl.luzdeplata.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.dto.RegistroRequest;
import cl.luzdeplata.backend.entity.RolUsuario;
import cl.luzdeplata.backend.dto.LoginRequest;
import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.exception.CredencialesInvalidasException;
import cl.luzdeplata.backend.repository.UsuarioRepository;

@Service
public class AuthService {
    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;
    public AuthService(
        UsuarioRepository usuarioRepository,
        PasswordEncoder passwordEncoder,
        UsuarioService usuarioService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.usuarioService = usuarioService;
    }

    public Usuario autenticar(
        LoginRequest request
    ) {

        Usuario usuario =
            usuarioRepository
                .findByEmail(
                    request.getEmail()
                )
                .orElseThrow(
                    () -> new CredencialesInvalidasException(
                        "Credenciales incorrectas"
                    )
                );

        boolean passwordCorrecta =
            passwordEncoder.matches(
                request.getPassword(),
                usuario.getPassword()
            );

        if (!passwordCorrecta) {
            throw new CredencialesInvalidasException(
                "Credenciales incorrectas"
            );
        }

        if (!Boolean.TRUE.equals(usuario.getActivo())) {
            throw new CredencialesInvalidasException(
                "Usuario inactivo"
            );
        }

        return usuario;
    }

    public Usuario registrar(
        RegistroRequest request
    ) {

        Usuario usuario =
            new Usuario();

        usuario.setRun(
            request.getRun()
        );

        usuario.setNombre(
            request.getNombre()
        );

        usuario.setApellidos(
            request.getApellidos()
        );

        usuario.setEmail(
            request.getEmail()
        );

        usuario.setFechaNacimiento(
            request.getFechaNacimiento()
        );

        usuario.setPassword(
            request.getPassword()
        );

        usuario.setRegion(
            request.getRegion()
        );

        usuario.setComuna(
            request.getComuna()
        );

        usuario.setDireccion(
            request.getDireccion()
        );

        usuario.setRol(
            RolUsuario.CLIENTE
        );

        usuario.setActivo(
            true
        );

        return usuarioService.crear(
            usuario
        );
    }
}