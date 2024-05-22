package com.ismael.localguide.domain.dto;

import com.ismael.localguide.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuideInformationDTO {
    private Long id;
    private String name;
    private String surname;
    private String country;
    private String city;
    private Gender gender;
    private String phone;
    private String profileImg;
    private String email;
    private Boolean backgroundCheckCertificate;
    private Boolean identityDocument;
    private int hourlyPrice;
    private String additionalInfo;
    private String phrase;
    private String typeUser;
    private Set<String> languages = new HashSet<>();
    private Set<String> hobbies = new HashSet<>();
}
