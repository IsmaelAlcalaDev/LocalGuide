package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Administrator;
import com.ismael.localguide.domain.dto.AdministratorDataDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdministratorMapper {
    AdministratorDataDTO toDto(Administrator source);
}
