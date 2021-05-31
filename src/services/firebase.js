import {FieldValue, firebase} from '../lib/firebase'

export async function doesUserNameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    return result.docs.map(user => user.data().length > 0)

}

export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get()
    return result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase
        .firestore()
        .collection('users')
        .limit(10)
        .get()
    return result
        .docs
        .map(user => ({...user.data(), docId: user.id}))
        .filter(profile => profile.userId !== userId && !following.includes(profile.userId))
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        })
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        })
}

export async function getPhotos(userId, following) {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get()

    const userFollowedPhotos = result.docs.map(photo => (
        {
            ...photo.data(),
            docId: photo.id
        }
    ))

    const photosWithUsersDetails = await Promise.all(
        userFollowedPhotos.map(async photo => {
            let userLikedPhoto = false
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
            }
            const user = await getUserByUserId(photo.userId)
            const {username} = user[0]
            return {username, ...photo, userLikedPhoto}
        })
    )
    return photosWithUsersDetails
}

export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    return result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))
}


export async function getUserPhotosByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get()
    return result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))
}

export async function isUserFollowingProfile(loggedInUsername, profileUserId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', loggedInUsername)
        .where('following', 'array-contains', profileUserId)
        .get()

    const [response = {}] = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))

    return response.userId
}

export async function toggleFollow(isFollowingProfile, activeUserDocId, followingUserDocId, activeUserUserId, followingUserId) {
    await updateLoggedInUserFollowing(activeUserDocId, followingUserId, isFollowingProfile)
    await updateFollowedUserFollowers(followingUserDocId, activeUserUserId, isFollowingProfile)
}

export async function toggleLikes (docId, userId, toggleLiked) {
   return  firebase
        .firestore()
        .collection('photos')
        .doc(docId)
        .update({
            likes:
                toggleLiked ? FieldValue.arrayRemove(userId)
                    : FieldValue.arrayUnion(userId)
        })
}

export async function addComment (docId, displayName, comment) {
    return firebase
        .firestore()
        .collection('photos')
        .doc(docId)
        .update({
            comments: FieldValue.arrayUnion({ displayName, comment })
        })
}

export async function addPost(img, caption, userId) {
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(img.name)
    await fileRef.put(img)
    const url = await fileRef.getDownloadURL()
    await firebase.firestore().collection('photos').add({
        caption: caption.trim(),
        comments:[],
        dateCreated: Date.now(),
        imageSrc: url,
        likes: [],
        userId
    })
}

export async function addAvatar(userDocId, previousAvatar, avatar) {
    const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(avatar.name)
        await fileRef.put(avatar)
        const url = await fileRef.getDownloadURL()
      return await firebase
            .firestore()
            .collection('users')
            .doc(userDocId)
            .update({
                avatar: url
            })
}

export async function getAllUserFollowers(username) {

    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    const [response = {}] = result.docs.map(item => ({
        ...item.data().followers
    }))
    return Object.values(response)

}


export async function getAllUserFollowing(username) {

    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get()

    const [response = {}] = result.docs.map(item => ({
        ...item.data().following
    }))
    return Object.values(response)

}

export async function getUserPhotos(userId, username) {

    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', '==', userId)
        .get()
   const photos = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))
    const photosWithUserDetails = await Promise.all(
        photos.map(async photo => {
            let userLikedPhoto = false
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
            }
            return {username, ...photo, userLikedPhoto}
        })
    )
    return photosWithUserDetails
}
