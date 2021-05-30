import Firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBj8BDpOXnn0Edrj6KIooCA1MH4R81LJ7o",
    authDomain: "instagram-clone-by.firebaseapp.com",
    projectId: "instagram-clone-by",
    storageBucket: "instagram-clone-by.appspot.com",
    messagingSenderId: "564679706128",
    appId: "1:564679706128:web:83ae4fc0b1592bbebdec95"
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore



export { firebase, FieldValue }
