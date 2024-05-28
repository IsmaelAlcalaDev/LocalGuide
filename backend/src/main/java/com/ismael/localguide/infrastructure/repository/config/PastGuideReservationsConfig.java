package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.PastGuideReservationsMapper;
import com.ismael.localguide.infrastructure.rest.mapper.PastGuideReservationsMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PastGuideReservationsConfig {
    @Bean
    public PastGuideReservationsMapper pastGuideReservationsMapper() {
        return new PastGuideReservationsMapperImpl();
    }
}
