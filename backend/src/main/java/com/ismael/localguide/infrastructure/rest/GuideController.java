package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.ReservationUseCase;
import com.ismael.localguide.application.TouristUseCase;
import com.ismael.localguide.domain.Gender;
import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.dto.*;
import com.ismael.localguide.infrastructure.rest.mapper.GuideMapper;
import com.ismael.localguide.infrastructure.rest.mapper.SearchGuideFilterMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ismael.localguide.application.GuideUseCase;

import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private ReservationUseCase reservationService;
    @Autowired
    private SearchGuideFilterMapper searchGuideFilterMapper;

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

    @GetMapping(value = "v1/listGuides")
    public ResponseEntity<?> findAll() {
        try {
            List<Guide> guides = guideService.findAll();
            List<GuideDataDTO> touristDTOs = new ArrayList<>();
            for (Guide guide : guides) {
                touristDTOs.add(guideMapper.toDto(guide));
            }
            return ResponseEntity.ok(touristDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al recuperar los datos de los turistas: " + e.getMessage());
        }
    }

    @GetMapping("v1/activeReservation/{guideId}")
    public ResponseEntity<List<ActiveReservationGuideDTO>> getActiveReservations(@PathVariable Long guideId) {
        try {
            List<ActiveReservationGuideDTO> activeReservations = reservationService.activeReservationGuide(guideId);
            return ResponseEntity.ok(activeReservations);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("v1/pastReservation/{guideId}")
    public ResponseEntity<List<PastGuideReservationsDTO>> getPastReservations(@PathVariable Long guideId) {
        try {
            List<PastGuideReservationsDTO> pastReservations = reservationService.pastReservationGuide(guideId);
            return ResponseEntity.ok(pastReservations);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("v1/summaryReservation/{guideId}")
    public ResponseEntity<SummaryReservationsDTO> summaryReservations(@PathVariable Long guideId) {
        try {
            SummaryReservationsDTO summaryReservations = reservationService.summaryReservations(guideId);
            return ResponseEntity.ok(summaryReservations);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/v1/search")
    public ResponseEntity<List<SearchGuideFilterDTO>> searchGuideFilter(
            @RequestParam(required = false) String guideName,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) List<String> languages,
            @RequestParam(required = false) List<String> hobbies,
            @RequestParam(required = false) String priceMax,
            @RequestParam(required = false) String priceMin,
            @RequestParam(required = false) Gender gender) {
        try {
            Integer minPrice = null;
            Integer maxPrice = null;
            if (priceMin != null && !priceMin.equals("null")) {
                minPrice = Integer.parseInt(priceMin);
            }
            if (priceMax != null && !priceMax.equals("null")) {
                maxPrice = Integer.parseInt(priceMax);
            }

            List<Guide> guides = guideService.searchGuideFilter(guideName, country, city, languages, hobbies, minPrice, maxPrice, gender);
            List<SearchGuideFilterDTO> searchGuideFilterDTOs = guides.stream()
                    .map(guide -> {
                        try {
                            int totalReservations = guideService.calculateTotalReservations(guide);
                            double averageScore = guideService.calculateAverageScore(guide); // Corrección: coincide con el frontend
                            return searchGuideFilterMapper.toDto(guide, totalReservations, (int) averageScore);
                        } catch (Exception e) {
                            e.printStackTrace();
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(searchGuideFilterDTOs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}










