package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.GuideRepository;
import com.ismael.localguide.application.repository.repository.ReservationRepository;
import com.ismael.localguide.application.repository.repository.TouristRepository;
import com.ismael.localguide.domain.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

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
                throw new Exception("Validation failed"); // Lanzar una excepción si la validación falla
            }

            Reservation reservation = new Reservation();
            Long guideId = ((Number) dataReservation.get("guide")).longValue();
            Guide guide = guideRepository.findById(guideId).orElse(null);
            if (guide == null) {
                throw new Exception("Guide or tourist not found");
            }
            Long touristId = ((Number) dataReservation.get("tourist")).longValue();
            Tourist tourist = touristRepository.findById(touristId).orElse(null);
            if (tourist == null) {
                throw new Exception("Guide or tourist not found");
            }

            // Guardar la reserva
            reservation.setTourist(tourist);
            reservation.setGuide(guide);
            reservation.setReservationDate(LocalDateTime.now());
            reservation.setStatus(ReservationStatus.PENDIENTE);
            reservation.setStartDate(LocalDateTime.parse((String) dataReservation.get("startDate"), formatter));
            reservation.setEndDate(LocalDateTime.parse((String) dataReservation.get("endDate"), formatter));
            reservation.setReservedHours((Integer) dataReservation.get("reservedHours"));
            reservation.setPrice((Double) dataReservation.get("totalPrice"));
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
        Guide guide = guideRepository.findById(idGuide).orElse(null);

        // Validar si el guía existe
        if (guide == null) {
            validation = false;
            return validation;
        }

        // Validar si los datos recibidos son los esperados
        hourlyPrice = guide.getHourlyPrice();
        reservedHours = (Integer) reservation.get("reservedHours");
        calculateCommission = (hourlyPrice * reservedHours) * commission / 100;
        totalPriceReservation = (hourlyPrice * reservedHours) + calculateCommission;

        if(totalPriceReservation != (Double) reservation.get("totalPrice")){
            validation = false;
            return validation;
        }
        // Aquí puedes continuar con la lógica de validación y procesamiento adicional
        return validation;
    }

}
