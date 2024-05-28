package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.ActiveReservationTouristDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ActiveReservationTouristMapper {
    @Mappings({
            @Mapping(source = "guide.name", target = "nameGuide"),
            @Mapping(source = "guide.email", target = "emailGuide"),
            @Mapping(source = "guide.phone", target = "phoneGuide"),
            @Mapping(source = "guide.country", target = "countryGuide"),
            @Mapping(source = "guide.city", target = "cityGuide"),
    })
    ActiveReservationTouristDTO toDto(Reservation reservation);
}
