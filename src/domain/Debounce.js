export default class Debounce {
    constructor(delay) {
        this.timeoutId = null
        this.delay = delay
    }
    execute(func) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(func, this.delay)
    }
}
