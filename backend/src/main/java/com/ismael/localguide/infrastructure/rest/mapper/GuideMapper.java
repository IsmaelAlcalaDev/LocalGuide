package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.Hobbies;
import com.ismael.localguide.domain.Language;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.dto.GuideDataDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface GuideMapper {
    GuideDataDTO toDto(Guide source);

    default Set<String> mapLanguages(Set<Language> languages) {
        return languages.stream()
                .map(Language::getLanguage)
                .collect(Collectors.toSet());
    }

    default Set<String> mapHobbies(Set<Hobbies> hobbies) {
        return hobbies.stream()
                .map(Hobbies::getName)
                .collect(Collectors.toSet());
    }

    default List<Long> mapReservations(List<Reservation> reservations) {
        return reservations.stream()
                .map(Reservation::getId)
                .collect(Collectors.toList());
    }
}
