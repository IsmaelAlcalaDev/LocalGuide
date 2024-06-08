package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.GuideRepository;
import com.ismael.localguide.application.repository.repository.ReservationRepository;
import com.ismael.localguide.application.repository.repository.TouristRepository;
import com.ismael.localguide.domain.*;
import com.ismael.localguide.domain.dto.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ReservationUseCase {
    private final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
    @Autowired
    private final ReservationRepository reservationRepository;
    @Autowired
    private final GuideRepository guideRepository;
    @Autowired
    private final TouristRepository touristRepository;

    public Reservation processReservation(Map<String, Object> dataReservation) throws Exception {
        try {
            Boolean isValidate = validationReservation(dataReservation);
            if (!isValidate) {
                throw new Exception("Validation failed");
            }

            Reservation reservation = new Reservation();

            Long guideId = ((Number) dataReservation.get("guide")).longValue();
            Guide guide = guideRepository.findById(guideId).orElse(null);
            if (guide == null) {
                throw new Exception("Guide not found");
            }

            Long touristId = ((Number) dataReservation.get("tourist")).longValue();
            if (touristId == null) {
                throw new Exception("Tourist ID is null");
            }

            Tourist tourist = touristRepository.findById(touristId).orElse(null);
            if (tourist == null) {
                throw new Exception("Tourist not found");
            }

            reservation.setTourist(tourist);
            reservation.setGuide(guide);
            reservation.setReservationDate(LocalDateTime.now());
            reservation.setStatus(ReservationStatus.ACEPTADA);

            String startDateStr = (String) dataReservation.get("startDate");
            String endDateStr = (String) dataReservation.get("endDate");
            DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

            try {
                LocalDateTime startDate = LocalDateTime.parse(startDateStr, formatter);
                LocalDateTime endDate = LocalDateTime.parse(endDateStr, formatter);
                reservation.setStartDate(startDate);
                reservation.setEndDate(endDate);
            } catch (Exception e) {
                throw new Exception("Error parsing date: " + e.getMessage());
            }

            try {
                reservation.setReservedHours(((Number) dataReservation.get("reservedHours")).intValue());
            } catch (Exception e) {
                throw new Exception("Error setting reserved hours: " + e.getMessage());
            }

            try {
                reservation.setPrice(((Number) dataReservation.get("totalPrice")).doubleValue());
            } catch (Exception e) {
                throw new Exception("Error setting price: " + e.getMessage());
            }

            try{
                reservation.setDeleted(false);
            }catch (Exception e){
                throw new Exception("Error setting deleted: " + e.getMessage());
            }

            reservationRepository.save(reservation);
            return reservation;
        } catch (Exception e) {
            throw new Exception("Error processing reservation: " + e.getMessage()); // Lanzar una excepción genérica en caso de cualquier error
        }
    }


    public boolean validationReservation(Map<String, Object> reservation) {
        boolean validation = true;
        double totalPriceReservation;
        double hourlyPrice;
        double reservedHours;
        final double commission = 5;
        double calculateCommission = 0;

        // Obtener el guía
        Long idGuide = ((Number) reservation.get("guide")).longValue();
        System.out.println("idGuide: " + idGuide);
        Guide guide = guideRepository.findById(idGuide).orElse(null);
        System.out.println("guide: aqui hay un guia");

        // Validar si el guía existe
        if (guide == null) {
            validation = false;
            System.out.println("guide: aqui no hay un guia");
            return validation;
        }

        // Validar si los datos recibidos son los esperados
        hourlyPrice = guide.getHourlyPrice();
        System.out.println("hourlyPrice: " + hourlyPrice);
        reservedHours = ((Number) reservation.get("reservedHours")).doubleValue(); // Convertir a double
        System.out.println("reservedHours: " + reservedHours);
        calculateCommission = (hourlyPrice * reservedHours) * commission / 100;
        System.out.println("calculateCommission: " + calculateCommission);
        totalPriceReservation = (hourlyPrice * reservedHours) + calculateCommission;
        System.out.println("totalPriceReservation: " + totalPriceReservation);

        // Verificar si los tipos de datos son compatibles
        double totalPriceFromReservation = ((Number) reservation.get("totalPrice")).doubleValue(); // Convertir a double

        // Comparar los valores con una tolerancia para evitar problemas de precisión
        if (Math.abs(totalPriceReservation - totalPriceFromReservation) > 0.001) {
            validation = false;
            System.out.println("aqui se para: " + totalPriceReservation);
            return validation;
        }
        // Aquí puedes continuar con la lógica de validación y procesamiento adicional
        System.out.println("validation: " + validation);
        return validation;
    }


    public List<Reservation> listReservation() {
        return reservationRepository.findAll();
    }

    public List<ActiveReservationTouristDTO> activeReservationTourist(Long touristId) {
        List<Reservation> activeReservations = reservationRepository.findActiveReservationsTourist(touristId);
        List<ActiveReservationTouristDTO> reservations = new ArrayList<>();

        for (Reservation reservation : activeReservations) {
            ActiveReservationTouristDTO dto = new ActiveReservationTouristDTO();
            dto.setId(reservation.getId());
            dto.setNameGuide(reservation.getGuide().getName());
            dto.setEmailGuide(reservation.getGuide().getEmail());
            dto.setPhoneGuide(reservation.getGuide().getPhone());
            dto.setCountryGuide(reservation.getGuide().getCountry());
            dto.setCityGuide(reservation.getGuide().getCity());
            dto.setReservationDate(reservation.getReservationDate());
            dto.setStartDate(reservation.getStartDate());
            dto.setEndDate(reservation.getEndDate());
            dto.setStatus(reservation.getStatus().toString());
            dto.setReview(reservation.getReview());
            dto.setReviewScore(reservation.getReviewScore());
            dto.setReservedHours(reservation.getReservedHours());
            dto.setPrice(reservation.getPrice());

            reservations.add(dto);
        }
        return reservations;
    }

    public List<ActiveReservationGuideDTO> activeReservationGuide(Long guideId) {
        List<Reservation> activeReservations = reservationRepository.findActiveReservationsGuide(guideId);
        List<ActiveReservationGuideDTO> reservations = new ArrayList<>();

        for (Reservation reservation : activeReservations) {
            ActiveReservationGuideDTO dto = new ActiveReservationGuideDTO();
            dto.setId(reservation.getId());
            dto.setNameTourist(reservation.getTourist().getName());
            dto.setEmailTourist(reservation.getTourist().getEmail());
            dto.setPhoneTourist(reservation.getTourist().getPhone());
            dto.setCountryTourist(reservation.getTourist().getCountry());
            dto.setReservationDate(reservation.getReservationDate());
            dto.setStartDate(reservation.getStartDate());
            dto.setEndDate(reservation.getEndDate());
            dto.setStatus(reservation.getStatus().toString());
            dto.setReview(reservation.getReview());
            dto.setReviewScore(reservation.getReviewScore());
            dto.setReservedHours(reservation.getReservedHours());
            dto.setPrice(reservation.getPrice());

            reservations.add(dto);
        }
        return reservations;
    }

    public List<PastGuideReservationsDTO> pastReservationGuide(Long guideId) {
        List<Reservation> pastReservations = reservationRepository.findPastReservationsGuide(guideId);
        List<PastGuideReservationsDTO> reservations = new ArrayList<>();

        for (Reservation reservation : pastReservations) {
            PastGuideReservationsDTO dto = new PastGuideReservationsDTO();
            dto.setId(reservation.getId());
            dto.setNameTourist(reservation.getTourist().getName());
            dto.setReservationDate(reservation.getReservationDate());
            dto.setStartDate(reservation.getStartDate());
            dto.setEndDate(reservation.getEndDate());
            dto.setReviewScore(reservation.getReviewScore());
            dto.setReservedHours(reservation.getReservedHours());
            dto.setPrice(reservation.getPrice());

            reservations.add(dto);
        }
        return reservations;
    }

    public List<PastReservationTouristDTO> pastReservationTourist(Long touristId) {
        List<Reservation> pastReservations = reservationRepository.findPastReservationsTourist(touristId);
        List<PastReservationTouristDTO> reservations = new ArrayList<>();

        for (Reservation reservation : pastReservations) {
            PastReservationTouristDTO dto = new PastReservationTouristDTO();
            dto.setId(reservation.getId());
            dto.setNameGuide(reservation.getGuide().getName());
            dto.setCountryGuide(reservation.getGuide().getCountry());
            dto.setCityGuide(reservation.getGuide().getCity());
            dto.setReservationDate(reservation.getReservationDate());
            dto.setStartDate(reservation.getStartDate());
            dto.setEndDate(reservation.getEndDate());
            dto.setReviewScore(reservation.getReviewScore());
            dto.setReservedHours(reservation.getReservedHours());
            dto.setPrice(reservation.getPrice());

            reservations.add(dto);
        }
        return reservations;
    }

    public SummaryReservationsDTO summaryReservations(Long guideId) {
        int totalTour = 0;
        int totalHours = 0;
        int totalDays = 0;
        double totalEarnings = 0;
        int totalReviews = 0;
        int totalScore = 0;
        double averageScore = 0;

        SummaryReservationsDTO summary = new SummaryReservationsDTO();
        try {

            List<Reservation> reservations = reservationRepository.findPastReservationsGuide(guideId);
            for(Reservation reservation : reservations){
                System.out.println("reservation: " + reservation);
                totalDays += countTotalDays(reservation.getStartDate().toString(), reservation.getEndDate().toString());
                totalHours += getTotalHours(reservation.getStartDate().toString(), reservation.getEndDate().toString());
                totalEarnings += reservation.getPrice();
                totalReviews  = reservation.getReview() != null ? totalReviews + 1 : totalReviews;
                totalScore = reservation.getReview() != null ? totalScore + reservation.getReviewScore() : totalScore;
            }
            totalTour = reservations.size();
            averageScore = totalReviews > 0 ? totalScore / totalReviews : 0.0;
            summary.setTotalTour(String.valueOf(totalTour));
            summary.setTotalHours(totalHours);
            summary.setTotalDays(totalDays);
            summary.setTotalReviews(totalReviews);
            summary.setTotalEarnings(totalEarnings);
            summary.setAverageScore(averageScore);
            ;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return summary;
    }

    public int countTotalDays(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        LocalDateTime startOfDay = start.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = end.toLocalDate().atStartOfDay();

        long daysBetween = java.time.Duration.between(startOfDay, endOfDay).toDays();

        return daysBetween == 0 ? 1 : (int) daysBetween + 1;  // +1 para incluir el día final en el conteo
    }

    public int getTotalHours(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        Duration duration = Duration.between(start, end);

        long hours = duration.toHours();

        return (int) hours;
    }


    public boolean deleteReservation(Long reservationId) {
        try {
            Reservation existReservation = reservationRepository.findById(reservationId).orElse(null);
            if (existReservation == null) {
                return false;
            }
            existReservation.setDeleted(true);
            existReservation.setStatus(ReservationStatus.CANCELADA);
            reservationRepository.save(existReservation);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void leaveReview(Long reservationId, String review, int score) {
        try {
            Optional<Reservation> reservation = reservationRepository.findById(reservationId);
            if (reservation.isEmpty()) {
                return;
            }
            Reservation existReservation = reservation.get();
            existReservation.setReview(review);
            existReservation.setReviewScore(score);
            reservationRepository.save(existReservation);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Reservation> getReviewsByGuideId(Long guideId) {
        return reservationRepository.findByGuideIdAndReviewNotNull(guideId);
    }

    public List<Reservation> getReviewsByTouristId(Long touristId) {
        return reservationRepository.findByTouristIdAndReviewNotNull(touristId);
    }


}
