package com.arash.console.config;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class CurrentUri {
    public static class MyUri {
        private List<String> addresses = new LinkedList<>();

        public List<String> getAddresses() {
            return addresses;
        }

        private void sort() {
            List<String> arr = new ArrayList<>();
            arr.addAll(find("192\\..*"));
            arr.addAll(find("127\\..*"));
            arr.addAll(addresses);
            addresses = arr;
        }

        private List<String> find(String pattern) {
            List<String> arr = addresses.stream().filter(s -> s.matches(pattern)).collect(Collectors.toList());
            addresses.removeAll(arr);
            return arr;
        }
    }

    private final Settings settings;

    public CurrentUri(Settings settings) {
        this.settings = settings;
    }

    public MyUri getCurrentUri() {
        MyUri address = new MyUri();
        fillAddress(address);
        address.sort();
        return address;
    }

    private void fillAddress(MyUri address) {
        try {
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();
            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();
                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();
                    address.getAddresses().add(inetAddress.getHostAddress());
                }
            }
            if (address.getAddresses().isEmpty())
                address.getAddresses().add("Failed to catch local address!");
        } catch (Exception e) {
        }
    }
}