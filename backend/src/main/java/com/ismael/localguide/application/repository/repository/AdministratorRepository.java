package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Administrator;
import com.ismael.localguide.domain.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
    Optional<Administrator> findByEmail(final String email);

    Administrator findByEmailAndPassword(final String email,final String password);
}