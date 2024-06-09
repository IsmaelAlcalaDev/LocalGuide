package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long>, JpaSpecificationExecutor<Reservation> {

    List<Reservation> findFirst6ByStatusAndReviewIsNotNullAndReviewScoreGreaterThanEqualOrderByReservedHoursDesc(ReservationStatus status, int score);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.guide.id = :guideId AND r.status = 'aceptada' AND r.deleted = false")
    int countReservationsByGuideIdAndStatusAcceptedAndNotDeleted(@Param("guideId") Long guideId);

    @Query("SELECT ROUND(AVG(r.reviewScore)) FROM Reservation r WHERE r.guide.id = :guideId AND r.status = 'aceptada' AND r.deleted = false")
    Double getAverageReviewScoreByGuideIdAndStatusAcceptedAndNotDeleted(@Param("guideId") Long guideId);

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.status = 'ACEPTADA'")
    int countAcceptedReservations();

    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.status = 'ACEPTADA' AND MONTH(r.reservationDate) = MONTH(CURRENT_DATE()) AND YEAR(r.reservationDate) = YEAR(CURRENT_DATE())")
    int countAcceptedReservationsForCurrentMonth();

    @Query(value = "SELECT guideid FROM reservation GROUP BY guideid ORDER BY COUNT(*) DESC LIMIT 1", nativeQuery = true)
    Long findMostFrequentGuideId();

    @Query("SELECT r FROM Reservation r WHERE r.guide.id = :guideId AND DATE(r.endDate) > CURRENT_DATE AND r.deleted != true")
    List<Reservation> findActiveReservationsGuide(@Param("guideId") Long guideId);

    @Query("SELECT r FROM Reservation r WHERE r.tourist.id = :touristId AND DATE(r.endDate) > CURRENT_DATE AND r.deleted != true")
    List<Reservation> findActiveReservationsTourist(@Param("touristId") Long touristId);

    @Query("SELECT r FROM Reservation r WHERE r.endDate < CURRENT_DATE AND r.guide.id = :guideId")
    List<Reservation> findPastReservationsGuide(@Param("guideId") Long guideId);

    @Query("SELECT r FROM Reservation r WHERE r.endDate < CURRENT_DATE AND r.tourist.id = :touristId")
    List<Reservation> findPastReservationsTourist(@Param("touristId") Long touristId);

    List<Reservation> findByGuideIdAndReviewNotNull(Long guideId);

    List<Reservation> findByTouristIdAndReviewNotNull(Long touristId);
}