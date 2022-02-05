import React from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {AgGridColumn, AgGridReact} from "ag-grid-react";
import {WsHandler} from "./tools/WsHandler";
import {Header} from "./Header";
import {MessageProcessor} from "./tools/MessageProcessor";

const msgProcessor = new MessageProcessor();
const wsHandler = new WsHandler(msg => msgProcessor.processMessage(msg));

export class Console extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {rowData: []};
        msgProcessor.setOnMessageProcessedListener(data => this.setState({rowData: data}));
    }

    render() {
        return (
            <div className={'root'}>
                <Header wsHandler={wsHandler} msgProcessor={msgProcessor}/>
                <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}}>
                    <AgGridReact rowHeight={70} rowData={this.state.rowData}>
                        <AgGridColumn resizable={true} initialWidth={'200px'} field="time"/>
                        <AgGridColumn resizable={true} initialWidth={'70px%'} field="type"/>
                        <AgGridColumn resizable={true} initialWidth={'150px'} field="tag"/>
                        <AgGridColumn resizable={true} flex={1} field="log"
                                      cellStyle={{overflowY: 'auto', whiteSpace: 'normal'}}/>
                    </AgGridReact>
                </div>
            </div>
        )
    }
}
