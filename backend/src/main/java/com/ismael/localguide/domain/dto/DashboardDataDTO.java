package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataDTO {
    private double totalTransactionsYearToDate;
    private double totalTransactionsCurrentMonth;
    private int totalAcceptedReservations;
    private int totalAcceptedReservationsCurrentMonth;
    private int totalUsers;
    private String mostReservedCountryByGuide;
}
