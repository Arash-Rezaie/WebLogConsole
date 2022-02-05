import React from "react";
import Rect from "react";
import tippy from "tippy.js";

/**
 * @property clickListener
 */
export class StateButton extends Rect.Component {
    myTippy;
    elmRef;
    showToolTip = false;

    constructor(props, context) {
        super(props, context);
        this.elmRef = React.createRef();
        if (this.props.states.filter(obj => obj['tooltip']).length > 0)
            this.showToolTip = true;
        this.state = {currentIndex: 0}
        if (this.props.buttonAccessor)
            this.props.buttonAccessor(this);
    }

    componentDidMount() {
        if (this.showToolTip === true && !this.myTippy) {
            this.myTippy = tippy(this.elmRef.current);
            this.#updateTippy(this.#fetchStateObj(this.state.currentIndex))
        }
    }

    #fetchStateObj(index) {
        return this.props.states[index];
    }

    #updateTippy(stateObj) {
        this.myTippy.setContent(stateObj['tooltip']);
    }

    setButtonState(index) {
        this.setState({currentIndex: index});
        if (this.props.onStateChangeListener)
            this.props.onStateChangeListener(index, this.state.currentIndex)
    }

    #clickHandler() {
        this.setButtonState((this.state.currentIndex + 1) % this.props.states.length);
    }

    static #getIcon(stateObj) {
        return <img draggable={false} src={stateObj['icon']} style={{aspectRatio: 1}} alt={''}/>
    }

    static #getCaption(stateObj) {
        return stateObj['caption'] ?
            <span className={'caption'}>{stateObj['caption']}</span> : null
    }

    render() {
        let stateObj = this.#fetchStateObj(this.state.currentIndex);
        if (this.myTippy)
            this.#updateTippy(stateObj)
        return (
            <div className={'state-button element none-selectable'} style={{width: this.props.width}}
                 onClick={() => this.#clickHandler()}
                 ref={this.elmRef}>
                {StateButton.#getIcon(stateObj)}
                {StateButton.#getCaption(stateObj)}
            </div>
        )
    }
}

StateButton.defaultProps = {width: '20px', buttonAccessor: null, onStateChangeListener: null}
