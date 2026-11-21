package cl.luzdeplata.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.entity.Usuario;
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
                    () -> new RuntimeException(
                        "Usuario no encontrado"
                    )
                );
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository
                .findByEmail(email)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Usuario no encontrado"
                    )
                );
    }

    public Usuario guardar(Usuario usuario) {

        if (
            usuarioRepository.existsByEmail(
                usuario.getEmail()
            )
        ) {
            throw new RuntimeException(
                "El correo ya está registrado"
            );
        }

        if (
            usuario.getRun() != null
            && !usuario.getRun().isBlank()
            && usuarioRepository.existsByRun(
                usuario.getRun()
            )
        ) {
            throw new RuntimeException(
                "El RUN ya está registrado"
            );
        }

        return usuarioRepository.save(usuario);
    }

    public void eliminar(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException(
                "Usuario no encontrado"
            );
        }

        usuarioRepository.deleteById(id);
    }
}