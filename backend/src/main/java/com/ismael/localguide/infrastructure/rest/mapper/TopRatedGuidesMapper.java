package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.TopRatedGuidesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface TopRatedGuidesMapper {

    @Mappings({
            @Mapping(source = "guide.id", target = "id"),
            @Mapping(source = "guide.name", target = "name"),
            @Mapping(source = "guide.country", target = "country"),
            @Mapping(source = "guide.city", target = "city"),
            @Mapping(source = "guide.profileImg", target = "profileImg"),
            @Mapping(source = "guide.phrase", target = "phrase"),
            @Mapping(source = "guide.hourlyPrice", target = "hourlyPrice"),
            @Mapping(source = "totalReservations", target = "totalReservations"),
            @Mapping(source = "averageScore", target = "averageScore")
    })
    TopRatedGuidesDTO toDto(Guide guide, int totalReservations, Integer averageScore);
}
