package com.arash.console.app;

import com.arash.console.config.Settings;
import com.arash.console.socket.WsHandler;
import com.arash.console.socket.WsServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

import java.util.Collections;

@SpringBootApplication(scanBasePackages = "com.arash.console")
public class Application {

    public static void main(String[] args) throws Exception {
        Settings settings = LaunchSettingProvider.prepare(args);
        SpringApplication app = new SpringApplication(Application.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", String.valueOf(settings.getPort())));
        app.run();
    }

    @Bean
    @Scope(scopeName = "singleton")
    public WsHandler getWsSessions() {
        return new WsHandler();
    }

    @Bean
    public ServletRegistrationBean<WsServlet> countryServlet() {
        ServletRegistrationBean<WsServlet> servRegBean = new ServletRegistrationBean<>();
        servRegBean.setServlet(new WsServlet());
        servRegBean.addUrlMappings("/ws/*");
        servRegBean.setLoadOnStartup(1);
        return servRegBean;
    }
}