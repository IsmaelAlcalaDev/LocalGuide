package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecentReservationsDTO {
    private String guideName;
    private String touristName;
    private String country;
    private String city;
    private String profileImgGuide;
    private String profileImgTourist;
    private String review;
    private Integer reviewScore;
    //Esta clase contiene campos de las clases Reservation, Guide y Tourist para mostrar en la vista de reservas recientes
}
