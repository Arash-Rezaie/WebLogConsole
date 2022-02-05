package com.arash.console.app;

import java.io.IOException;
import java.util.Scanner;

public class FlexPortLauncher {
    private Integer targetPort = -1;
    private final int timeout;

    private static class OutOfRange extends Exception {
        public OutOfRange(String message) {
            super(message);
        }
    }

    public FlexPortLauncher(int timeoutSecond) {
        this.timeout = timeoutSecond;
    }

    public int readUserPort(String portStr) {
        if (portStr != null) {
            try {
                targetPort = Integer.parseInt(portStr);
            } catch (Exception ignored) {
            }
        }
        if (targetPort < 0)
            targetPort = readUserPortByDelay();
        return targetPort;
    }

    private int readUserPortByDelay() {
        int targetPort = 8080;
        System.out.println("No port number is passed in, so " + targetPort + " will be used as default port. If you are willing to change it, press \"Enter\" to interrupt:");
        try {
            waitTimeout();
            if (System.in.available() > 0)
                targetPort = getUserDefinedPort();
        } catch (InterruptedException | IOException ignored) {
        }
        return targetPort;
    }

    private void waitTimeout() throws InterruptedException, IOException {
        final int partitionTime = 500;
        int _1SecCounter = 1000 / partitionTime;
        int loop = timeout * 1000 / partitionTime;
        for (int i = 0; i < loop && System.in.available() <= 0; i++) {
            if (i % _1SecCounter == 0)
                System.out.print(". ");
            Thread.sleep(partitionTime);
        }
    }

    private int getUserDefinedPort() {
        System.out.println("\ntype in your desired port:");
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine())
            scanner.nextLine();
        while (true) {
            try {
                System.out.print("> ");
                targetPort = Integer.parseInt(scanner.nextLine());
                if (targetPort > 65535 || targetPort < 0)
                    throw new OutOfRange("port range is 0 - 65535");
                return targetPort;
            } catch (OutOfRange e) {
                System.out.println(e.getMessage());
            } catch (Exception e) {
                System.out.println("Only a number is acceptable!");
            }
        }
    }
}
