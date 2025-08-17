package com.byczek.survey.dto;

import java.util.Date;

public class SurveysDto {

    private String openName;
    private String[] checkboxAnswers;
    private String openAnswer;
    private String radioAnswer;
    private Date date;

    public String getOpenName() {
        return openName;
    }

    public void setOpenName(String openName) {
        this.openName = openName;
    }

    public String[] getCheckboxAnswers() {
        return checkboxAnswers;
    }

    public void setCheckboxAnswers(String[] checkboxAnswers) {
        this.checkboxAnswers = checkboxAnswers;
    }

    public String getOpenAnswer() {
        return openAnswer;
    }

    public void setOpenAnswer(String openAnswer) {
        this.openAnswer = openAnswer;
    }

    public String getRadioAnswer() {
        return radioAnswer;
    }

    public void setRadioAnswer(String radioAnswer) {
        this.radioAnswer = radioAnswer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
