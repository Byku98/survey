package com.byczek.survey.controller;

import com.byczek.survey.dto.SurveysDto;
import com.byczek.survey.services.AuthJWTService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SurveyController {

//    private AuthJWTService authJWTService;

    @Autowired
    public SurveyController() {

    }

    @PostMapping("/surveys/sendSurvey")
    public ResponseEntity<Void> submitSurvey(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody SurveysDto surveysDto) {

        log.info(authorizationHeader);
        log.info(surveysDto.getOpenName());
        log.info(String.valueOf(surveysDto.getCheckboxAnswers().length));
        log.info(surveysDto.getRadioAnswer());
        log.info(surveysDto.getOpenAnswer());

        return ResponseEntity.ok().build();

    }
}