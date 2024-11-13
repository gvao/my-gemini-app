export default class MessageRecord {
    constructor({ to, author, content, from, timestamp, id }) {
        this.id = id
        this.from = from
        this.to = to
        this.author = author
        this.content = content
        this.timestamp = timestamp

    }
    static create({ to, author, content, from, timestamp }) {
        const id = crypto.randomUUID().toString()
        return new MessageRecord({
            id,
            content,
            from,
            timestamp,
            author,
            to
        })
    }

}
