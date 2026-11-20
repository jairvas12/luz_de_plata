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

@Entity 
@Table (name = "productos")
public class Producto {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (
        nullable = false,
        unique = true,
        length = 50
    )
    private String codigo;

    @Column (
        nullable = false,
        length = 150
    )
    private String nombre;

    @Column (
        length = 1000
    )
    private String descripcion;

    @Column (
        nullable = false,
        precision = 12,
        scale = 2
    )
    private BigDecimal precio;

    @Column (
        nullable = false
    )
    private Integer stock;

    @Column (
        name = "stock_critico",
        nullable = false
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
