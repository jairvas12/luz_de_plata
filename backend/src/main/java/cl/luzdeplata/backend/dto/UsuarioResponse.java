package cl.luzdeplata.backend.dto;

import java.time.LocalDate;

import cl.luzdeplata.backend.entity.Usuario;

public class UsuarioResponse {

    private Long id;
    private String run;
    private String nombre;
    private String apellidos;
    private String email;
    private LocalDate fechaNacimiento;
    private String rol;
    private String region;
    private String comuna;
    private String direccion;
    private Boolean activo;

    public UsuarioResponse(
        Long id,
        String run,
        String nombre,
        String apellidos,
        String email,
        LocalDate fechaNacimiento,
        String rol,
        String region,
        String comuna,
        String direccion,
        Boolean activo
    ) {
        this.id = id;
        this.run = run;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.rol = rol;
        this.region = region;
        this.comuna = comuna;
        this.direccion = direccion;
        this.activo = activo;
    }

    public static UsuarioResponse desdeUsuario(
        Usuario usuario
    ) {
        return new UsuarioResponse(
            usuario.getId(),
            usuario.getRun(),
            usuario.getNombre(),
            usuario.getApellidos(),
            usuario.getEmail(),
            usuario.getFechaNacimiento(),
            usuario.getRol().name(),
            usuario.getRegion(),
            usuario.getComuna(),
            usuario.getDireccion(),
            usuario.getActivo()
        );
    }

    public Long getId() {
        return id;
    }

    public String getRun() {
        return run;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public String getRol() {
        return rol;
    }

    public String getRegion() {
        return region;
    }

    public String getComuna() {
        return comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public Boolean getActivo() {
        return activo;
    }
}