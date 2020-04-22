import { pastesCollection, Timestamp } from '@/firebaseConfig'
import { Paste } from '@/models/Paste'

const createPaste = async (content: string): Promise<Paste> => {
    const doc = await pastesCollection.add({
        content: content,
        author: null,
        createdAt: Timestamp.fromMillis(Date.now())
    })
    return Paste.fromDocument(doc)
}

const fetchPaste = (id: string) => {
    return Paste.fromDocument(pastesCollection.doc(id))
}

export {
    createPaste,
    fetchPaste
}