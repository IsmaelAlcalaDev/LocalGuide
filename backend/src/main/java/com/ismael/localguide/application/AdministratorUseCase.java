package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.AdministratorRepository;
import com.ismael.localguide.domain.Administrator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AdministratorUseCase {

    @Autowired
    private AdministratorRepository administratorRepository;

    public Optional<Administrator> findByEmail(final String email) {
        try {
            return this.administratorRepository.findByEmail(email);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    public Administrator findByEmailAndPassword(final String email, final String password) {
        try {
            return this.administratorRepository.findByEmailAndPassword(email, password);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Administrator save(Administrator administrator) {
        return this.administratorRepository.save(administrator);
    }
}
