package cl.luzdeplata.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.repository.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UsuarioRepository usuarioRepository;

    public JwtAuthenticationFilter(
        JwtService jwtService,
        UsuarioRepository usuarioRepository
    ) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
            request.getHeader("Authorization");

        if (
            authorizationHeader == null
            || !authorizationHeader.startsWith("Bearer ")
        ) {

            filterChain.doFilter(
                request,
                response
            );

            return;
        }

        String token =
            authorizationHeader.substring(7);

        if (!jwtService.validarToken(token)) {

            filterChain.doFilter(
                request,
                response
            );

            return;
        }

        String email =
            jwtService.obtenerEmail(token);

        Usuario usuario =
            usuarioRepository
                .findByEmail(email)
                .orElse(null);

        if (
            usuario == null
            || !Boolean.TRUE.equals(
                usuario.getActivo()
            )
        ) {

            filterChain.doFilter(
                request,
                response
            );

            return;
        }

        String autoridad =
            "ROLE_" +
            usuario.getRol().name();

        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                usuario.getEmail(),
                null,
                List.of(
                    new SimpleGrantedAuthority(
                        autoridad
                    )
                )
            );

        SecurityContextHolder
            .getContext()
            .setAuthentication(authentication);

        filterChain.doFilter(
            request,
            response
        );
    }
}