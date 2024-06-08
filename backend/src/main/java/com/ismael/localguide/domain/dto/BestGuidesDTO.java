package com.ismael.localguide.domain.dto;

import com.ismael.localguide.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BestGuidesDTO {
    private Long id;
    private String name;
    private String country;
    private String city;
    private String profileImg;
    private Boolean backgroundCheckCertificate;
    private Boolean identityDocument;
    private int hourlyPrice;
    private String phrase;
}
