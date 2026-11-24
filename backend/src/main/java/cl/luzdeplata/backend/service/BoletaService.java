package cl.luzdeplata.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cl.luzdeplata.backend.dto.ItemCompraRequest;
import cl.luzdeplata.backend.entity.Boleta;
import cl.luzdeplata.backend.entity.DetalleBoleta;
import cl.luzdeplata.backend.entity.EstadoBoleta;
import cl.luzdeplata.backend.entity.Producto;
import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.exception.DatosInvalidosException;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.repository.BoletaRepository;
import cl.luzdeplata.backend.repository.DetalleBoletaRepository;
import cl.luzdeplata.backend.repository.ProductoRepository;
import cl.luzdeplata.backend.repository.UsuarioRepository;
import org.springframework.security.access.AccessDeniedException;

@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;

    private final DetalleBoletaRepository detalleBoletaRepository;

    private final ProductoRepository productoRepository;

    private final UsuarioRepository usuarioRepository;

    public BoletaService(
            BoletaRepository boletaRepository,
            DetalleBoletaRepository detalleBoletaRepository,
            ProductoRepository productoRepository,
            UsuarioRepository usuarioRepository) {
        this.boletaRepository = boletaRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Boleta> listarTodas() {
        return boletaRepository.findAllConUsuario();
    }

    public Boleta buscarPorId(Long id) {

        return boletaRepository
                .findByIdConUsuario(id)
                .orElseThrow(
                        () -> new RecursoNoEncontradoException(
                                "Boleta no encontrada"));
    }

    public List<Boleta> listarPorUsuario(
            Long usuarioId) {
        return boletaRepository
                .findByUsuarioIdConUsuario(
                        usuarioId);
    }

    @Transactional(readOnly = true)
    public List<DetalleBoleta> listarDetallesPorBoleta(
            Long boletaId) {
        return detalleBoletaRepository.findByBoleta_Id(
                boletaId);
    }

    @Transactional(readOnly = true)
    public List<Boleta> listarMisBoletas(String email) {

        Usuario usuario = usuarioRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RecursoNoEncontradoException(
                                "Usuario no encontrado"));

        return boletaRepository.findByUsuarioIdConUsuario(
                usuario.getId());
    }

    @Transactional(readOnly = true)
    public Boleta buscarMiBoleta(
            Long boletaId,
            String email) {

        Boleta boleta = boletaRepository
                .findByIdConUsuario(boletaId)
                .orElseThrow(
                        () -> new RecursoNoEncontradoException(
                                "Boleta no encontrada"));

        if (!boleta.getUsuario().getEmail()
                .equalsIgnoreCase(email)) {
            throw new AccessDeniedException(
                    "No tienes permiso para consultar esta boleta");
        }

        return boleta;
    }

    @Transactional
    public Boleta crearCompra(
            String email,
            List<ItemCompraRequest> items) {

        if (items == null || items.isEmpty()) {
            throw new DatosInvalidosException(
                    "La compra debe contener al menos un producto");
        }

        Usuario usuario = usuarioRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RecursoNoEncontradoException(
                                "Usuario no encontrado"));

        String numeroOrden = "LP-"
                + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();

        Boleta boleta = new Boleta(
                numeroOrden,
                LocalDateTime.now(),
                BigDecimal.ZERO,
                EstadoBoleta.CONFIRMADA,
                usuario);

        boleta = boletaRepository.save(boleta);

        BigDecimal total = BigDecimal.ZERO;

        for (ItemCompraRequest item : items) {

            if (item.getCantidad() == null
                    || item.getCantidad() <= 0) {
                throw new DatosInvalidosException(
                        "La cantidad debe ser mayor que cero");
            }

            Producto producto = productoRepository
                    .findById(
                            item.getProductoId())
                    .orElseThrow(
                            () -> new RecursoNoEncontradoException(
                                    "Producto no encontrado"));

            if (producto.getStock() < item.getCantidad()) {
                throw new DatosInvalidosException(
                        "Stock insuficiente para el producto: "
                                + producto.getNombre());
            }

            BigDecimal precioUnitario = producto.getPrecio();

            BigDecimal subtotal = precioUnitario.multiply(
                    BigDecimal.valueOf(
                            item.getCantidad()));

            DetalleBoleta detalle = new DetalleBoleta(
                    boleta,
                    producto,
                    item.getCantidad(),
                    precioUnitario,
                    subtotal);

            detalleBoletaRepository.save(
                    detalle);

            producto.setStock(
                    producto.getStock()
                            - item.getCantidad());

            productoRepository.save(
                    producto);

            total = total.add(subtotal);
        }

        boleta.setTotal(total);

        return boletaRepository.save(
                boleta);
    }
}