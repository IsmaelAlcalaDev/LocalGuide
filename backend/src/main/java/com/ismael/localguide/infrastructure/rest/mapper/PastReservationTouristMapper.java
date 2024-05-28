package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.PastReservationTouristDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface PastReservationTouristMapper {
    @Mappings({
            @Mapping(source = "guide.name", target = "nameGuide"),
            @Mapping(source = "guide.country", target = "countryGuide"),
            @Mapping(source = "guide.city", target = "cityGuide"),
    })
    PastReservationTouristDTO toDto(Reservation reservation);
}
