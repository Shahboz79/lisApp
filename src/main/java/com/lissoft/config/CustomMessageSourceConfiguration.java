package com.lissoft.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class CustomMessageSourceConfiguration {

    @Bean("messageSource")
    public ResourceBundleMessageSource messageSource() {
        var messageSource = new ResourceBundleMessageSource();
        messageSource.setBasenames("language/messages");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setUseCodeAsDefaultMessage(true);
        return messageSource;
    }

}