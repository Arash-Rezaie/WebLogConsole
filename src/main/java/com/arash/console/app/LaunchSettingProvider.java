package com.arash.console.app;

import com.arash.console.config.CurrentUri;
import com.arash.console.config.Settings;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class LaunchSettingProvider {
    private static final Settings settings = new Settings();

    static Settings prepare(String[] args) throws Exception {
        Map<String, String> params = init(args);
        settings.setPort(new FlexPortLauncher(3).readUserPort(params.get("--port=")));
        settings.setCurrentUri(new CurrentUri(settings).getCurrentUri());
        settings.setAutoLaunchBrowser(params.get("--noAutoLaunch") == null);
        return settings;
    }

    private static Map<String, String> init(String[] args) throws Exception {
        Set<String> params = getAcceptableParams();
        printParamInfo(params);
        return extractArgs(args, params);
    }

    private static Set<String> getAcceptableParams() {
        Set<String> set = new HashSet<>();
        set.add("--noAutoLaunch");
        set.add("--port=");
        return set;
    }

    private static void printParamInfo(Set<String> params) {
        System.out.println("Acceptable params:");
        for (String s : params)
            System.out.println(s + (s.endsWith("=") ? "value" : ""));
        System.out.println("");
    }

    private static Map<String, String> extractArgs(String[] args, Set<String> params) throws Exception {
        HashMap<String, String> userInput = new HashMap<>();
        String[] t;
        int a;
        for (String s : args) {
            a = s.indexOf('=');
            t = a >= 0 ? new String[]{s.substring(0, a + 1), s.substring(a + 1)} : new String[]{s, ""};
            if (params.contains(t[0]))
                userInput.put(t[0], t[1]);
            else
                throw new Exception(t[0] + " is not acceptable");
        }
        return userInput;
    }

    @Bean
    public Settings getSettings() {
        return settings;
    }
}
