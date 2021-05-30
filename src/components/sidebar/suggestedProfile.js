import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/firebase'

export default function SuggestedProfile({ username, profileDocId, userId, loggedInUserDocId, profileId, avatar }) {


    const [followed, setFollowed] = useState(false)

    async function handleFollowUser() {
        setFollowed(true)

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false)
        await updateFollowedUserFollowers(profileDocId, userId, false)
    }


    return !followed ? (
        <div className="flex items-center justify-between ml-10 xs:ml-2">
            <div className="flex flex-wrap items-center justify-between">
                <img
                    className="rounded-full w-12 h-12 xs:w-8 xs:h-8 flex mr-3"
                    src={avatar}
                    alt={`${username}`}/>
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-xl xs:text-sm">{username}</p>
                </Link>
            </div>
            <div>
                <button
                    type="button"
                    className="text-sm xs:text-xs font-bold text-blue-medium"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : (
        null
    )
}


SuggestedProfile.propTypes = {
    profileId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileDocId: PropTypes.string,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
}
