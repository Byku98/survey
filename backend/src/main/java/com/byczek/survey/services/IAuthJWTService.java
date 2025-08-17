package com.byczek.survey.services;

import org.springframework.http.ResponseEntity;

public interface IAuthJWTService<T> {

    String generateJWT(T entity);

    ResponseEntity<Void> validateJWT(String token);

    ResponseEntity<Void> deleteJWT(String token);

}
