package cl.luzdeplata.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.luzdeplata.backend.entity.Boleta;

public interface BoletaRepository extends JpaRepository<Boleta, Long>{
    
    Optional<Boleta> findByNumeroOrden(String numeroOrden);

    List<Boleta> findByUsuario_Id(Long usuarioId);
}
