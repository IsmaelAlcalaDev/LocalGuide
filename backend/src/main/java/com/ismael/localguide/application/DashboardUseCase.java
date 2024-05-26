package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.GuideRepository;
import com.ismael.localguide.application.repository.repository.ReservationRepository;
import com.ismael.localguide.application.repository.repository.TouristRepository;
import com.ismael.localguide.application.repository.repository.TransactionRepository;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.DashboardDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
public class DashboardUseCase {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private TouristRepository touristRepository;

    public DashboardDataDTO getDashboardKpis() {
        DashboardDataDTO dashboardDataDTO = new DashboardDataDTO();

        LocalDateTime startDate = LocalDateTime.of(LocalDate.now().getYear(), 1, 1, 0, 0, 0);
        LocalDateTime endDate = LocalDateTime.now().with(TemporalAdjusters.lastDayOfYear()).withHour(23).withMinute(59).withSecond(59);
        int totalTransactionsYearToDate = transactionRepository.sumTransactionsCurrentYear(startDate, endDate);
        dashboardDataDTO.setTotalTransactionsYearToDate(totalTransactionsYearToDate);

        int totalTransactionsCurrentMonth = transactionRepository.sumTransactionsCurrentMonth();
        dashboardDataDTO.setTotalTransactionsCurrentMonth(totalTransactionsCurrentMonth);

        int totalAcceptedReservations = reservationRepository.countAcceptedReservations();
        dashboardDataDTO.setTotalAcceptedReservations(totalAcceptedReservations);

        int totalAcceptedReservationsCurrentMonth = reservationRepository.countAcceptedReservationsForCurrentMonth();
        dashboardDataDTO.setTotalAcceptedReservationsCurrentMonth(totalAcceptedReservationsCurrentMonth);

        int totalGuides = guideRepository.countAll();
        int totalTourists = touristRepository.countAll();
        dashboardDataDTO.setTotalUsers(totalGuides + totalTourists);

        Long mostFrequentGuideId = reservationRepository.findMostFrequentGuideId();
        String mostFrequentGuideCountry = guideRepository.findById(mostFrequentGuideId).get().getCountry();
        dashboardDataDTO.setMostReservedCountryByGuide(mostFrequentGuideCountry);

        return dashboardDataDTO;
    }
}
