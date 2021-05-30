import { firebase } from '../lib/firebase'
import {defaultAvatarUrl} from '../constants/constants'

export async function createUser(username, fullName, email, password) {
    const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
    await createdUserResult.user.updateProfile({
        displayName: username
    })
    return await firebase.firestore().collection('users').add({
        avatar: defaultAvatarUrl,
        userId: createdUserResult.user.uid,
        username: username.toLowerCase().trim(),
        fullName,
        emailAddress: email.trim(),
        following: [],
        followers: [],
        dateCreated: Date.now()
    })
}

export async function login(email, password) {
    return await firebase.auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
}

export async function logout() {
    return await firebase.auth().signOut()
}
