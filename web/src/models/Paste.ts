import * as firebase from 'firebase'

export class Paste {
    constructor(
        public content: string,
        public id: string,
        public createdAt: Date,
        public author?: string
    ) {}

    static async fromDocument(
        doc: firebase.firestore.DocumentReference
    ): Promise<Paste> {
        const data = (await doc.get()).data()
        if (data === undefined) {
            throw Error('`data` is undefined????')
        }
        return {
            content: data.content,
            id: doc.id,
            createdAt: data.createdAt,
        }
    }
}
