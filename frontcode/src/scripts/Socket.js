import icConnect from '../res/images/ic_connect.png';
import icDisconnect from '../res/images/ic_disconnect.png';
import {InputAndButton} from "./InputAndButton";

export const Socket = class extends InputAndButton {
    componentDidMount() {
        super.componentDidMount();
        this.setInputText(this.props.url);
        setTimeout(() => this.setButtonState(1), 1000);
    }

    getInputTooltip() {
        return 'type in socket server url and press connect button'
    }

    getButtonStates() {
        return [
            {
                icon: icDisconnect,
                tooltip: 'connect',
            },
            {
                icon: icConnect,
                tooltip: 'disconnect',
            },
        ];
    }

    onButtonStateChange(newIndex, oldIndex) {
        super.onButtonStateChange(newIndex, oldIndex);
        if (newIndex === 0) {
            this.props.wsHandler.disconnect();
        } else {
            this.props.wsHandler.connect(
                this.getInputText(),
                e => {
                    this.setButtonState(0);
                    alert("connection closed")
                }
            );
        }
    }
}
let element = document.getElementById('server-uri');
let url = 'ws://localhost:8080/ws/ws-servlet';
if (element)
    url = element.value;
Socket.defaultProps = {url: url, wsHandler: null}
