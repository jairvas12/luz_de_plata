
package cl.luzdeplata.backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import cl.luzdeplata.backend.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // Cifrar las contraseñas mediante BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configurar la seguridad del backend
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .cors(cors -> {
                })
                .csrf(csrf -> csrf.disable())

                // Autenticación mediante JWT, sin sesión de servidor
                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // LOGIN Y REGISTRO: acceso público
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/auth/login",
                                "/api/v1/auth/register")
                        .permitAll()

                        // CATÁLOGO: cualquier visitante puede consultar
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/productos",
                                "/api/v1/productos/**")
                        .permitAll()

                        // CATEGORÍAS: consulta pública
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**")
                        .permitAll()

                        // USUARIOS: solo el administrador
                        .requestMatchers(
                                "/api/v1/usuarios",
                                "/api/v1/usuarios/**")
                        .hasRole("ADMINISTRADOR")

                        // PRODUCTOS: solo administrador puede modificar
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/productos",
                                "/api/v1/productos/**")
                        .hasRole("ADMINISTRADOR")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/productos",
                                "/api/v1/productos/**")
                        .hasRole("ADMINISTRADOR")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/productos",
                                "/api/v1/productos/**")
                        .hasRole("ADMINISTRADOR")

                        // CATEGORÍAS: solo administrador modifica
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**")
                        .hasRole("ADMINISTRADOR")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**")
                        .hasRole("ADMINISTRADOR")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**")
                        .hasRole("ADMINISTRADOR")

                        // ÓRDENES: administrador y vendedor pueden consultar
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/boletas",
                                "/api/v1/boletas/**")
                        .hasAnyRole("ADMINISTRADOR", "VENDEDOR")

                        // COMPRAS: administrador y cliente pueden comprar
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/boletas",
                                "/api/v1/boletas/**")
                        .hasAnyRole("ADMINISTRADOR", "CLIENTE")

                        // DETALLE DE ÓRDENES: solo lectura
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/detalles",
                                "/api/v1/detalles/**")
                        .hasAnyRole("ADMINISTRADOR", "VENDEDOR")

                        // Documentación Swagger
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/api-docs",
                                "/api-docs/**",
                                "/v3/api-docs",
                                "/v3/api-docs/**")
                        .permitAll()

                        // Permitir que Spring devuelva errores HTTP reales
                        .requestMatchers("/error")
                        .permitAll()

                        // Bloquear cualquier acceso no autorizado
                        .anyRequest()
                        .denyAll())

                // Validar el JWT de cada solicitud
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Comunicación entre React y Spring Boot
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173"));

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"));

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration);

        return source;
    }
}
