package cl.luzdeplata.backend.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.exception.DatosInvalidosException;
import cl.luzdeplata.backend.exception.RecursoDuplicadoException;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    public UsuarioService(
        UsuarioRepository usuarioRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository
                .findById(id)
                .orElseThrow(
                    () -> new RecursoNoEncontradoException(
                        "Usuario no encontrado"
                    )
                );
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository
                .findByEmail(email)
                .orElseThrow(
                    () -> new RecursoNoEncontradoException(
                        "Usuario no encontrado"
                    )
                );
    }

    public Usuario crear(Usuario usuario) {

        validarEmailDuplicado(
            usuario.getEmail(),
            null
        );

        validarRunDuplicado(
            usuario.getRun(),
            null
        );

        if (
            usuario.getPassword() == null
            || usuario.getPassword().isBlank()
        ) {
            throw new DatosInvalidosException(
                "La contraseña es obligatoria"
            );
        }

        usuario.setPassword(
            passwordEncoder.encode(
                usuario.getPassword()
            )
        );

        return usuarioRepository.save(usuario);
    }

    public Usuario actualizar(
        Long id,
        Usuario datos
    ) {

        Usuario usuarioExistente =
            buscarPorId(id);

        validarEmailDuplicado(
            datos.getEmail(),
            id
        );

        validarRunDuplicado(
            datos.getRun(),
            id
        );

        usuarioExistente.setRun(
            datos.getRun()
        );

        usuarioExistente.setNombre(
            datos.getNombre()
        );

        usuarioExistente.setApellidos(
            datos.getApellidos()
        );

        usuarioExistente.setEmail(
            datos.getEmail()
        );

        usuarioExistente.setFechaNacimiento(
            datos.getFechaNacimiento()
        );

        usuarioExistente.setRol(
            datos.getRol()
        );

        usuarioExistente.setRegion(
            datos.getRegion()
        );

        usuarioExistente.setComuna(
            datos.getComuna()
        );

        usuarioExistente.setDireccion(
            datos.getDireccion()
        );

        usuarioExistente.setActivo(
            datos.getActivo()
        );

        return usuarioRepository.save(
            usuarioExistente
        );
    }

    public void eliminar(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNoEncontradoException(
                "Usuario no encontrado"
            );
        }

        usuarioRepository.deleteById(id);
    }

    private void validarEmailDuplicado(
        String email,
        Long usuarioIdActual
    ) {

        usuarioRepository
            .findByEmail(email)
            .ifPresent(
                usuarioExistente -> {

                    if (
                        usuarioIdActual == null
                        || !usuarioExistente
                            .getId()
                            .equals(usuarioIdActual)
                    ) {
                        throw new RecursoDuplicadoException(
                            "El correo ya está registrado"
                        );
                    }
                }
            );
    }

    private void validarRunDuplicado(
        String run,
        Long usuarioIdActual
    ) {

        if (
            run == null
            || run.isBlank()
        ) {
            return;
        }

        usuarioRepository
            .findAll()
            .stream()
            .filter(
                usuarioExistente ->
                    run.equals(
                        usuarioExistente.getRun()
                    )
            )
            .filter(
                usuarioExistente ->
                    usuarioIdActual == null
                    || !usuarioExistente
                        .getId()
                        .equals(usuarioIdActual)
            )
            .findFirst()
            .ifPresent(
                usuarioExistente -> {
                    throw new RecursoDuplicadoException(
                        "El RUN ya está registrado"
                    );
                }
            );
    }
}