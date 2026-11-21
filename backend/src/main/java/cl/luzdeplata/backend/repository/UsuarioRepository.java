package cl.luzdeplata.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.luzdeplata.backend.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByRun(String run);
}
