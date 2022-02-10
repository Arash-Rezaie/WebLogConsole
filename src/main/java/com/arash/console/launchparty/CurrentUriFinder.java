package com.arash.console.launchparty;

import com.arash.console.app.CmdOption;
import com.arash.console.config.Settings;
import org.springframework.boot.SpringApplication;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CurrentUriFinder implements LaunchParty {

    @Override
    public List<CmdOption> getOptions() {
        return null;
    }

    @Override
    public int when() {
        return When.AFTER_LAUNCH.value();
    }

    @Override
    public void execute(Map<String, String> userInputOptions, Settings settings, SpringApplication app) throws Exception {
        List<String> lst = fillAddress();
        sort(lst);
        settings.setCurrentUri(lst);
    }

    private List<String> fillAddress() {
        List<String> uriList = new LinkedList<>();
        try {
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();
            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();
                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    uriList.add(inetAddress.getHostAddress());
                }
            }
        } catch (Exception e) {
        }
        if (uriList.isEmpty())
            System.out.println("Failed to catch local address!");
        return uriList;
    }

    private void sort(List<String> lst) {
        List<String> sorted = new LinkedList<>();
        sorted.addAll(filter(lst, "192\\..*"));
        sorted.addAll(filter(lst, "127\\..*"));
        sorted.addAll(filter(lst, "^(?!192|127).*"));
        lst.clear();
        lst.addAll(sorted);
    }

    private List<String> filter(List<String> lst, String pattern) {
        return lst.stream().filter(s -> s.matches(pattern)).collect(Collectors.toList());
    }
}