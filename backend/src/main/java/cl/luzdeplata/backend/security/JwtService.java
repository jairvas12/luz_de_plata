package cl.luzdeplata.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.entity.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    public String generarToken(
        Usuario usuario
    ) {

        Date fechaActual =
            new Date();

        Date fechaExpiracion =
            new Date(
                fechaActual.getTime()
                + jwtExpirationMs
            );

        return Jwts
            .builder()
            .subject(
                usuario.getEmail()
            )
            .claim(
                "rol",
                usuario
                    .getRol()
                    .name()
            )
            .issuedAt(
                fechaActual
            )
            .expiration(
                fechaExpiracion
            )
            .signWith(
                obtenerClave()
            )
            .compact();
    }

    public String obtenerEmail(
        String token
    ) {

        return obtenerClaims(token)
            .getSubject();
    }

    public String obtenerRol(
        String token
    ) {

        return obtenerClaims(token)
            .get(
                "rol",
                String.class
            );
    }

    public boolean validarToken(
        String token
    ) {

        try {

            obtenerClaims(token);

            return true;

        } catch (JwtException e) {

            return false;

        } catch (IllegalArgumentException e) {

            return false;
        }
    }

    private Claims obtenerClaims(
        String token
    ) {

        return Jwts
            .parser()
            .verifyWith(
                obtenerClave()
            )
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey obtenerClave() {

        byte[] claveBytes =
            Decoders
                .BASE64
                .decode(jwtSecret);

        return Keys.hmacShaKeyFor(
            claveBytes
        );
    }
}