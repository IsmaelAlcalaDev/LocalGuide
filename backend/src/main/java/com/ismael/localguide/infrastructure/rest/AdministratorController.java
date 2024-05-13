package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.domain.Administrator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ismael.localguide.application.AdministratorUseCase;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
//El versionado entra en el controlador o en los endpoints, lo mas normal es en los endPoints
public class AdministratorController {

    @Autowired
    private AdministratorUseCase administratorService;

    @GetMapping("/v1/email/{email}")
    public Administrator searchByEmail(@PathVariable final String email) {
        Optional<Administrator> administrator = this.administratorService.findByEmail(email);
        return administrator.get();
    }
}
