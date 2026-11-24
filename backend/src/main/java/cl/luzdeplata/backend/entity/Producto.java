package cl.luzdeplata.backend.entity;

import java.math.BigDecimal;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity 
@Table (name = "productos")
public class Producto {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El código del producto es obligatorio.")
    @Size(
        min = 3,
        max = 50,
        message = "El código debe tener entre 3 y 50 caracteres."
    )
    private String codigo;

    @NotBlank(message = "El nombre del producto es obligatorio.")
    @Size(
        max = 100,
        message = "El nombre no puede superar los 100 caracteres."
    )
    private String nombre;

    @Size(
        max = 500,
        message = "La descripción no puede superar los 500 caracteres."
    )
    private String descripcion;

    @NotNull(message = "El precio es obligatorio.")
    @DecimalMin(
        value = "0.0",
        inclusive = true,
        message = "El precio no puede ser negativo."
    )
    private BigDecimal precio;

    @NotNull(message = "El stock es obligatorio.")
    @Min(
        value = 0,
        message = "El stock no puede ser negativo."
    )
    private Integer stock;

    @Min(
        value = 0,
        message = "El stock crítico no puede ser negativo."
    )
    private Integer stockCritico;

    @Column ( length = 500)
    private String imagen;

    @Column (
        nullable = false
    )
    private Boolean destacado;

    @ManyToOne (
        fetch = FetchType.LAZY,
        optional = false
    )
    @JoinColumn (
        name="categoria_id",
        nullable = false
    )
    private Categoria categoria;

    public Producto() {
    }

    public  Producto(       
        String codigo,
        String nombre,
        String descripcion,
        BigDecimal precio,
        Integer stock,
        Integer stockCritico,
        String imagen,
        Boolean destacado,
        Categoria categoria
    ){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.stockCritico = stockCritico;
        this.imagen = imagen;
        this.destacado = destacado;
        this.categoria = categoria;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getCodigo(){
        return codigo;
    }

    public void setCodigo(String codigo){
        this.codigo = codigo;
    }

    public String getNombre(){
        return nombre;
    }

    public void setNombre(String nombre){
        this.nombre = nombre;
    }
    public String getDescripcion(){
        return descripcion;
    }

    public void setDescripcion(String descripcion){
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio(){
        return precio;
    }

    public void setPrecio(BigDecimal precio){
        this.precio = precio;
    }

    public Integer getStock(){
        return stock;
    }

    public void setStock(Integer stock){
        this.stock = stock;
    }

    public Integer getStockCritico(){
        return stockCritico;
    }

    public void setStockCritico(Integer stockCritico){
        this.stockCritico = stockCritico;
    }

    public String getImagen(){
        return imagen;
    }

    public void setImagen(String imagen){
        this.imagen = imagen;
    }

    public Boolean getDestacado(){
        return destacado;
    }

    public void setDestacado(Boolean destacado){
        this.destacado = destacado;
    }

    public Categoria getCategoria(){
        return categoria;
    }

    public void setCategoria(Categoria categoria){
        this.categoria = categoria;
    }
}
