import { WebSocket } from "ws"
import { server } from "./configServer.js"

const wss = new WebSocket(server)

wss.on('open', (ws) => {
    console.log('WebSocket server is running')

    ws.on('message', (message) => {
        console.log(`received message: ${message}`)
    })

    ws.send('Hello from the server!')
})

wss.on('error', (error) => {
    console.error('WebSocket error:', error)
})

wss.on('close', () => {
    console.log('WebSocket server is closed')
})