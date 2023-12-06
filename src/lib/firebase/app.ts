// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    collection,
    addDoc,
    getFirestore,
    doc,
    getDoc,
    type DocumentReference,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA3QKpedhSb0lSZkk7lHN5M82e-7cTlNaA',
    authDomain: 'pastify-app.firebaseapp.com',
    databaseURL: 'https://pastify-app.firebaseio.com',
    projectId: 'pastify-app',
    storageBucket: 'pastify-app.appspot.com',
    messagingSenderId: '867546936605',
    appId: '1:867546936605:web:3e3d2ed07c31f022095df4',
    measurementId: 'G-VLM54TKM2K',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const firestore = getFirestore(app);

interface Paste {
    content: string;
}

export interface PasteWithId extends Paste {
    id: string;
}

export async function getPaste(id: string) {
    const ref = doc(firestore, 'pastes', id) as DocumentReference<Paste>;
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data(),
        } satisfies PasteWithId;
    } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
        return null;
    }
}

export async function createPaste(content: string) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(firestore, 'pastes'), {
        content,
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
}
