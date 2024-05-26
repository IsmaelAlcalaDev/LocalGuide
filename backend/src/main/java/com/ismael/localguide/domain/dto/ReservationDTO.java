package com.ismael.localguide.domain.dto;

import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.ReservationStatus;
import com.ismael.localguide.domain.Tourist;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private String tourist;
    private String guide;
    private LocalDateTime reservationDate;
    private LocalDateTime  startDate;
    private LocalDateTime  endDate;
    private ReservationStatus status;
    private String review;
    private Integer reviewScore;
    private int reservedHours;
    private double price;
}
