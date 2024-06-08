package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.SearchGuideFilterMapper;
import com.ismael.localguide.infrastructure.rest.mapper.SearchGuideFilterMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SearchGuideFilterConfig {
    @Bean
    public SearchGuideFilterMapper searchGuideFilterMapper() {
        return new SearchGuideFilterMapperImpl();
    }
}
