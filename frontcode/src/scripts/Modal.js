import React from "react";

export class Modal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {status: 'hide', content: null}
        ModalController = {
            show: content => this.#show(content),
            hide: () => this.#hide()
        };
    }

    #show(content) {
        this.setState({status: 'show', content: content})
    }

    #hide() {
        this.setState({status: 'hide', content: null})
    }

    render() {
        return (
            <div className={'modal-disp'} style={{display: this.state.status === 'show' ? 'block' : 'none'}}
                 onClick={() => this.#hide()}>
                <div className={'modal'} onClick={event => event.stopPropagation()}>
                    {this.state.content}
                </div>
            </div>
        )
    }
}

export let
    ModalController;
