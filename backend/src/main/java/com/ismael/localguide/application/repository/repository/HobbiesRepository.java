package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Hobbies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "hobbies", path = "hobbies")
public interface HobbiesRepository extends JpaRepository<Hobbies, Long>, JpaSpecificationExecutor<Hobbies> {
    @Query("SELECT h.name " +
            "FROM Hobbies h " +
            "LEFT JOIN h.guides g " +
            "WHERE g.id = :guideId")
    List<String> findHobbiesByGuideId(@Param("guideId") Long guideId);

    Hobbies findByName(String hobbyName);
}