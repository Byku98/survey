package com.byczek.survey.services;

import com.byczek.survey.dao.AdminRepository;
import com.byczek.survey.entity.AdminEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class AdminRegisterService {

    private PasswordEncoder passwordEncoder;
    private AdminRepository adminRepository;

    @Autowired
    public AdminRegisterService(PasswordEncoder passwordEncoder, AdminRepository adminRepository) {
        this.passwordEncoder = passwordEncoder;
        this.adminRepository = adminRepository;
    }

    public AdminRegisterService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String registerAdmin(String username, String password) {

        log.info(username);
        log.info(password);

        if(adminRepository.findByUsername(username).isPresent()){
            return "Administrator already exists";
        } else{
            String hashedPassword = passwordEncoder.encode(password);
            AdminEntity newAdmin = new AdminEntity(username, hashedPassword);
            adminRepository.save(newAdmin);
        }

        return "New Admin "+username+" added";

    }


}
