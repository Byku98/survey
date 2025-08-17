package com.byczek.survey.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="participants")
public class ParticipantEntity implements TokenEntity {


    @Id
    @Column(name = "participant_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer participantId;
    @Column(name = "first_name")
    String firstName;
    @Column(name = "last_name")
    String lastName;
    String email;
    @Column(name = "date_created")
    Date dateCreated;
    @Column(name = "token_value")
    String tokenValue;
    @Column(name = "token_due_date")
    Date dueDate;

    public ParticipantEntity() {
    }

    public ParticipantEntity(String firstName, String lastName, String email, Date dateCreated) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateCreated = dateCreated;
    }

//    public ParticipantEntity(String firstName, String lastName, String email, Date dateCreated) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//    }

    public Integer getParticipantId() {
        return participantId;
    }

    public void setParticipantId(Integer participantId) {
        this.participantId = participantId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public void setTokenValue(String tokenValue) {
        this.tokenValue = tokenValue;
    }

    @Override
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    @Override
    public String getTokenValue() {
        return tokenValue;
    }

    @Override
    public Date getDueDate() {
        return dueDate;
    }

//    public String getTokenValue() {
//        return tokenValue;
//    }
//
//    public void setTokenValue(String tokenValue) {
//        this.tokenValue = tokenValue;
//    }
//
//    public Date getDueDate() {
//        return dueDate;
//    }
//
//    public void setDueDate(Date dueDate) {
//        this.dueDate = dueDate;
//    }
}
