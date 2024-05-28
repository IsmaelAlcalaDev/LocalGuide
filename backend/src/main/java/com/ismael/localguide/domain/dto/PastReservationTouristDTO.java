package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PastReservationTouristDTO {
    private Long id;
    private String nameGuide;
    private String countryGuide;
    private String cityGuide;
    private LocalDateTime reservationDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer reviewScore;
    private int reservedHours;
    private double price;
}
