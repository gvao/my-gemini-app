import Server from "./Server.js"
import path from 'node:path'

export const server = new Server()

server.onRequest('GET', '/api', (req, res) => {
    return {
        status: 200,
        body: {
            message: `hello world`
        }
    }
})

const publicPath = path.join(process.cwd(), 'public')
server.sendFile(publicPath)