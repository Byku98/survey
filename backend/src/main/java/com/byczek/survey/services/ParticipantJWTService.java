package com.byczek.survey.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.byczek.survey.dao.ParticipantRepository;
import com.byczek.survey.dto.ParticipantAuthResponseDto;
import com.byczek.survey.dto.ParticipantDto;
import com.byczek.survey.entity.ParticipantEntity;
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
public class ParticipantAuthJWTService implements IAuthJWTService<ParticipantEntity> {

    private ParticipantRepository participantRepository;
    private String jwtSecret;
    private final Key jwtKey;

    @Autowired
    public ParticipantAuthJWTService(@Value("${jwt.secret}") String jwtSecret, ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
        this.jwtSecret = jwtSecret;
        this.jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Authenticate user and register it if it wasn't in the platform
     *
     * @param userGoogleJwt
     */
    public ParticipantAuthResponseDto authParticipant(String userGoogleJwt) {

        ParticipantEntity participantEntity;
        ParticipantDto participantDto = decodeToken(userGoogleJwt);
        Optional<ParticipantEntity> participantData = participantRepository.findByEmail(participantDto.getEmail());
        Date now = new Date();
        String token;

        if (participantData.isPresent()) {
            participantEntity = participantData.get();
            token = generateJWT(participantEntity);
        } else {

            participantEntity = new ParticipantEntity(
                    participantDto.getFirstName(),
                    participantDto.getLastName(),
                    participantDto.getEmail(),
                    now
            );

            token = generateJWT(participantEntity);
        }

        log.info("Participant token generated: " + token);

        ParticipantAuthResponseDto participantAuthResponseDto = new ParticipantAuthResponseDto(token);

        return participantAuthResponseDto;

    }

    /**
     *
     * @param userGoogleJwt
     * @return
     */
    private ParticipantDto decodeToken(String userGoogleJwt) {

        ParticipantDto participantDto = new ParticipantDto();
        DecodedJWT decodedJWT = JWT.decode(userGoogleJwt);

        participantDto.setFirstName(decodedJWT.getClaim("given_name").asString());
        participantDto.setLastName(decodedJWT.getClaim("family_name").asString());
        participantDto.setEmail(decodedJWT.getClaim("email").asString());

        return participantDto;

    }

    /**
     *
     * @param participantEntity
     * @return
     */
    @Override
    public String generateJWT(ParticipantEntity participantEntity) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + 15 * 60 * 1000); // set timeout to 15 minutes

        String newJwtToken = Jwts.builder().setSubject(participantEntity.getEmail())
                .claim("participantId", participantEntity.getParticipantId())
                .claim("firstName", participantEntity.getFirstName())
                .claim("lastName", participantEntity.getLastName())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(jwtKey, SignatureAlgorithm.HS256)
                .compact();

        participantEntity.setTokenValue(newJwtToken);
        participantEntity.setDueDate(expiry);

        log.info(participantEntity.getTokenValue());
//        log.info(participantEntity.getDueDate().toString());
        log.info("Saving participant data");

        participantRepository.save(participantEntity);

        log.info("Participant data saved");

        return newJwtToken;
    }

    /**
     *
     * @param token
     * @return
     */
    @Override
    public ResponseEntity<Void> validateJWT(String token) {

        AuthJWTService authJWTService = new AuthJWTService();

        return authJWTService.validateJwtGeneric(token, participantRepository, participantRepository::findByTokenValue);
    }

    /**
     *
     * @param token
     * @return
     */
    @Override
    public ResponseEntity<Void> deleteJWT(String token) {

        AuthJWTService authJWTService = new AuthJWTService();

        return authJWTService.deleteJwtGeneric(token, participantRepository, participantRepository::findByTokenValue);

    }
}