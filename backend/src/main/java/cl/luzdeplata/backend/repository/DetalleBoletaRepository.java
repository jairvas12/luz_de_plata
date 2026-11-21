package cl.luzdeplata.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.luzdeplata.backend.entity.DetalleBoleta;

public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Long> {
    
    List<DetalleBoleta> findByBoleta_Id(Long boletaId);

    List<DetalleBoleta> findByProducto_Id(Long productoId);
}
