package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.GuideUseCase;
import com.ismael.localguide.application.ReservationUseCase;
import com.ismael.localguide.domain.Tourist;
import com.ismael.localguide.domain.dto.*;
import com.ismael.localguide.infrastructure.rest.mapper.TouristMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ismael.localguide.application.TouristUseCase;

import java.util.*;

@RestController
@RequestMapping("/tourist")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 3600, allowCredentials = "true")
public class TouristController {

    @Autowired
    private TouristUseCase touristService;
    @Autowired
    private GuideUseCase guideService;
    @Autowired
    private TouristMapper touristMapper;
    @Autowired
    private ReservationUseCase reservationService;

    @PostMapping("v1/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        try {
            TouristDataDTO foundTurist = touristMapper.toDto(touristService.findByEmailAndPassword(email, password));
            if (foundTurist != null) {
                return ResponseEntity.ok(foundTurist);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró ningún turista con las credenciales dadas");
        }
    }

    @PostMapping("v1/create")
    public ResponseEntity<?> createTourist(@Valid @RequestBody Tourist tourist) {
        try {
            // Verificar si el guía ya existe en la base de datos
            if (touristService.findByEmail(tourist.getEmail()).isPresent() || guideService.findByEmail(tourist.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe.");
            }

            Tourist newTourist = touristService.save(tourist);
            return ResponseEntity.status(HttpStatus.CREATED).body(newTourist);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el turista: " + e.getMessage());
        }
    }

    @PutMapping("v1/update")
    public ResponseEntity<?> updateTourist(@Valid @RequestBody Tourist tourist) {
        try {
            // Verificar si el turista ya existe en la base de datos
            Optional<Tourist> existingTouristOptional = touristService.findByEmail(tourist.getEmail());
            if (existingTouristOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El turista no existe.");
            }
            // Obtener el turista existente de la base de datos
            Tourist existingTourist = existingTouristOptional.get();

            // Actualizar los campos del turista existente con los proporcionados en el cuerpo de la solicitud
            existingTourist.setName(tourist.getName());
            existingTourist.setSurname(tourist.getSurname());
            existingTourist.setEmail(tourist.getEmail());
            existingTourist.setPassword(tourist.getPassword());
            existingTourist.setCountry(tourist.getCountry());
            existingTourist.setCity(tourist.getCity());
            existingTourist.setPhone(tourist.getPhone());
            existingTourist.setGender(tourist.getGender());
            existingTourist.setProfileImg(tourist.getProfileImg());

            // Guardar el turista actualizado en la base de datos
            Tourist savedTourist = touristService.save(existingTourist);

            return ResponseEntity.ok(savedTourist);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el turista: " + e.getMessage());
        }
    }

    @GetMapping(value = "v1/listTourists")
    public ResponseEntity<?> findAll() {
        try {
            List<Tourist> tourists = touristService.findAll();
            List<TouristDataDTO> touristDTOs = new ArrayList<>();
            for (Tourist tourist : tourists) {
                touristDTOs.add(touristMapper.toDto(tourist));
            }
            return ResponseEntity.ok(touristDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al recuperar los datos de los turistas: " + e.getMessage());
        }
    }

    @GetMapping("v1/activeReservation/{touristId}")
    public ResponseEntity<List<ActiveReservationTouristDTO>> getActiveReservations(@PathVariable Long touristId) {
        try {
            List<ActiveReservationTouristDTO> activeReservations = reservationService.activeReservationTourist(touristId);
            return ResponseEntity.ok(activeReservations);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("v1/pastReservation/{touristId}")
    public ResponseEntity<List<PastReservationTouristDTO>> getPastReservations(@PathVariable Long touristId) {
        try {
            List<PastReservationTouristDTO> pastReservations = reservationService.pastReservationTourist(touristId);
            return ResponseEntity.ok(pastReservations);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}