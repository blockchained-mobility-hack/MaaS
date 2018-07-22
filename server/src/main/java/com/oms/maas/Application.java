package com.oms.maas;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class Application {


    public Application() {
    }

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).run(args);
    }

}