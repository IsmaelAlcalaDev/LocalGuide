package com.ismael.localguide.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "guide")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"languages", "hobbies"})
@ToString(exclude = {"languages", "hobbies"})
public class Guide {

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

    @NotBlank(message = "City cannot be empty")
    @Size(max = 100, message = "City must be at most 100 characters long")
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @NotNull(message = "Gender cannot be empty")
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotBlank(message = "Phone cannot be empty")
    @Column(name = "phone", nullable = false)
    private String phone;

    @Lob
    @Column(name = "profile_img", length = 1000000)
    private String profileImg;

    @NotBlank(message = "Email cannot be empty")
    @Column(name = "email", nullable = false)
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "background_check_certificate")
    private Boolean backgroundCheckCertificate;

    @Column(name = "id_document")
    private Boolean identityDocument;

    @Column(name = "hourly_price")
    private int hourlyPrice;

    @Column(name = "additional_info", length = 255)
    private String additionalInfo;

    @Column(name = "phrase", length = 255)
    private String phrase;

    @Column(name = "typeUser")
    private String typeUser = "guide";

    @ManyToMany
    @JoinTable(name = "guide_language",
            joinColumns = @JoinColumn(name = "guide_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id"))
    private Set<Language> languages = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "guide_hobbies",
            joinColumns = @JoinColumn(name = "guide_id"),
            inverseJoinColumns = @JoinColumn(name = "hobbies_id"))
    private Set<Hobbies> hobbies = new HashSet<>();

    @OneToMany(mappedBy = "guide")
    private List<Reservation> reservations = new ArrayList<>();
}
