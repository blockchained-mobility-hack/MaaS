package com.oms.maas;

import com.oms.maas.api.TestApi;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

import javax.ws.rs.ApplicationPath;

@Configuration
@ApplicationPath("api")
public class JerseyConfig extends ResourceConfig {


    public JerseyConfig() {
        StackTraceElement[] stackTraceElements = Thread.currentThread().getStackTrace();
        if (stackTraceElements[2].getClassName().contains("EnhancerBySpringCGLIB")) {
            registerEndpoints();
        }
    }

    private void registerEndpoints() {
        register(TestApi.class);
    }
}
