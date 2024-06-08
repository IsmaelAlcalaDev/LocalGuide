package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.ReviewsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewsTouristMapper {
    @Mapping(source = "guide.name", target = "name")
    @Mapping(source = "guide.country", target = "country")
    @Mapping(source = "guide.city", target = "city")
    @Mapping(source = "reservation.reservationDate", target = "reservationDate")
    @Mapping(source = "guide.profileImg", target = "profileImg")

    ReviewsDTO toDTO(Reservation reservation);
}
