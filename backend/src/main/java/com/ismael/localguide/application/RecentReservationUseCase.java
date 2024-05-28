package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.ReservationRepository;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.ReservationStatus;
import com.ismael.localguide.domain.dto.RecentReservationsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RecentReservationUseCase {

    private final ReservationRepository reservationRepository;

    public List<RecentReservationsDTO> getRecentReservations() {

        ReservationStatus status = ReservationStatus.ACEPTADA;
        List<Reservation> recentReservations = reservationRepository.
                findFirst6ByStatusAndReviewIsNotNullAndReviewScoreGreaterThanEqualOrderByReservedHoursDesc(status, 3);

        return recentReservations.stream()
                .map(this::mapReservationToDTO)
                .collect(Collectors.toList());
    }

    private RecentReservationsDTO mapReservationToDTO(Reservation reservation) {
        RecentReservationsDTO dto = new RecentReservationsDTO();
        dto.setGuideName(reservation.getGuide().getName());
        dto.setTouristName(reservation.getTourist().getName());
        dto.setCountry(reservation.getTourist().getCountry());
        dto.setCity(reservation.getTourist().getCity());
        dto.setProfileImgGuide(reservation.getGuide().getProfileImg());
        dto.setProfileImgTourist(reservation.getTourist().getProfileImg());
        dto.setReview(reservation.getReview());
        dto.setReviewScore(reservation.getReviewScore());
        return dto;
    }
}
