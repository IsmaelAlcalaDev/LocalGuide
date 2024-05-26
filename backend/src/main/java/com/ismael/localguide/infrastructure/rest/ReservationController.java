package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.RecentReservationUseCase;
import com.ismael.localguide.application.ReservationUseCase;
import com.ismael.localguide.application.TransactionUseCase;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.Transaction;
import com.ismael.localguide.domain.dto.RecentReservationsDTO;
import com.ismael.localguide.domain.dto.ReservationDTO;
import com.ismael.localguide.domain.dto.TransactionDTO;
import com.ismael.localguide.infrastructure.rest.mapper.ReservationMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
            transactionService.processTransaction(dataReservation, reservation);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "La reserva se ha procesado correctamente");
            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", "Error al procesar la reserva: " + e.getMessage()));
        }
    }

    @GetMapping(value = "v1/listReservations")
    public ResponseEntity<?> findAll() {
        try {
            List<Reservation> reservations = reservationService.findAll();
            List<ReservationDTO> reservationDTOs = reservations.stream()
                    .map(reservationMapper::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(reservationDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al recuperar los datos de las transacciones: " + e.getMessage());
        }
    }

}
