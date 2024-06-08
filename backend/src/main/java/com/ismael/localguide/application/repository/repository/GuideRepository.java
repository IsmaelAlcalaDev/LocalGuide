package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Gender;
import com.ismael.localguide.domain.Guide;
import com.ismael.localguide.domain.dto.TopRatedGuidesDTO;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GuideRepository extends JpaRepository<Guide, Long>, JpaSpecificationExecutor<Guide> {

    Optional<Guide> findByEmail(final String email);

    @EntityGraph(attributePaths = {"languages"})
    Guide findByEmailAndPassword(final String email,final String password);

    Optional<Guide> findById(Long id);

    @Query("SELECT g FROM Guide g JOIN g.reservations r WHERE r.reviewScore > 3 GROUP BY g.id")
    List<Guide> findAllByReservationWithHighReviewScore();

    @Query("SELECT COUNT(g) FROM Guide g")
    int countAll();

    @Query("SELECT DISTINCT g FROM Guide g " +
            "LEFT JOIN g.languages i " +
            "LEFT JOIN g.hobbies h " +
            "WHERE (:name IS NULL OR g.name  = :name) " +
            "AND (:country IS NULL OR g.country = :country) " +
            "AND (:city IS NULL OR g.city = :city) " +
            "AND (:languages IS NULL OR i.language IN :languages) " +
            "AND (:hobbies IS NULL OR h.name IN :hobbies) " +
            "AND (:priceMin IS NULL OR g.hourlyPrice >= :priceMin) " +
            "AND (:priceMax IS NULL OR g.hourlyPrice <= :priceMax) " +
            "AND (:gender IS NULL OR g.gender = :gender)")
    List<Guide> searchGuideFilter(@Param("name") String name,
                              @Param("country") String country,
                              @Param("city") String city,
                              @Param("languages") List<String> languages,
                              @Param("hobbies") List<String> hobbies,
                              @Param("priceMin") Integer priceMin,
                              @Param("priceMax") Integer priceMax,
                              @Param("gender") Gender gender);
}