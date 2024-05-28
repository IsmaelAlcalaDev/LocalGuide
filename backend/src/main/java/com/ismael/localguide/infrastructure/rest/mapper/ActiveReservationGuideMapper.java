package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.ActiveReservationGuideDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ActiveReservationGuideMapper {

    @Mappings({
            @Mapping(source = "tourist.name", target = "nameTourist"),
            @Mapping(source = "tourist.email", target = "emailTourist"),
            @Mapping(source = "tourist.phone", target = "phoneTourist"),
            @Mapping(source = "tourist.country", target = "countryTourist"),
    })
    ActiveReservationGuideDTO toDto(Reservation reservation);
}
