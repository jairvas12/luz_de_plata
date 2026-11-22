package cl.luzdeplata.backend.dto;

public class AuthResponse {

    private String token;

    private Long id;

    private String nombre;

    private String email;

    private String rol;

    public AuthResponse(
        String token,
        Long id,
        String nombre,
        String email,
        String rol
    ) {
        this.token = token;
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    public String getRol() {
        return rol;
    }
}