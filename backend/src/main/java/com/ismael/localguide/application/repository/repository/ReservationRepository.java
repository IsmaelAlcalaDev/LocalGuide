package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.awt.print.Pageable;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {

    List<Reservation> findFirst6ByStatusAndReviewIsNotNullAndReviewScoreGreaterThanEqualOrderByReservedHoursDesc(ReservationStatus status, int score);
}