package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.ReservationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ReservationMapper {
    @Mappings({
            @Mapping(source = "tourist.name", target = "tourist"),
            @Mapping(source = "guide.name", target = "guide")
    })
    ReservationDTO toDto(Reservation reservation);
}
