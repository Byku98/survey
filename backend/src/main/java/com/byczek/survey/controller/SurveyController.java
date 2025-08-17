package com.byczek.survey.controller;

import com.byczek.survey.dto.ParticipantAuthRequestDto;
import com.byczek.survey.dto.TokenResponseDto;
import com.byczek.survey.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ParticipantController {

//    variables
//    @Value("${jwt.secret}")
//    private String secretKey;
    private ParticipantJWTService participantJWTService;
    private AuthJWTService authJWTService;


    @Autowired
    public ParticipantController(ParticipantJWTService participantJWTService) {
        this.participantJWTService = participantJWTService;
    }

    @PostMapping("/responder/auth")
    public ResponseEntity<TokenResponseDto> participantLogin(@RequestBody ParticipantAuthRequestDto googleTokenRequest) {
        
        TokenResponseDto tokenResponseDto = participantJWTService.authParticipant(googleTokenRequest.getIdToken());

        return ResponseEntity.ok(tokenResponseDto);

    }

    @PostMapping("/responder/logout")
    public ResponseEntity<Void> participantLogout(@RequestBody ParticipantAuthRequestDto tokenRequest) {

        return participantJWTService.deleteJWT(tokenRequest.getIdToken());

    }

    @PostMapping("/validateToken")
    public ResponseEntity<Void> validateToken(@RequestBody ParticipantAuthRequestDto tokenRequest) {

        return participantJWTService.validateJWT(tokenRequest.getIdToken());

    }

}
