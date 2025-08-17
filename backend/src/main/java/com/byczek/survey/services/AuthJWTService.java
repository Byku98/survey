package com.byczek.survey.services;

import com.byczek.survey.entity.TokenEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;


@Slf4j
@Service
public class AuthJWTService {

    @Autowired
    public AuthJWTService() {
    }

    public <T extends TokenEntity, ID> ResponseEntity<Void> deleteJwtGeneric(String token, JpaRepository<T, ID> repository, Function<String, Optional<T>> findByTokenFunc) {

        Optional<T> entityData = findByTokenFunc.apply(token);

        if (entityData.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        try {
            T entity = entityData.get();
            entity.setTokenValue(null);
            entity.setDueDate(null);
            repository.save(entity);
            return ResponseEntity.ok().build();
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    public <T extends TokenEntity, ID> ResponseEntity<Void> validateJwtGeneric(String token, JpaRepository<T, ID> repository, Function<String, Optional<T>> findByTokenFunc) {

        Optional<T> entityData = findByTokenFunc.apply(token);

        if (entityData.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok().build();

    }

}