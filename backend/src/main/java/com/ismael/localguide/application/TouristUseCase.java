package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.TouristRepository;
import com.ismael.localguide.domain.Tourist;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TouristUseCase {

    @Autowired
    private TouristRepository touristRepository;

    public Optional<Tourist> findByEmail(final String email){
        return this.touristRepository.findByEmail(email);
    }


    public Tourist findByEmailAndPassword(final String email, final String password){
        return this.touristRepository.findByEmailAndPassword(email, password);
    }

    public List<Tourist> findAll() {
        return touristRepository.findAll();
    }

    public Tourist save(Tourist tourist){
        return this.touristRepository.save(tourist);
    }
}
