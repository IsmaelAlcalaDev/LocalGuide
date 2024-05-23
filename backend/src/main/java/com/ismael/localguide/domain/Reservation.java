package com.ismael.localguide.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "touristID", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Tourist tourist;

    @ManyToOne
    @JoinColumn(name = "guideID", nullable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Guide guide;

    @Column(name = "date_reservation", nullable = false)
    private LocalDateTime reservationDate;

    @Column(name = "start_reservation", nullable = false)
    private LocalDateTime  startDate;

    @Column(name = "end_date")
    private LocalDateTime  endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ReservationStatus status;

    @Column(name = "review")
    private String review;

    @Column(name = "review_score")
    private Integer reviewScore;

    @Column(name = "reserved_hours", nullable = false)
    private int reservedHours;

    @Column(name = "price", nullable = false)
    private double price;
}
