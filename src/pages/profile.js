import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getUserByUsername } from '../services/firebase'
import * as ROUTES from '../constants/routes'
import Header from '../components/header'
import UserProfile from '../components/profile/user-profile'

export default function Profile() {
    const { username } = useParams()
    const [user, setUser] = useState(null)
    const history = useHistory()
    useEffect(() => {
     async function checkUserExists() {
         const userProfile = await getUserByUsername(username)
         if (userProfile.length > 0) {
             setUser(userProfile[0])
             document.title = `Instagram | ${userProfile[0].fullName}`
         } else {
             history.push(ROUTES.NOT_FOUND)
         }
     }
        checkUserExists()
    }, [username])

    return user?.username ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null
}
