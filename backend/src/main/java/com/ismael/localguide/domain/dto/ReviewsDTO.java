package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewsDTO {
    private Long id;
    private String name;
    private String country;
    private String city;
    private LocalDateTime reservationDate;
    private String profileImg;
    private String review;
    private Integer reviewScore;
}
