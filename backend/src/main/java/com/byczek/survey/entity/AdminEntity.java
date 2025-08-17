package com.byczek.survey.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "admins")
public class AdminEntity implements TokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id_user;
    String username;
    String password;
    @Column(name = "token_value")
    String tokenValue;
    @Column(name = "token_due_date")
    Date dueDate;

    public AdminEntity() {
    }

    public AdminEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Integer getId() {
        return id_user;
    }

    public void setId(Integer id_user) {
        this.id_user = id_user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

}
