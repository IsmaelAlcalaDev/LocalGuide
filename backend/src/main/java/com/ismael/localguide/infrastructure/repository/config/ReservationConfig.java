package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.ReservationMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ReservationMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class ReservationConfig {

    @Bean
    @Primary
    public ReservationMapper reservationMapperMapper() {
        return new ReservationMapperImpl();
    }
}
