export class WsHandler {
    webSocket;
    onMessage;

    constructor(onMessage) {
        this.onMessage = onMessage;
    }

    connect(url, onClose) {
        try {
            this.webSocket = new WebSocket(url);
            this.webSocket.onopen = event => console.log('connection established')
            this.webSocket.onmessage = event => this.onMessage(event.data);
            this.webSocket.onclose = event => onClose(event)
            this.webSocket.onerror = event => console.log(event)
        } catch (exception) {
        }
    }

    getStatus() {
        return this.webSocket.readyState;
    }

    send(message) {
        if (this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(message);
        } else {
            console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
        }
    }

    disconnect() {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.close();
        }
    }
}