package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Guide;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface GuideRepository extends JpaRepository<Guide, Long>, JpaSpecificationExecutor<Guide> {

    Optional<Guide> findByEmail(final String email);

    @EntityGraph(attributePaths = {"languages"})
    Guide findByEmailAndPassword(final String email,final String password);
    Optional<Guide> findById(Long id);

}