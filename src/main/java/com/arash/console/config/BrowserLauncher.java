package com.arash.console.config;

import com.arash.console.config.Settings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.net.URI;

@Component
public class BrowserLauncher {
    private final Settings settings;

    public BrowserLauncher(Settings settings) {
        this.settings = settings;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void launchBrowser() {
        if(settings.getAutoLaunchBrowser()) {
            try {
                System.setProperty("java.awt.headless", "false");
                Desktop desktop = Desktop.getDesktop();
                desktop.browse(new URI("http://localhost:" + settings.getPort()));
            } catch (Exception e) {
            }
        }
    }
}
