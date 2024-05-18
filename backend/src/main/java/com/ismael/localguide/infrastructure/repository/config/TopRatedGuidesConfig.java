package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.TopRatedGuidesMapper;
import com.ismael.localguide.infrastructure.rest.mapper.TopRatedGuidesMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TopRatedGuidesConfig {
    @Bean
    public TopRatedGuidesMapper topRatedGuidesMapper() {
        return new TopRatedGuidesMapperImpl();
    }
}
