package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.ReviewsGuideMapper;
import com.ismael.localguide.infrastructure.rest.mapper.ReviewsGuideMapperImpl;
import org.springframework.context.annotation.Bean;

public class ReviewsGuideConfig {
    @Bean
    public ReviewsGuideMapper reviewsGuideMapper() {
        return new ReviewsGuideMapperImpl();
    }
}
