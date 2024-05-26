package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.DashboardUseCase;
import com.ismael.localguide.domain.Administrator;
import com.ismael.localguide.domain.dto.AdministratorDataDTO;
import com.ismael.localguide.domain.dto.GuideDataDTO;
import com.ismael.localguide.infrastructure.rest.mapper.AdministratorMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ismael.localguide.application.AdministratorUseCase;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}, maxAge = 3600, allowCredentials = "true")
public class AdministratorController {

    @Autowired
    private AdministratorUseCase administratorService;
    @Autowired
    private AdministratorMapper administratorMapper;
    @Autowired
    private DashboardUseCase dashboardUseCase;

    @PostMapping("v1/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        try {
            AdministratorDataDTO administrator = administratorMapper.toDto(
                    administratorService.findByEmailAndPassword(email, password));
            if (administrator == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El guía no existe.");
            }
            return ResponseEntity.ok(administrator);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al iniciar sesión: " + e.getMessage());
        }
    }

    @GetMapping("v1/kpis")
    public ResponseEntity<?> getKpis() {
        try {
            return ResponseEntity.ok(dashboardUseCase.getDashboardKpis());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al obtener los KPIs: " + e.getMessage());
        }
    }
}
