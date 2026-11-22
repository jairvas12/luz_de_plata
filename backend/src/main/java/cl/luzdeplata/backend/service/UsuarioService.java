package cl.luzdeplata.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.exception.RecursoDuplicadoException;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(
        UsuarioRepository usuarioRepository
    ) {
        this.usuarioRepository = usuarioRepository;
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

    public Usuario guardar(Usuario usuario) {

        usuarioRepository
            .findByEmail(usuario.getEmail())
            .ifPresent(
                usuarioExistente -> {

                    if (
                        usuario.getId() == null
                        || !usuarioExistente
                            .getId()
                            .equals(usuario.getId())
                    ) {
                        throw new RecursoDuplicadoException(
                            "El correo ya está registrado"
                        );
                    }
                }
            );

        if (
            usuario.getRun() != null
            && !usuario.getRun().isBlank()
        ) {

            usuarioRepository
                .findAll()
                .stream()
                .filter(
                    usuarioExistente ->
                        usuario.getRun().equals(
                            usuarioExistente.getRun()
                        )
                )
                .filter(
                    usuarioExistente ->
                        usuario.getId() == null
                        || !usuarioExistente
                            .getId()
                            .equals(usuario.getId())
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

        return usuarioRepository.save(usuario);
    }

    public void eliminar(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNoEncontradoException(
                "Usuario no encontrado"
            );
        }

        usuarioRepository.deleteById(id);
    }
}