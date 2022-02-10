package com.arash.console.app;

import com.arash.console.config.Settings;
import com.arash.console.launchparty.BrowserLauncher;
import com.arash.console.launchparty.CurrentUriFinder;
import com.arash.console.launchparty.FlexPortLauncher;
import com.arash.console.socket.WsHandler;
import com.arash.console.socket.WsServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

@SpringBootApplication(scanBasePackages = "com.arash.console")
public class Application {

    private static final Settings settings = new Settings();

    public static void main(String[] args) throws Exception {
        SpringApplication app = new SpringApplication(Application.class);
        new Launcher(args, settings)
                .addLaunchParties(
                        FlexPortLauncher.class
                        , CurrentUriFinder.class
                        , BrowserLauncher.class
                )
                .execute(app);
    }

    @Bean
    public Settings getSettings() {
        return settings;
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