package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.PastReservationTouristMapper;
import com.ismael.localguide.infrastructure.rest.mapper.PastReservationTouristMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PastReservationTouristConfig {
    @Bean
    public PastReservationTouristMapper pastReservationTouristMapper() {
        return new PastReservationTouristMapperImpl();
    }
}
