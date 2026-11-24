
package cl.luzdeplata.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import cl.luzdeplata.backend.entity.Boleta;

public class BoletaResponse {

    private Long id;
    private String numeroOrden;
    private LocalDateTime fecha;
    private BigDecimal total;
    private String estado;
    private Long usuarioId;
    private String usuarioEmail;

    private List<DetalleBoletaResponse> detalles;

    public BoletaResponse(
            Long id,
            String numeroOrden,
            LocalDateTime fecha,
            BigDecimal total,
            String estado,
            Long usuarioId,
            String usuarioEmail) {
        this.id = id;
        this.numeroOrden = numeroOrden;
        this.fecha = fecha;
        this.total = total;
        this.estado = estado;
        this.usuarioId = usuarioId;
        this.usuarioEmail = usuarioEmail;
    }

    public static BoletaResponse desdeBoleta(
            Boleta boleta) {
        return new BoletaResponse(
                boleta.getId(),
                boleta.getNumeroOrden(),
                boleta.getFecha(),
                boleta.getTotal(),
                boleta.getEstado().name(),
                boleta.getUsuario().getId(),
                boleta.getUsuario().getEmail());
    }

    public Long getId() {
        return id;
    }

    public String getNumeroOrden() {
        return numeroOrden;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public String getEstado() {
        return estado;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public String getUsuarioEmail() {
        return usuarioEmail;
    }

    public List<DetalleBoletaResponse> getDetalles() {
        return detalles;
    }

    public void setDetalles(
            List<DetalleBoletaResponse> detalles) {
        this.detalles = detalles;
    }
}
