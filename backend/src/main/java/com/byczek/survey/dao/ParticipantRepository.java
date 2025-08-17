package com.byczek.survey.dao;

import com.byczek.survey.entity.AdminEntity;
import com.byczek.survey.entity.ParticipantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<ParticipantEntity, Integer> {

    Optional<ParticipantEntity> findByEmail(String email);

    Optional<ParticipantEntity> findByTokenValue(String tokenValue);
}
