package com.ismael.localguide.infrastructure.repository.config;

import com.ismael.localguide.infrastructure.rest.mapper.TransactionMapper;
import com.ismael.localguide.infrastructure.rest.mapper.TransactionMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class TransactionConfig {
    @Bean
    @Primary
    public TransactionMapper transactionMapper() {
        return new TransactionMapperImpl();
    }
}
