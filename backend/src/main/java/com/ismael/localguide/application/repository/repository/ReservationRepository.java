package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {

    List<Reservation> findFirst6ByStatusAndReviewIsNotNullAndReviewScoreGreaterThanEqualOrderByReservedHoursDesc(ReservationStatus status, int score);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.guide.id = :guideId")
    int countReservationsByGuideId(@Param("guideId") Long guideId);

    @Query("SELECT ROUND(AVG(r.reviewScore)) FROM Reservation r WHERE r.guide.id = :guideId")
    double getAverageReviewScoreByGuideId(@Param("guideId") Long guideId);
}