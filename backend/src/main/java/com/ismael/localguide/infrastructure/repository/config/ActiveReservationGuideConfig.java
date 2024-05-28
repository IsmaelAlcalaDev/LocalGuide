package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.ActiveReservationGuideMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ActiveReservationGuideMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ActiveReservationGuideConfig {
    @Bean
    public ActiveReservationGuideMapper activeReservationGuideMapper() {
        return new ActiveReservationGuideMapperImpl();
    }
}