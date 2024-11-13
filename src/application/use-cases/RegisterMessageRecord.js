import Commander, { CommanderEvent } from "../../domain/Commander.js"
import MessageRecord from "../../domain/MessageRecord.js"
import MessageRecordRepository from "../../infra/repositories/MessageRecordRepository.js"

export default class RegisterMessageRecord {
    /**
     * @param {MessageRecordRepository} repository 
     * @param {Commander} commander 
     */
    constructor(repository, commander) {
        this.messageRecordRepository = repository
        this.commander = commander
    }

    async execute({ content, from, timestamp, author, to}) {
        const messageRecord = MessageRecord.create({ content, from, timestamp, author, to})
        await this.messageRecordRepository.save(messageRecord)
        const event = new CommanderEvent('registeredMessageRecord', messageRecord)
        this.commander.emit(event)
    }
}
