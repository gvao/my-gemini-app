import { WebSocketServer } from 'ws'
import Server from './Server.js'

export default class WebSocket {
    /** @param {Server} server  */
    constructor(server) {
        this.wss = new WebSocketServer({ server: server._server })
    }
    
    onConnection(callback) {
        this.wss.on('connection', callback)
    }

    sendMessage(message, recipient) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.id === recipient) {
                client.send(message)
            }
        })
    }
}