package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TouristRepository extends JpaRepository<Tourist, Long>, JpaSpecificationExecutor<Tourist> {

    Optional<Tourist> findByEmail(final String email);

    Tourist findByEmailAndPassword(final String email,final String password);

    @Query("SELECT COUNT(t) FROM Tourist t")
    int countAll();
}