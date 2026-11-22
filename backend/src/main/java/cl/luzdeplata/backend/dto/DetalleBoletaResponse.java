package cl.luzdeplata.backend.dto;

import java.math.BigDecimal;

import cl.luzdeplata.backend.entity.DetalleBoleta;

public class DetalleBoletaResponse {

    private Long id;
    private Long boletaId;
    private Long productoId;
    private String productoCodigo;
    private String productoNombre;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;

    public DetalleBoletaResponse(
        Long id,
        Long boletaId,
        Long productoId,
        String productoCodigo,
        String productoNombre,
        Integer cantidad,
        BigDecimal precioUnitario,
        BigDecimal subtotal
    ) {
        this.id = id;
        this.boletaId = boletaId;
        this.productoId = productoId;
        this.productoCodigo = productoCodigo;
        this.productoNombre = productoNombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }

    public static DetalleBoletaResponse desdeDetalle(
        DetalleBoleta detalle
    ) {
        return new DetalleBoletaResponse(
            detalle.getId(),
            detalle.getBoleta().getId(),
            detalle.getProducto().getId(),
            detalle.getProducto().getCodigo(),
            detalle.getProducto().getNombre(),
            detalle.getCantidad(),
            detalle.getPrecioUnitario(),
            detalle.getSubtotal()
        );
    }

    public Long getId() {
        return id;
    }

    public Long getBoletaId() {
        return boletaId;
    }

    public Long getProductoId() {
        return productoId;
    }

    public String getProductoCodigo() {
        return productoCodigo;
    }

    public String getProductoNombre() {
        return productoNombre;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }
}