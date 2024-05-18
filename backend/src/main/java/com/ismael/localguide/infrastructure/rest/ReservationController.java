package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.RecentReservationUseCase;
import com.ismael.localguide.domain.dto.RecentReservationsDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}, maxAge = 3600, allowCredentials = "true")
public class ReservationController {

    @Autowired
    private final RecentReservationUseCase recentReservationUseCase;

    @GetMapping("v1/recent")
    public ResponseEntity<List<RecentReservationsDTO>> getRecentReservations() {
        List<RecentReservationsDTO> recentReservations = recentReservationUseCase.getRecentReservations();
        if (recentReservations.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok(recentReservations);
    }
}
