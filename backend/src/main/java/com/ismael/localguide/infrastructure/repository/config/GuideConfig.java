package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.GuideMapper;
import com.ismael.localguide.infrastructure.rest.mapper.GuideMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GuideConfig {

    @Bean
    public GuideMapper guideMapper() {
        return new GuideMapperImpl();
    }
}
