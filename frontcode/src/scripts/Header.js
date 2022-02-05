import {StateButton} from "./StateButton";
import icActivated from "../res/images/ic_activated.png";
import icDeactivated from "../res/images/ic_deactivated.png";
import icDelete from "../res/images/ic_delete.png";
import icInfo from "../res/images/ic_info.png";
import {Search} from "./Search";
import {Socket} from "./Socket";
import {ModalController} from "./Modal";

export const Header = ({msgProcessor, wsHandler}) => {
    const showInfo = () => {
        ModalController.show(
            <>
                send json encoded log to
                <pre><code>{`http://server-url[localhost:8080]/broadcast`}
            </code></pre> via GET/POST method<br/><br/>
                sample:
                <pre><code>
{`key: data
value:
    {
        time:[log-time],
        type:[log-type: error,debug,...],
        tag:[log-tag: any string],
        log:[log-data: main data]
    }`}
            </code></pre>
            </>
        )
    }
    return (
        <div className={'header'}>
            <div>
                <StateButton
                    onStateChangeListener={newIndex => msgProcessor.setConsoleEnabled(newIndex === 0)}
                    states={[
                        {icon: icActivated, tooltip: 'deactivate'},
                        {icon: icDeactivated, tooltip: 'activate'}
                    ]}/>
                <StateButton
                    onStateChangeListener={() => msgProcessor.clearConsole()}
                    states={[{icon: icDelete, tooltip: 'clear'}]}/>
                <StateButton
                    onStateChangeListener={() => showInfo()}
                    states={[{icon: icInfo, tooltip: 'info'}]}/>
                <Search
                    onStateChangeListener={newIndex => msgProcessor.setFilterEnabled(newIndex === 0)}
                    onTextChangeListener={value => msgProcessor.setFilter(value)}/>
                <div/>
                <Socket wsHandler={wsHandler}/>
            </div>
        </div>
    )
}
