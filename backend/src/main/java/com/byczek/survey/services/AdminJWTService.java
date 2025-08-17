package com.byczek.survey.services;

import com.byczek.survey.dao.AdminRepository;
import com.byczek.survey.dto.AdminAuthRequestDto;
import com.byczek.survey.dto.TokenResponseDto;
import com.byczek.survey.entity.AdminEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
public class AdminJWTService implements IAuthJWTService<AdminEntity> {

    private String jwtSecret;
    private final Key jwtKey;
    private AdminRepository adminRepository;

    @Autowired
    public AdminJWTService(@Value("${jwt.secret}") String jwtSecret, AdminRepository adminRepository) {

        this.jwtSecret = jwtSecret;
        this.jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        this.adminRepository = adminRepository;

    }

    public TokenResponseDto authAdmin(AdminAuthRequestDto authAdminRequest) {

        Optional<AdminEntity> adminData = adminRepository.findByUsername(authAdminRequest.getUsername());
        AdminEntity adminUser;

        if (adminData.isPresent()) {
            adminUser = adminData.get();
        } else {
            return null;
        }

        if (authAdminRequest.getPassword() == authAdminRequest.getPassword()) {

            String token = generateJWT(adminUser);

            log.info("Newly generated token for user "+adminUser.getUsername()+" is "+token);

            return new TokenResponseDto(token);
        }

        return null;
    }

    @Override
    public String generateJWT(AdminEntity adminEntity) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + 15 * 60 * 1000); // set timeout to 15 minutes

        String newJwtToken = Jwts.builder().setSubject(adminEntity.getUsername())
                .claim("id_user", adminEntity.getId())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(jwtKey, SignatureAlgorithm.HS256)
                .compact();

        adminEntity.setTokenValue(newJwtToken);
        adminEntity.setDueDate(expiry);

        log.info(adminEntity.getTokenValue());
        log.info(adminEntity.getDueDate().toString());

        log.info("Saving token to token table");

        adminRepository.save(adminEntity);

        log.info("Token saved to token table");

        return newJwtToken;
    }
    
    @Override
    public ResponseEntity<Void> validateJWT(String token) {
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> deleteJWT(String token) {

        AuthJWTService authJWTService = new AuthJWTService();

        return authJWTService.deleteJwtGeneric(token, adminRepository, adminRepository::findByTokenValue);

    }

}
