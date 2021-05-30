import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getUserByUsername} from '../../services/firebase'
import {defaultAvatarUrl} from '../../constants/constants'

export default function PostHeader ({ username }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const takeUserProfile = async() => {
            const profile = await getUserByUsername(username)
            setUser(profile[0])
        }
        if (username) {
            takeUserProfile()
        }
    }, [username])

return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
        <div className="flex items-center">
            <Link to={`/p/${username}`} className="flex items-center">

                {user?.avatar ? (<img
                    className="rounded-full h-8 w-8 flex mr-3"
                    src={user.avatar}
                    alt={`${username}-avatar`}/>)
                : (<img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={defaultAvatarUrl}
                        alt={`${username}-avatar`}/>)}
                    <p className="font-bold">{username}</p>
            </Link>
        </div>
    </div>
)
}

PostHeader.propTypes = {
    username: PropTypes.string.isRequired
}
