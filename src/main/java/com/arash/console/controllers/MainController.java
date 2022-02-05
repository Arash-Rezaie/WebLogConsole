package com.arash.console.controllers;

import com.arash.console.config.Settings;
import com.arash.console.socket.WsHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    private final WsHandler wsHandler;
    private Settings settings;

    public MainController(WsHandler wsHandler, Settings settings) {
        this.wsHandler = wsHandler;
        this.settings = settings;
    }

    @GetMapping("/")
    public String getPage(Model model) {
        if (settings.getCurrentUri().getAddresses().size() > 0)
            model.addAttribute("serverUri", "ws://" +
                    settings.getCurrentUri().getAddresses().get(0) + ":" + settings.getPort() + "/ws/ws-servlet");
        return "index";
    }

    @RequestMapping(value = "/broadcast")
    @ResponseBody
    public void broadcast(@RequestParam(name = "data") String data) {
        wsHandler.send(data);
    }
}
