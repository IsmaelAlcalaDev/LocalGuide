package com.ismael.localguide.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdministratorDataDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String typeUser;
}
