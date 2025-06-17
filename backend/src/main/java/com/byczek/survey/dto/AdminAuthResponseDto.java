package com.byczek.survey.dto;

public class AuthAdminResponseDto {

    private String token;

    public AuthAdminResponseDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
