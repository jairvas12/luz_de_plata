package cl.luzdeplata.backend.config;

import java.util.List;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import cl.luzdeplata.backend.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
        JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
            jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity http
    ) throws Exception {

        http
            .cors(cors -> {})
            .csrf(
                csrf ->
                    csrf.disable()
            )

            .sessionManagement(
                session ->
                    session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                    )
            )

            .authorizeHttpRequests(
                auth -> auth

                    .requestMatchers(
                        HttpMethod.POST,
                        "/api/v1/auth/login",
                        "/api/v1/auth/register"
                    )
                    .permitAll()

                    .requestMatchers(
                        HttpMethod.GET,
                        "/api/v1/productos/**"
                    )
                    .permitAll()

                    .requestMatchers(
                        HttpMethod.GET,
                        "/api/v1/categorias/**"
                    )
                    .permitAll()

                    .requestMatchers(
                        "/api/v1/usuarios/**"
                    )
                    .hasRole(
                        "ADMINISTRADOR"
                    )

                    .requestMatchers(
                        HttpMethod.POST,
                        "/api/v1/productos/**"
                    )
                    .hasAnyRole(
                        "ADMINISTRADOR",
                        "VENDEDOR"
                    )

                    .requestMatchers(
                        HttpMethod.PUT,
                        "/api/v1/productos/**"
                    )
                    .hasAnyRole(
                        "ADMINISTRADOR",
                        "VENDEDOR"
                    )

                    .requestMatchers(
                        HttpMethod.DELETE,
                        "/api/v1/productos/**"
                    )
                    .hasAnyRole(
                        "ADMINISTRADOR",
                        "VENDEDOR"
                    )

                    .requestMatchers(
                        HttpMethod.POST,
                        "/api/v1/categorias/**"
                    )
                    .hasRole(
                        "ADMINISTRADOR"
                    )

                    .requestMatchers(
                        HttpMethod.PUT,
                        "/api/v1/categorias/**"
                    )
                    .hasRole(
                        "ADMINISTRADOR"
                    )

                    .requestMatchers(
                        HttpMethod.DELETE,
                        "/api/v1/categorias/**"
                    )
                    .hasRole(
                        "ADMINISTRADOR"
                    )

                    .requestMatchers(
                        HttpMethod.GET,
                        "/api/v1/boletas/**"
                    )
                    .hasAnyRole(
                        "ADMINISTRADOR",
                        "VENDEDOR"
                    )

                    .requestMatchers(
                        HttpMethod.POST,
                        "/api/v1/boletas/**"
                    )
                    .hasAnyRole(
                        "ADMINISTRADOR",
                        "CLIENTE"
                    )

                    .requestMatchers(
                        "/api/v1/detalles/**"
                    )
                    .hasAnyRole(
                        "ADMINISTRADOR",
                        "VENDEDOR"
                    )

                    .anyRequest()
                    .authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
            new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of(
                "http://localhost:5173"
            )
        );

        configuration.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            )
        );

        configuration.setAllowedHeaders(
            List.of(
                "Authorization",
                "Content-Type"
            )
        );

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}