package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActiveReservationTouristDTO {
    private Long id;
    private String nameGuide;
    private String emailGuide;
    private String phoneGuide;
    private String countryGuide;
    private String cityGuide;
    private LocalDateTime reservationDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String status;
    private String review;
    private Integer reviewScore;
    private int reservedHours;
    private double price;
}
