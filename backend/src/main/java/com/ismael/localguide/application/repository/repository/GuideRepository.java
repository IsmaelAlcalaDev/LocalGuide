package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Guide;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

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
}