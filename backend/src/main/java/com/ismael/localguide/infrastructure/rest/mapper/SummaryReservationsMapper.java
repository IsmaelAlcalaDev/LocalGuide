package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.dto.SummaryReservationsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface SummaryReservationsMapper {

    @Mappings({
        @Mapping(source = "totalTour", target = "totalTour"),
        @Mapping(source = "totalHours", target = "totalHours"),
        @Mapping(source = "totalDays", target = "totalDays"),
        @Mapping(source = "totalReviews", target = "totalReviews"),
        @Mapping(source = "totalEarnings", target = "totalEarnings"),
        @Mapping(source = "averageScore", target = "averageScore")
    })
    SummaryReservationsDTO toDto(SummaryReservationsDTO summaryReservations);
}
