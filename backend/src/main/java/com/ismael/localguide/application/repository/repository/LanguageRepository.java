package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "languages", path = "languages")
public interface LanguageRepository extends JpaRepository<Language, Long>, JpaSpecificationExecutor<Language> {

    @Query("SELECT l.language " +
            "FROM Language l " +
            "JOIN l.guides g " +
            "WHERE g.id = :guideId")
    List<String> findLanguagesByGuideId(@Param("guideId") Long guideId);

    Language findByLanguage(String languageName);
}