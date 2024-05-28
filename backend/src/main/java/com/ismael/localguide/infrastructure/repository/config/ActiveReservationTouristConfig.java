package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.ActiveReservationTouristMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ActiveReservationTouristMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ActiveReservationTouristConfig {
    @Bean
    public ActiveReservationTouristMapper activeReservationTouristMapper() {
        return new ActiveReservationTouristMapperImpl();
    }
}
