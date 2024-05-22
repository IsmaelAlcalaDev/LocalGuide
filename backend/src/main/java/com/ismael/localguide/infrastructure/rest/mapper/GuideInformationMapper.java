package com.ismael.localguide.infrastructure.rest.mapper;

import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.dto.GuideInformationDTO;
import com.ismael.localguide.domain.Hobbies;
import com.ismael.localguide.domain.Language;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface GuideInformationMapper {
    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "surname", source = "surname"),
            @Mapping(target = "country", source = "country"),
            @Mapping(target = "city", source = "city"),
            @Mapping(target = "gender", source = "gender"),
            @Mapping(target = "phone", source = "phone"),
            @Mapping(target = "profileImg", source = "profileImg"),
            @Mapping(target = "email", source = "email"),
            @Mapping(target = "backgroundCheckCertificate", source = "backgroundCheckCertificate"),
            @Mapping(target = "identityDocument", source = "identityDocument"),
            @Mapping(target = "hourlyPrice", source = "hourlyPrice"),
            @Mapping(target = "additionalInfo", source = "additionalInfo"),
            @Mapping(target = "phrase", source = "phrase"),
            @Mapping(target = "typeUser", source = "typeUser"),
            @Mapping(target = "languages", source = "languages"),
            @Mapping(target = "hobbies", source = "hobbies")
    })
    GuideInformationDTO toDto(Guide source);

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
}
