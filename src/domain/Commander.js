export default class Commander {
    listeners = []
    
    /**
     * @param {CommanderEvent} event
     */
    emit(event) {
        for (const listener of this.listeners) {
            if (listener.event === event.name) {
                listener.handler(event.data)
            }
        }
    }

    /**
     * 
     * @param {string} eventName 
     * @param {(data: unknown) => void} handler 
     */
    addHandler(eventName, handler) {
        const listener = new CommanderListener(eventName, handler)
        this.listeners.push(listener)
    }
}

export class CommanderEvent {
    name
    data
    constructor(name, data) {
        this.name = name
        this.data = data
    }
}

export class CommanderListener {
    constructor(event, handler) {
        this.event = event
        this.handler = handler
    }
}