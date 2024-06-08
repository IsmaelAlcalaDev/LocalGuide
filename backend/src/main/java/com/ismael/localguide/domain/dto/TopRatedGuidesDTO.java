package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopRatedGuidesDTO {
    private Long id;
    private String name;
    private String country;
    private String city;
    private String profileImg;
    private String phrase;
    private int hourlyPrice;
    private int totalReservations;
    private Integer averageScore;
}
