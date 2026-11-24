
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

    // Cifrar contraseñas con BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Configuración principal de seguridad
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .cors(cors -> {
                })
                .csrf(csrf -> csrf.disable())

                // Autenticación JWT sin sesiones de servidor
                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // LOGIN Y REGISTRO PÚBLICOS
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/auth/login",
                                "/api/v1/auth/register")
                        .permitAll()

                        // CATÁLOGO PÚBLICO
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/productos",
                                "/api/v1/productos/**")
                        .permitAll()

                        // CATEGORÍAS PÚBLICAS
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**")
                        .permitAll()

                        // USUARIOS: SOLO ADMINISTRADOR
                        .requestMatchers(
                                "/api/v1/usuarios",
                                "/api/v1/usuarios/**")
                        .hasRole("ADMINISTRADOR")

                        // MODIFICAR PRODUCTOS: SOLO ADMINISTRADOR
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

                        // MODIFICAR CATEGORÍAS: SOLO ADMINISTRADOR
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

                        // MIS COMPRAS: USUARIO AUTENTICADO
                        // IMPORTANTE: estas reglas deben ir ANTES
                        // de las reglas generales de boletas.
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/boletas/mis",
                                "/api/v1/boletas/mis/**")
                        .authenticated()

                        // TODAS LAS ÓRDENES:
                        // ADMINISTRADOR Y VENDEDOR
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/boletas",
                                "/api/v1/boletas/**")
                        .hasAnyRole(
                                "ADMINISTRADOR",
                                "VENDEDOR")

                        // CREAR COMPRAS:
                        // ADMINISTRADOR Y CLIENTE
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/boletas",
                                "/api/v1/boletas/**")
                        .hasAnyRole(
                                "ADMINISTRADOR",
                                "CLIENTE")

                        // DETALLES: SOLO CONSULTA
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/detalles",
                                "/api/v1/detalles/**")
                        .hasAnyRole(
                                "ADMINISTRADOR",
                                "VENDEDOR")

                        // DOCUMENTACIÓN SWAGGER
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/api-docs",
                                "/api-docs/**",
                                "/v3/api-docs",
                                "/v3/api-docs/**")
                        .permitAll()

                        // RESPUESTAS DE ERROR
                        .requestMatchers("/error")
                        .permitAll()

                        // DENEGAR OTRAS OPERACIONES
                        .anyRequest()
                        .denyAll())

                // Validación del token JWT
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Permitir conexión desde React
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
