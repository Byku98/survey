package com.byczek.survey.dto;

public class AuthParticipantResponseDto {

    private String token;

    public AuthParticipantResponseDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
