package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.RecentReservationsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import org.mapstruct.Mapping;

@Mapper
public interface RecentReservationMapper {
        @Mappings({
                @Mapping(source = "guide.name", target = "guideName"),
                @Mapping(source = "tourist.name", target = "touristName"),
                @Mapping(source = "guide.country", target = "country"),
                @Mapping(source = "guide.city", target = "city"),
                @Mapping(source = "guide.profileImg", target = "profileImgGuide"),
                @Mapping(source = "tourist.profileImg", target = "profileImgTourist"),
                @Mapping(source = "reservation.review", target = "review"),
                @Mapping(source = "reservation.reviewScore", target = "reviewScore"),
        })
        RecentReservationsDTO toDto(Reservation reservation);
}
