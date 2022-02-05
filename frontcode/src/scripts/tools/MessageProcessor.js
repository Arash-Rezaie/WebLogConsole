import {LazyTrigger} from "./LazyTrigger";

export class MessageProcessor {
    consoleEnabled = true;
    filterEnabled = true;
    filterStr = '';
    tempData = [];
    primaryData = [];
    stagedData = [];
    messageTrigger = new LazyTrigger(700, () => this.#calcStageData('m'));// message
    filterTrigger = new LazyTrigger(1000, () => this.#calcStageData('f'));// filter
    id = 0;
    processedMsgListener;

    setOnMessageProcessedListener(listener) {
        this.processedMsgListener = listener;
    }

    processMessage(msg) {
        let data = JSON.parse(msg);
        data.id = this.id++;
        this.tempData.push(data);
        this.messageTrigger.trigger();
    }

    setConsoleEnabled(enabled) {
        this.consoleEnabled = enabled;
    }

    clearConsole() {
        this.primaryData = [];
        this.#calcStageData('c');// clear
    }

    setFilter(value) {
        this.filterStr = value;
        this.filterTrigger.trigger();
    }

    setFilterEnabled(enabled) {
        this.filterEnabled = enabled;
        this.#calcStageData('f');// filter
    }

    #filterData(data, str) {
        let colonIndex = str.indexOf(':');
        if (colonIndex > 0 && colonIndex < 5) {
            let col = str.substr(0, colonIndex).toLowerCase();
            if (col === 'time') {
                str = str.substr(5);
                return data.filter(item => item.time.indexOf(str) >= 0)

            } else if (col === 'type') {
                str = str.substr(5);
                return data.filter(item => item.type.indexOf(str) >= 0)

            } else if (col === 'tag') {
                str = str.substr(4);
                return data.filter(item => item.tag.indexOf(str) >= 0)

            } else if (col === 'log') {
                str = str.substr(4);
                return data.filter(item => item.log.indexOf(str) >= 0)
            }
        } else {
            return data.filter(item =>
                item.log.indexOf(str) >= 0 ||
                item.tag.indexOf(str) >= 0 ||
                item.type.indexOf(str) >= 0 ||
                item.time.indexOf(str) >= 0
            )
        }
    }

    #calcStageData(what) {
        if (what === 'm') {
            let t = this.tempData;
            this.tempData = [];
            this.primaryData.push.apply(this.primaryData, t);
            if (this.consoleEnabled === true) {
                if (this.filterEnabled === true && this.filterStr.length > 0) {
                    this.stagedData = this.stagedData.concat(this.#filterData(t, this.filterStr))
                } else {
                    this.stagedData = this.stagedData.concat(t);
                }
            }
        } else if (what === 'f') {
            if (this.filterEnabled === true)
                this.stagedData = this.#filterData(this.primaryData, this.filterStr)
            else
                this.stagedData = Object.values(this.primaryData)
        } else if (what === 'c') {
            this.id = 0;
            this.primaryData = [];
            this.tempData = [];
            this.stagedData = [];
        }
        if (this.processedMsgListener)
            this.processedMsgListener(this.stagedData);
    }
}