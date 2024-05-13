package com.ismael.localguide.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tourist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tourist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotBlank(message = "Name cannot be empty")
    @Size(max = 100, message = "Name must be at most 100 characters long")
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Last name cannot be empty")
    @Size(max = 100, message = "Last name must be at most 100 characters long")
    @Column(name = "surname", nullable = false, length = 100)
    private String surname;

    @NotBlank(message = "Country cannot be empty")
    @Size(max = 100, message = "Country must be at most 100 characters long")
    @Column(name = "country", nullable = false, length = 100)
    private String country;

    @NotNull(message = "Gender cannot be empty")
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotBlank(message = "City cannot be empty")
    @Size(max = 100, message = "City must be at most 100 characters long")
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @NotBlank(message = "Phone number cannot be empty")
    @Column(name = "phone", nullable = false)
    private String phone;

    @Lob
    @Column(name = "profile_img", length = 5000)
    private String profileImg;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "typeUser")
    private String typeUser = "tourist";

    @OneToMany(mappedBy = "tourist")
    private List<Reservation> reservations = new ArrayList<>();
}
