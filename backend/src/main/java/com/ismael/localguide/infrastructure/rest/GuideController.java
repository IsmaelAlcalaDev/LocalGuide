package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.TouristUseCase;
import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.Tourist;
import com.ismael.localguide.domain.dto.GuideDataDTO;
import com.ismael.localguide.domain.dto.GuideInformationDTO;
import com.ismael.localguide.domain.dto.TopRatedGuidesDTO;
import com.ismael.localguide.infrastructure.rest.mapper.GuideMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ismael.localguide.application.GuideUseCase;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/guide")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}, maxAge = 3600, allowCredentials = "true")
public class GuideController {

    @Autowired
    private GuideUseCase guideService;
    @Autowired
    private TouristUseCase touristService;
    @Autowired
    private GuideMapper guideMapper;

    @PostMapping("v1/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        try {
            GuideDataDTO guide = guideMapper.toDto(guideService.login(email, password));

            if (guide == null) {
                // No se encontró el guía
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El guía no existe.");
            }
            return ResponseEntity.ok(guide);
        } catch (Exception e) {
            // Error interno del servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al iniciar sesión: " + e.getMessage());
        }
    }

    @PostMapping("v1/create")
    public ResponseEntity<?> createGuide(@Valid @RequestBody Guide guide) {
        try {
            // Verificar si el guía ya existe en la base de datos
            if (guideService.findByEmail(guide.getEmail()).isPresent() || touristService.findByEmail(guide.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El guía ya existe.");
            }

            Guide newGuide = guideService.save(guide);
            return ResponseEntity.status(HttpStatus.CREATED).body(newGuide);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró ningún turista con las credenciales dadas");
        }
    }

    @PutMapping(value = "v1/update/{id}")
    public ResponseEntity<?> updateGuide(@PathVariable final Long id, @RequestBody final Map<String, Object> data) {
        GuideDataDTO guide = guideMapper.toDto(this.guideService.updateGuide(id, data).get()) ;
        try {
            if (guide == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El guía no existe.");
            }
            return ResponseEntity.ok(guide);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar el guía: " + e.getMessage());
        }
    }
    @GetMapping (value = "v1/top-rated")
    public ResponseEntity<List<TopRatedGuidesDTO>> getTopRatedGuides() {
        List<TopRatedGuidesDTO> topRatedGuides = guideService.getTopRatedGuides();
        return new ResponseEntity<>(topRatedGuides, HttpStatus.OK);
    }

    @GetMapping(value = "v1/detail/{id}")
    public ResponseEntity<?> getGuideDetail(@PathVariable final Long id) {
        GuideInformationDTO guide = guideService.getGuideDetails(id);
        if (guide == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El guía no existe.");
        } else {
            return ResponseEntity.ok(guide);
        }
    }
}