package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.Tourist;
import com.ismael.localguide.domain.dto.TouristDataDTO;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface TouristMapper {
    TouristDataDTO toDto(Tourist source);

}
