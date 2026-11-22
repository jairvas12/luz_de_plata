package cl.luzdeplata.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.entity.DetalleBoleta;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.repository.DetalleBoletaRepository;

@Service
public class DetalleBoletaService {

    private final DetalleBoletaRepository detalleBoletaRepository;

    public DetalleBoletaService(
        DetalleBoletaRepository detalleBoletaRepository
    ) {
        this.detalleBoletaRepository = detalleBoletaRepository;
    }

    public List<DetalleBoleta> listarTodos() {
        return detalleBoletaRepository.findAll();
    }

    public DetalleBoleta buscarPorId(Long id) {
        return detalleBoletaRepository
                .findById(id)
                .orElseThrow(
                    () -> new RecursoNoEncontradoException(
                        "Detalle de boleta no encontrado"
                    )
                );
    }

    public List<DetalleBoleta> listarPorBoleta(
        Long boletaId
    ) {
        return detalleBoletaRepository
                .findByBoleta_Id(boletaId);
    }

    public List<DetalleBoleta> listarPorProducto(
        Long productoId
    ) {
        return detalleBoletaRepository
                .findByProducto_Id(productoId);
    }
}