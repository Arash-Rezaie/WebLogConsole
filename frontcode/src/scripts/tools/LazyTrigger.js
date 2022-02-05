export class LazyTrigger {
    delay;
    launchTs = 0;
    target;
    timeoutSet = false;

    constructor(delay, target) {
        this.delay = delay;
        this.target = target;
    }

    trigger() {
        let ts = Date.now() + this.delay;
        if (ts > this.launchTs)
            this.launchTs = ts;

        if (this.timeoutSet === false)
            this.wait();
    }

    wait() {
        this.timeoutSet = true;
        setTimeout(() => this.launcher(), this.delay + 10);
    }

    launcher() {
        let ts = Date.now()
        if (ts > this.launchTs) {
            this.timeoutSet = false;
            this.target();
        } else {
            this.wait()
        }
    }
}