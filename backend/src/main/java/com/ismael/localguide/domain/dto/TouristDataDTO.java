package com.ismael.localguide.domain.dto;

import com.ismael.localguide.domain.Gender;
import com.ismael.localguide.domain.Reservation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TouristDataDTO {
    private Long id;
    private String name;
    private String surname;
    private String country;
    private Gender gender;
    private String city;
    private String phone;
    private String profileImg;
    private String email;
    private String password;
    private String typeUser;
    private List<Reservation> reservations;
}
