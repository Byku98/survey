package com.byczek.survey.entity;
import java.util.Date;

public interface TokenEntity {

    void setTokenValue(String tokenValue);
    String getTokenValue();
    void setDueDate(Date dueDate);
    Date getDueDate();

}
