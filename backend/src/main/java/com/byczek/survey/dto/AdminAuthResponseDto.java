package com.byczek.survey.dto;

public class AdminAuthResponseDto {

    private String token;

    public AdminAuthResponseDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
