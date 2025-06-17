package com.byczek.survey.services;

import com.byczek.survey.dao.AdminRepository;
import com.byczek.survey.dto.AdminAuthRequestDto;
import com.byczek.survey.dto.AdminAuthResponseDto;
import com.byczek.survey.entity.AdminEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class AdminAuthService {

    private AdminRepository adminRepository;

    @Autowired
    public AdminAuthService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public AdminAuthResponseDto authAdmin(AdminAuthRequestDto authAdminRequest) {

        Optional<AdminEntity> adminData = adminRepository.findByUsername(authAdminRequest.getUsername());

        if (adminData.isPresent()) {
            AdminEntity admin = adminData.get();
        } else {
            return null;
        }

        if (authAdminRequest.getPassword() == authAdminRequest.getPassword()) {
            return new AdminAuthResponseDto("1234");
        }

        return null;
    }

}
