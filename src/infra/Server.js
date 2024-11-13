import './Server.types.js'
import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs'

export default class Server {
    constructor() {
        this._server = http.createServer()
    }

    contentType = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.pdf': 'application/pdf',
    }


    /** @param {string} [pathName='public']  */
    sendFile(pathName) {
        this._server.on('request', (req, res) => {
            if (req.url.startsWith('/api')) return
            const filePath = path.join(pathName, req.url)
            const extname = path.extname(filePath)
            if (!extname) {
                const fileRoot = path.join(filePath, 'index.html')
                fs.readFile(fileRoot, { encoding: 'utf8' }, (error, data) => {
                    if (error) return
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(file)
                })
            }
            
            if (!this.contentType[extname]) {
                res.writeHead(404)
                res.end('Not Found')
                return
            }

            console.log(`Serving ${filePath}`)
            
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404)
                    res.end('Not Found')
                } else {
                    res.writeHead(200, { 'Content-Type': this.contentType[extname] })
                    res.end(data)
                }
            })

            res.on('error', (error) => {
                console.error(`Error serving ${filePath}`, error)
                res.writeHead(500)
                res.end('Internal Server Error')
            })

            res.end()
        })
    }

    /**
     * @param {Handler} callback 
     * @param {'GET' | 'POST'} method 
     */
    onRequest(method, path = "/", callback) {
        this._server.addListener('request', (req, res) => {

            if (req.method === method && req.url === path) {
                const { status, body } = callback(req, res)
                res.writeHead(status, { "content-type": 'Application/json' })
                res.statusCode = status
                res.write(JSON.stringify(body))
                res.end()
            }
            return res.end()
        })

    }

    /** 
     * @returns {ListenerServer}
     */
    listen(port = 3000, callback = () => { }) {
        this.currentServer = this._server.listen(port, callback)
        return this.currentServer
    }
}
