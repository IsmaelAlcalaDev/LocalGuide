package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.ReviewsTouristMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ReviewsTouristMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReviewsTouristConfig {
    @Bean
    public ReviewsTouristMapper reviewsTouristMapper() {
        return new ReviewsTouristMapperImpl();
    }
}
