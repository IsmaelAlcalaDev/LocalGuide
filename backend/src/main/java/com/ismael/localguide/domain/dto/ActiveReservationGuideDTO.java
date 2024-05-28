package com.ismael.localguide.domain.dto;

import com.ismael.localguide.domain.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActiveReservationGuideDTO {
    private Long id;
    private String nameTourist;
    private String emailTourist;
    private String phoneTourist;
    private String countryTourist;
    private LocalDateTime reservationDate;
    private LocalDateTime  startDate;
    private LocalDateTime  endDate;
    private String status;
    private String review;
    private Integer reviewScore;
    private int reservedHours;
    private double price;
}
