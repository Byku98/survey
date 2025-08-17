package com.byczek.survey.controller;

import com.byczek.survey.dto.AdminAuthRequestDto;
import com.byczek.survey.dto.AdminAuthResponseDto;
import com.byczek.survey.services.AdminAuthService;
import com.byczek.survey.services.AdminRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    //variables
    //@Value("${jwt.secret}")
    //private String secretKey;
    private AdminRegisterService adminRegisterService;
    private AdminAuthService adminAuthService;

    @Autowired
    public AuthController(AdminRegisterService adminRegisterService, AdminAuthService adminAuthService) {
        this.adminRegisterService = adminRegisterService;
        this.adminAuthService = adminAuthService;
    }

    @PostMapping("/responder/auth")
    public ResponseEntity<AdminAuthResponseDto> responderLogin(@RequestBody String googleToken) {

        System.out.println(googleToken);
        return ResponseEntity.ok(new AdminAuthResponseDto("1234"));

    }

    @PostMapping("/admin/auth")
    public ResponseEntity<AdminAuthResponseDto> authAdmin(@RequestBody AdminAuthRequestDto authRequest) {

        AdminAuthResponseDto response = adminAuthService.authAdmin(authRequest);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestParam String username, @RequestParam String password) {

        String result = adminRegisterService.registerAdmin(username, password);

        return ResponseEntity.badRequest().body(result);
    }

}
