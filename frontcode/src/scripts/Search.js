import icFilter from '../res/images/ic_filter.png';
import icFilterDisabled from '../res/images/ic_filter_disabled.png';
import {InputAndButton} from "./InputAndButton";

export const Search = class extends InputAndButton {
    getInputTooltip() {
        return '1: To apply filter on all columns, type in any word<br/>2: To apply filter only on one column, type in [column]:[a word]';
    }

    getButtonStates() {
        return [
            {
                icon: icFilter,
                tooltip: 'disable filter',
            },
            {
                icon: icFilterDisabled,
                tooltip: 'enable filter',
            }
        ]
    }

    onInputTextChange(value) {
        if (this.props.onTextChangeListener)
            this.props.onTextChangeListener(value);
    }

    onButtonStateChange(newIndex, oldIndex) {
        if (this.props.onStateChangeListener)
            this.props.onStateChangeListener(newIndex, oldIndex);
    }
}

Search.defaultProps = {onTextChangeListener: null, onStateChangeListener: null}