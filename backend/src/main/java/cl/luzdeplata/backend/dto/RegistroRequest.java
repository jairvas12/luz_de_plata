package cl.luzdeplata.backend.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

public class RegistroRequest {

    // El RUN se mantiene opcional porque
    // actualmente el registro público no lo solicita.
    private String run;

    @NotBlank(
        message = "El nombre es obligatorio."
    )
    @Size(
        max = 100,
        message = "El nombre no puede superar los 100 caracteres."
    )
    private String nombre;

    @NotBlank(
        message = "Los apellidos son obligatorios."
    )
    @Size(
        max = 100,
        message = "Los apellidos no pueden superar los 100 caracteres."
    )
    private String apellidos;

    @NotBlank(
        message = "El correo es obligatorio."
    )
    @Email(
        message = "El correo no tiene un formato válido."
    )
    @Size(
        max = 100,
        message = "El correo no puede superar los 100 caracteres."
    )
    private String email;

    @Past(
        message = "La fecha de nacimiento debe ser anterior a la fecha actual."
    )
    private LocalDate fechaNacimiento;

    @NotBlank(
        message = "La contraseña es obligatoria."
    )
    @Size(
        min = 4,
        max = 72,
        message = "La contraseña debe tener entre 4 y 72 caracteres."
    )
    private String password;

    @NotBlank(
        message = "La región es obligatoria."
    )
    private String region;

    @NotBlank(
        message = "La comuna es obligatoria."
    )
    private String comuna;

    @NotBlank(
        message = "La dirección es obligatoria."
    )
    @Size(
        max = 300,
        message = "La dirección no puede superar los 300 caracteres."
    )
    private String direccion;

    public RegistroRequest() {
    }

    public String getRun() {
        return run;
    }

    public void setRun(String run) {
        this.run = run;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(
        String nombre
    ) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(
        String apellidos
    ) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
        String email
    ) {
        this.email = email;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(
        LocalDate fechaNacimiento
    ) {
        this.fechaNacimiento =
            fechaNacimiento;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
        String password
    ) {
        this.password = password;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(
        String region
    ) {
        this.region = region;
    }

    public String getComuna() {
        return comuna;
    }

    public void setComuna(
        String comuna
    ) {
        this.comuna = comuna;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(
        String direccion
    ) {
        this.direccion = direccion;
    }
}