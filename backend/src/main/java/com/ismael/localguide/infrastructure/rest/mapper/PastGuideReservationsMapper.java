package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.ActiveReservationGuideDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface PastGuideReservationsMapper {

    @Mappings({
            @Mapping(source = "tourist.name", target = "nameTourist"),
    })
    ActiveReservationGuideDTO toDto(Reservation reservation);
}
