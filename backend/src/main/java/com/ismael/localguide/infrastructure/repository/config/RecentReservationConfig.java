package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.RecentReservationMapper;
import com.ismael.localguide.infrastructure.rest.mapper.RecentReservationMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RecentReservationConfig {
    @Bean
    public RecentReservationMapper recentReservationMapper() {
        return new RecentReservationMapperImpl();
    }
}
