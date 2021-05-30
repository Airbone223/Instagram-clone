import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ProfileHeader from './profile-header'
import {getUserPhotosByUserId} from '../../services/firebase'
import ProfilePhotos from './profile-photos'



export default function UserProfile({ user }) {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        async function getProfilePhotos() {
            const userPhotos = await getUserPhotosByUserId(user.userId)
            setPhotos(userPhotos)
        }
            getProfilePhotos()
    }, [])

    return (
        <>
        <ProfileHeader
         photosCount={photos ? photos.length : 0}
         profile={user}
        />
            <ProfilePhotos  photos={photos}/>
        </>
    )
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired
}
