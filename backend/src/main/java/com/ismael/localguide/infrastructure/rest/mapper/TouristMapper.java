package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Tourist;
import com.ismael.localguide.domain.dto.TouristDataDTO;
import org.mapstruct.Mapper;

@Mapper
public interface TouristMapper {
    TouristDataDTO toDto(Tourist source);

}
