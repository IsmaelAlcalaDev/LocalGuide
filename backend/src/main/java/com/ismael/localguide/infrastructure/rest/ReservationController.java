package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.RecentReservationUseCase;
import com.ismael.localguide.application.ReservationUseCase;
import com.ismael.localguide.application.TransactionUseCase;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.*;
import com.ismael.localguide.infrastructure.rest.mapper.ReservationMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ReviewsGuideMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ReviewsTouristMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservation")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}, maxAge = 3600, allowCredentials = "true")
public class ReservationController {

    @Autowired
    private final RecentReservationUseCase recentReservationUseCase;
    @Autowired
    private final ReservationUseCase reservationService;
    @Autowired
    private final TransactionUseCase transactionService;
    @Autowired
    private final ReservationMapper reservationMapper;
    @Autowired
    private final ReviewsGuideMapper reviewsGuideMapper;
    @Autowired
    private final ReviewsTouristMapper reviewsTouristMapper;

    @GetMapping("v1/recent")
    public ResponseEntity<List<RecentReservationsDTO>> getRecentReservations() {
        List<RecentReservationsDTO> recentReservations = recentReservationUseCase.getRecentReservations();
        if (recentReservations.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok(recentReservations);
    }

    @PostMapping("/v1/process")
    public ResponseEntity<Map<String, String>> processReservation(@RequestBody Map<String, Object> dataReservation) {
        try {
            Reservation reservation = reservationService.processReservation(dataReservation);
            System.out.println("ha llegado hasta aquí");
            transactionService.processTransaction(dataReservation, reservation);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "La reserva se ha procesado correctamente");
            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Error al procesar la reserva: " + e.getMessage()));
        }
    }

    @GetMapping(value = "v1/listReservations")
    public ResponseEntity<?> listReservation() {
        try {
            List<Reservation> reservations = reservationService.listReservation();
            List<ReservationDTO> reservationDTOs = reservations.stream()
                    .map(reservationMapper::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(reservationDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al recuperar los datos de las transacciones: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "v1/delete/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable final Long id) {
        try {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok().build(); // Devuelve una respuesta vacía con estado 200 OK
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la reserva: " + e.getMessage());
        }
    }

    @PutMapping("/v1/leaveReview/{reservationId}")
    public ResponseEntity<?> leaveReview(
            @PathVariable Long reservationId,
            @RequestBody Map<String, Object> reviewMap) {
        try {
            String review = (String) reviewMap.get("review");
            Integer score = (Integer) reviewMap.get("score");
            reservationService.leaveReview(reservationId, review, score);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save review");
        }
    }

    @GetMapping("v1/reviewsGuide/{guideId}")
    public ResponseEntity<List<ReviewsDTO>> getGuideReviews(@PathVariable Long guideId) {
        System.out.println("Fetching reviews for guideId: " + guideId);
        List<Reservation> reservations = reservationService.getReviewsByGuideId(guideId);
        if (reservations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<ReviewsDTO> reviewsDTOList = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReviewsDTO reviewsDTO = reviewsGuideMapper.toDTO(reservation);
            reviewsDTOList.add(reviewsDTO);
        }
        return ResponseEntity.ok(reviewsDTOList);
    }


    @GetMapping("v1/reviewsTourist/{touristId}")
    public ResponseEntity<List<ReviewsDTO>> getTouristReviews(@PathVariable Long touristId) {
        List<Reservation> reservations = reservationService.getReviewsByTouristId(touristId);
        if (reservations.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<ReviewsDTO> reviewsDTOList = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReviewsDTO reviewsDTO = reviewsTouristMapper.toDTO(reservation);
            reviewsDTOList.add(reviewsDTO);
        }
        return ResponseEntity.ok(reviewsDTOList);
    }
}
