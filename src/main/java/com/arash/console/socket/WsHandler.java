package com.arash.console.socket;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebSocket
public class WsHandler {
    static List<Session> sessions = new LinkedList<>();

    @OnWebSocketConnect
    public void onConnect(Session session) {
        sessions.add(session);
        System.out.println("connected: " + session.getRemoteAddress());
    }

    @OnWebSocketClose
    public void onClose(Session session, int statusCode, String reason) {
        sessions.remove(session);
        System.out.println("closed: " + reason);
    }

    @OnWebSocketError
    public void onError(Session session, Throwable t) {
        session.close();
        t.printStackTrace();
    }

    @OnWebSocketMessage
    public void onMessage(Session session, String message) {
        System.out.println("message: " + message);
    }

    public void send(String message) {
        sessions.forEach(session -> {
            try {
                session.getRemote().sendString(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
