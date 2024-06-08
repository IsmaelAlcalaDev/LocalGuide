package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.ReviewsDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewsGuideMapper {
    @Mapping(source = "tourist.name", target = "name")
    @Mapping(source = "tourist.country", target = "country")
    @Mapping(source = "tourist.city", target = "city")
    @Mapping(source = "reservation.reservationDate", target = "reservationDate")
    @Mapping(source = "tourist.profileImg", target = "profileImg")
    ReviewsDTO toDTO(Reservation reservation);
}
