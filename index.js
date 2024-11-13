import RegisterMessageRecord from "./src/application/use-cases/RegisterMessageRecord.js";
import Commander from "./src/domain/Commander.js";
import Debounce from "./src/domain/Debounce.js";
import GeminiAiAdapter from "./src/infra/GeminiIaAdapter.js";
import MessageRecordRepository from "./src/infra/repositories/MessageRecordRepository.js";
import WhatsAppClient from "./src/infra/WhatsAppClient.js";

const client = new WhatsAppClient()
client.onQr(qr => {
    console.log(`Scan the QR code below to log in:\n${qr}`);
}, { terminal: true })

const commander = new Commander()
const messageRecordRepository = new MessageRecordRepository()
const registerMessageRecord = new RegisterMessageRecord(messageRecordRepository, commander)
const geminiAiAdapter = new GeminiAiAdapter(process.env.GEMINI_API_KEY)
const debounce = new Debounce(2000)

commander.addHandler('registeredMessageRecord', data => {
    debounce.execute(() => {
        const result = geminiAiAdapter.generateMessage(data.content)
        console.log('New message record registered:', data)
        console.log({ result })
    })
})

client.onMessage(async msg => {
    if (WhatsAppClient.isGroup(msg) && msg.from === '120363338538305198@g.us') {
        registerMessageRecord.execute({
            content: msg.body,
            from: msg.from,
            timestamp: msg.timestamp,
            author: msg.author,
            to: msg.to,
        })
        return
    }
})

client.initialize()
