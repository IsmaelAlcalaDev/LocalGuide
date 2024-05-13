package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.AdministratorMapper;
import com.ismael.localguide.infrastructure.rest.mapper.AdministratorMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdministratorConfig {

    @Bean
    public AdministratorMapper administratorMapper() {
        return new AdministratorMapperImpl();
    }
}
