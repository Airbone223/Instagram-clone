import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { getUserByUserId, isUserFollowingProfile, toggleFollow } from '../../services/firebase'
import {Link} from 'react-router-dom'
import useUser from '../../hooks/use-user'
import Skeleton from 'react-loading-skeleton'

export default function Follower({ profileId }) {
    const { user } = useUser()
    const [followerProfile, setFollowerProfile] = useState(null)
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const activeBtnFollow = followerProfile?.username && user?.username !== followerProfile?.username
    const handleToggleFollow = async () => {
        setIsFollowingProfile(isFollowingProfile => !isFollowingProfile)
        await toggleFollow(!!isFollowingProfile, user.docId, followerProfile.docId, user.userId, followerProfile.userId)
    }
    useEffect( () => {
        const takeUserProfile = async() => {
            const response = await getUserByUserId(profileId)
            setFollowerProfile(response[0])
        }
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileId)
            setIsFollowingProfile(isFollowing)
        }
        if (profileId) {
            takeUserProfile()
        }
        if (user?.username) {
            isLoggedInUserFollowingProfile()
        }
    }, [profileId, user.username])


    return followerProfile?.username ? (
        <div className="flex items-center justify-between w-full mb-2">
            <div className="flex flex-wrap items-center">
                <img
                    className="rounded-full w-12 h-12 xs:w-8 xs:h-8 flex mr-3 ml-3"
                    src={followerProfile.avatar}
                    alt={`${followerProfile.username}`}/>
                <Link to={`/p/${followerProfile.username}`}>
                    <p className="font-bold text-xl xs:text-sm">{followerProfile.username}</p>
                </Link>
            </div>
            <div>
                {activeBtnFollow && user.userId && (
                    <button
                        type="button"
                        className="font-bold text-sm text-blue-medium outline-none mr-3"
                        onClick={handleToggleFollow}
                    >
                        {isFollowingProfile ? 'UnFollow' : 'Follow'}
                    </button>
                )}
            </div>
        </div>
    ) : (
       <Skeleton count={1} height={35} width={500} />
    )
}

Follower.propTypes = {
    profileId: PropTypes.string.isRequired
}
