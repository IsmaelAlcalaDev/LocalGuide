package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.Transaction;
import com.ismael.localguide.domain.dto.TransactionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mappings({
        @Mapping(source = "reservation.id", target = "reservation"),
    })

    TransactionDTO toDto(Transaction transaction);
}
