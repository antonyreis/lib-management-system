package com.sistemalib.libsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite todas as origens para os endpoints de '/users' e '/books'
        registry.addMapping("/**") // Ou defina para endpoints específicos como "/users/**"
                .allowedOrigins("http://localhost:7855") // URL do seu frontend React
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
