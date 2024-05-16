package com.ismael.localguide.domain.dto;

import jakarta.persistence.Column;

public class RecentReservationsDTO {
    private Long id;
    private String nameGuide;
    private String nameTourist;
    private String country;
    private String city;
    private String profileImgGuide;
    private String profileImgTourist;
    private String review;
    private Integer reviewScore;
    private String status;
    //Esta clase contiene campos de las clases Reservation, Guide y Tourist para mostrar en la vista de reservas recientes
}
