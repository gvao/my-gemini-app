import MessageRecord from "../../domain/MessageRecord.js"

export default class MessageRecordRepository {
    items = []
    /**
     * 
     * @param {MessageRecord} messageRecord 
     */
    async save(messageRecord) {
        this.items.push(messageRecord)
    }
}