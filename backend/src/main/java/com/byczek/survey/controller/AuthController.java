package com.byczek.survey.controller;

import com.byczek.survey.dto.AdminAuthRequestDto;
import com.byczek.survey.dto.TokenResponseDto;
import com.byczek.survey.services.AdminJWTService;
import com.byczek.survey.services.AdminRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    //variables
    //@Value("${jwt.secret}")
    //private String secretKey;
    private AdminRegisterService adminRegisterService;
    private AdminJWTService adminJWTService;

    @Autowired
    public AuthController(AdminRegisterService adminRegisterService, AdminJWTService adminJWTService) {
        this.adminRegisterService = adminRegisterService;
        this.adminJWTService = adminJWTService;
    }

    @PostMapping("/admin/auth")
    public ResponseEntity<TokenResponseDto> authAdmin(@RequestBody AdminAuthRequestDto authRequest) {

//        AdminAuthResponseDto adminAuthResponseDto = adminJWTService.authAdmin(authRequest);
        TokenResponseDto tokenResponseDto = adminJWTService.authAdmin(authRequest);

        return ResponseEntity.ok(tokenResponseDto);
    }

    @GetMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestParam String username, @RequestParam String password) {

        String result = adminRegisterService.registerAdmin(username, password);

        return ResponseEntity.badRequest().body(result);
    }

}
