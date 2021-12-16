import { db } from "./firebase"
import firebase from 'firebase'

export async function greetings(user) {
    try {
        db.collection('chats').add({
            users: [user, 'dynasticartisan@gmail.com']
        }).then(doc => doc.collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: 'Привет! Добро пожаловать!',
            user: 'dynasticartisan@gmail.com'
        }))
    } catch (e) {
        console.log(e)
    }
}