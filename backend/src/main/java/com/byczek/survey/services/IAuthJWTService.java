package com.byczek.survey.services;

public interface IAuthJWTService<T> {

    String generateJWT(T entity);

    boolean validateJWT();

    boolean deleteJWT();

}
