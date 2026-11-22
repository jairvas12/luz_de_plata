package cl.luzdeplata.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cl.luzdeplata.backend.entity.Boleta;

public interface BoletaRepository
        extends JpaRepository<Boleta, Long> {

    Optional<Boleta> findByNumeroOrden(
        String numeroOrden
    );

    List<Boleta> findByUsuario_Id(
        Long usuarioId
    );

    @Query(
        "SELECT b " +
        "FROM Boleta b " +
        "JOIN FETCH b.usuario"
    )
    List<Boleta> findAllConUsuario();

    @Query(
        "SELECT b " +
        "FROM Boleta b " +
        "JOIN FETCH b.usuario " +
        "WHERE b.id = :id"
    )
    Optional<Boleta> findByIdConUsuario(
        @Param("id") Long id
    );

    @Query(
        "SELECT b " +
        "FROM Boleta b " +
        "JOIN FETCH b.usuario " +
        "WHERE b.usuario.id = :usuarioId"
    )
    List<Boleta> findByUsuarioIdConUsuario(
        @Param("usuarioId") Long usuarioId
    );
}