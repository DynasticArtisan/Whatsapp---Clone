import firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_key,
    authDomain: "whatsapp-clone-fa9ff.firebaseapp.com",
    projectId: "whatsapp-clone-fa9ff",
    storageBucket: "whatsapp-clone-fa9ff.appspot.com",
    messagingSenderId: "454568678446",
    appId: "1:454568678446:web:28f572663a5cad29c1fbbf"
  };
  
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = app.firestore()
const auth = app.auth()

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider}