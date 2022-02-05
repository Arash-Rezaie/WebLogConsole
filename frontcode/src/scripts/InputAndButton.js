import React from 'react';
import tippy from "tippy.js";
import {StateButton} from "./StateButton";
import {createRef} from "react";

export class InputAndButton extends React.Component {
    #elmRef;
    btnInstance;

    constructor(props, context) {
        super(props, context);
        this.#elmRef = createRef();
        this.state = {inputVal: ''}
    }

    /**
     * child class can return a text to show as input tooltip
     */
    getInputTooltip() {
    }

    /**
     * child class must return all states for button
     */
    getButtonStates() {
    }

    /**
     * get called when ever input text changes
     * @param value input value
     */
    onInputTextChange(value) {
    }

    /**
     * get input value
     * @returns {string|*}
     */
    getInputText() {
        return this.state.inputVal;
    }

    /**
     * get input value
     * @returns {string|*}
     */
    setInputText(value) {
        this.setState({inputVal: value})
        this.onInputTextChange(value);
    }

    /**
     * update button index
     * @param index
     */
    setButtonState(index) {
        this.btnInstance.setButtonState(index)
    }

    /**
     * get called when state of button changes
     * @param oldIndex
     * @param newIndex
     */
    onButtonStateChange(newIndex, oldIndex) {
    }

    componentDidMount() {
        let inputTooltip = this.getInputTooltip();
        if (inputTooltip)
            tippy(this.#elmRef.current, {allowHTML: true, content: inputTooltip})
    }

    render() {
        return (
            <div className={'input-button-component'}>
                <input className={'input-field element'} ref={this.#elmRef} value={this.state.inputVal}
                       onChange={value => this.setInputText(value.target.value)}/>
                <StateButton states={this.getButtonStates()}
                             buttonAccessor={obj => this.btnInstance = obj}
                             onStateChangeListener={(newIndex, oldIndex) => this.onButtonStateChange(newIndex, oldIndex)}/>
            </div>
        )
    }
}