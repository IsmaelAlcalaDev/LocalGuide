package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummaryReservationsDTO {
    private String totalTour;
    private int totalHours;
    private int totalDays;
    private int totalReviews;
    private double totalEarnings;
    private double averageScore;
}
