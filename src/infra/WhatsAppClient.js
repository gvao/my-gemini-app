import wwa from 'whatsapp-web.js';
import qrCode from 'qrcode-terminal'

export default class WhatsAppClient {
    isRunning = false

    constructor() {
        this.client = new wwa.Client({
            authStrategy: new wwa.LocalAuth(),
        });

        this.client.on('ready', () => {
            console.log('Client is ready!');
            this.name = this.client.info.pushname
            this.number = this.client.info.wid.user
        });
    }

    onQr(func, { terminal = false }) {
        this.client.on('qr', (qr) => {
            if (terminal) qrCode.generate(qr, { small: true });
            func(qr)
        });
    }

    sendMessage(chatId, message) {
        return this.client.sendMessage(chatId, message);
    }

    /**
     * @param {(msg:wwa.Message) => void} callBack 
     */
    onMessage(callBack) {
        this.client.on('message_create', msg => {
            callBack(msg)
        });
    }
    initialize = () => {
        this.isRunning = true
        this.client.initialize();
    }

    static isGroup(msg){
        const [number, type] = msg.id.remote.split('@')
        return type.startsWith('g')
    }
    
}