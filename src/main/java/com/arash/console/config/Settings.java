package com.arash.console.config;

import java.util.HashMap;

public class Settings {
    private HashMap<String, Object> container = new HashMap<>();

    public void setPort(int port) {
        container.put("port", port);
    }

    public int getPort() {
        return (int) container.getOrDefault("port", 8080);
    }

    public void setCurrentUri(CurrentUri.MyUri myUri) {
        container.put("currentUri", myUri);
    }

    public CurrentUri.MyUri getCurrentUri() {
        return (CurrentUri.MyUri) container.get("currentUri");
    }

    public void setAutoLaunchBrowser(boolean value) {
        container.put("autoLaunchBrowser", value);
    }

    public boolean getAutoLaunchBrowser() {
        return (boolean) container.getOrDefault("autoLaunchBrowser", true);
    }
}
