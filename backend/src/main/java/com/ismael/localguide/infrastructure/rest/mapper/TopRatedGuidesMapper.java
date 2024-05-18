package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.TopRatedGuidesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper
public interface TopRatedGuidesMapper {
    @Mappings({
            @Mapping(source = "guide.name", target = "name"),
            @Mapping(source = "guide.country", target = "country"),
            @Mapping(source = "guide.city", target = "city"),
            @Mapping(source = "guide.profileImg", target = "profileImg"),
            @Mapping(source = "guide.phrase", target = "phrase"),
            @Mapping(source = "guide.hourlyPrice", target = "hourlyPrice"),
            @Mapping(source = "guide.numberTours", target = "numberTours"),
            @Mapping(source = "reservation.reviewScore", target = "reviewScore"),
    })
    TopRatedGuidesDTO toDto(Guide guide, Reservation reservation);
}
