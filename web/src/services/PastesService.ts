import { pastesCollection, Timestamp } from '@/firebaseConfig'
import { Paste } from '@/models/Paste'

const createPaste = async (content: string): Promise<string> => {
    const doc = await pastesCollection.add({
        content: content,
        author: null,
        createdAt: Timestamp.fromMillis(Date.now()),
    })
    return doc.id
}

const fetchPaste = (id: string) => {
    return Paste.fromDocument(pastesCollection.doc(id))
}

export { createPaste, fetchPaste }
