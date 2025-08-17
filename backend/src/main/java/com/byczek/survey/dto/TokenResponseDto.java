package com.byczek.survey.dto;

public class ParticipantAuthResponseDto {

    private String token;

    public ParticipantAuthResponseDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
