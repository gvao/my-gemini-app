import { after, before, describe, it } from 'node:test'
import expect from 'node:assert'
import { server } from '../src/infra/configServer.js'
import "../src/infra/Server.types.js"


describe('Server', () => {
    const PORT = 8080
    /** @type {ListenerServer} */
    let _server

    before(async () => {
        _server = server.listen(PORT)
        await new Promise(resolve => _server.on('listening', resolve))
    })

    it('/api/agents', async () => {
        const response = await fetch(`http://localhost:${PORT}/api`)
        expect.strictEqual(response.status, 200)
        // console.log(response)
    })

    it('should handle unknown paths', async () => {
        const response = await fetch(`http://localhost:${PORT}/test`)
        console.log(response)
    })

    after(() => {
        _server.close()
    })
})