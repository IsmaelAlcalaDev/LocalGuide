package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.SummaryReservationsMapper;
import com.ismael.localguide.infrastructure.rest.mapper.SummaryReservationsMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SummaryReservationsConfig {
    @Bean
    public SummaryReservationsMapper summaryReservationsMapper() { return new SummaryReservationsMapperImpl(); }
}
