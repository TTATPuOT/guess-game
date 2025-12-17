import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDM4cfj6eSMO3n7IMMwzhzWBOeK6JAqMRk',
    authDomain: 'gg-tohadev-com.firebaseapp.com',
    projectId: 'gg-tohadev-com',
    storageBucket: 'gg-tohadev-com.firebasestorage.app',
    messagingSenderId: '105413964538',
    appId: '1:105413964538:web:4fcd8f9c03286e8ddb8f43',
    measurementId: 'G-S307NY987E'
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
