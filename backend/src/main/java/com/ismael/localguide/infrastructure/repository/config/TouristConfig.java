package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.TouristMapper;
import com.ismael.localguide.infrastructure.rest.mapper.TouristMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TouristConfig {
    @Bean
    public TouristMapper touristMapper() {
        return new TouristMapperImpl();
    }
}
