package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopRatedGuidesDTO {
    private String name;
    private String country;
    private String city;
    private String profileImg;
    private String phrase;
    private int hourlyPrice;
    private int totalReservations;
    private Integer reviewScore;
    private int numberTours;
    //Esta clase contiene campos de la clase Guide para mostrar en la vista de guias mejor valorados
}
