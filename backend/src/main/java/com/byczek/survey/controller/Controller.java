package com.byczek.survey.controller;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Duration;
import java.util.Date;

import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

    private final String secretKey = "182934h7sbd41342342534523423235fvcgsdfgsfdg7393554hASd7"; // Use a secure key

    @PostMapping("/survey")
    public String test(){
        return "asb";
    }

    @PostMapping("/responder/login")
    public ResponseEntity<String> responderLogin(@RequestBody String googleToken) {

        System.out.println(googleToken);

        // Create JWT token valid for 5 minutes
        String jwt = Jwts.builder()
                .setSubject("user@example.com")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) // 10 minutes
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        // Create HttpOnly cookie with the JWT
        ResponseCookie cookie = ResponseCookie.from("token", jwt)
                .httpOnly(true)          // Prevent JS access
                .secure(false)            // Only send over HTTPS (set false if testing locally without HTTPS)
                .path("/")               // Cookie available on all paths
                .maxAge(Duration.ofMinutes(10))  // Expire in 5 minutes
                .sameSite("Strict")      // CSRF protection
                .build();

        // Return the cookie in the response headers
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged in");
    }

    @PostMapping("/admin/auth")
    public ResponseEntity<String> authUser(){
        System.out.println("1234");
        return ResponseEntity.ok("1234");
    }

    @GetMapping("/admin/auth")
    public String authGetUser(){
        System.out.println("1234");
        return "1234";
    }

}
