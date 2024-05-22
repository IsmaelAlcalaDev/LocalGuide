package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.GuideInformationMapper;
import com.ismael.localguide.infrastructure.rest.mapper.GuideInformationMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GuideInformationConfig {
    @Bean
    public GuideInformationMapper guideInformationMapper() {
        return new GuideInformationMapperImpl();
    }
}
