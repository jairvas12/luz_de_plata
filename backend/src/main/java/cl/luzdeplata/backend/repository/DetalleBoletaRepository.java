package cl.luzdeplata.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import cl.luzdeplata.backend.entity.DetalleBoleta;

public interface DetalleBoletaRepository
        extends JpaRepository<DetalleBoleta, Long> {

    @Query("SELECT d " +
            "FROM DetalleBoleta d " +
            "JOIN FETCH d.boleta " +
            "JOIN FETCH d.producto")
    List<DetalleBoleta> findAllConRelaciones();

    @Query("SELECT d " +
            "FROM DetalleBoleta d " +
            "JOIN FETCH d.boleta " +
            "JOIN FETCH d.producto " +
            "WHERE d.id = :id")
    Optional<DetalleBoleta> findByIdConRelaciones(
            @Param("id") Long id);

    @Query("SELECT d " +
            "FROM DetalleBoleta d " +
            "JOIN FETCH d.boleta " +
            "JOIN FETCH d.producto " +
            "WHERE d.boleta.id = :boletaId")
    List<DetalleBoleta> findByBoletaIdConRelaciones(
            @Param("boletaId") Long boletaId);

    @Query("SELECT d " +
            "FROM DetalleBoleta d " +
            "JOIN FETCH d.boleta " +
            "JOIN FETCH d.producto " +
            "WHERE d.producto.id = :productoId")
    List<DetalleBoleta> findByProductoIdConRelaciones(
            @Param("productoId") Long productoId);

    @EntityGraph(attributePaths = { "producto" })
    List<DetalleBoleta> findByBoleta_Id(Long boletaId);
}