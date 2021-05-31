import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useUser from '../../hooks/use-user'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'
import Skeleton from 'react-loading-skeleton'
import * as ROUTES from '../../constants/routes'



export default function ProfileHeader({ photosCount, profile }) {
    const {user} = useUser()
    const [profileFollowers, setProfileFollowers] = useState(null)
    const [isFollowingProfile, setIsFollowingProfile] = useState(false)
    const activeBtnFollow = profile.username && user.username !== profile.username

    const handleToggleFollow = async () => {
        setIsFollowingProfile(isFollowingProfile => !isFollowingProfile)
        setProfileFollowers(profileFollowers => isFollowingProfile ? --profileFollowers : ++profileFollowers)
        await toggleFollow(!!isFollowingProfile, user.docId, profile.docId, user.userId, profile.userId)
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profile.userId)
            setIsFollowingProfile(isFollowing)
        }
        if (profile.userId) {
            setProfileFollowers(profile.followers.length)
        }
        if (user.userId) {
            isLoggedInUserFollowingProfile()
        }
    }, [profile.userId, user.username])

    return (
        <div
            className="xs:grid xs:grid-cols-3 xs:justify-between flex flex-wrap items-center
             gap-4 justify-center mx-auto max-w-screen-lg"
        >
            <div className="container flex justify-center ml-2 mb-2">
                { activeBtnFollow ?  (<img
                    className="rounded-full h-40 w-40 flex"
                    src={profile.avatar}
                    alt={`${profile.username}-avatar`}
                />) :  (<Link to={ROUTES.ADD_AVATAR}><img
                    className="rounded-full h-40 w-40 flex"
                    src={profile.avatar}
                    alt={`${profile.username}-avatar`}/></Link>) }
            </div>
            <div className="flex items-center justify-center flex-col col-span-2 ml-10">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{profile.username}</p>
                    {activeBtnFollow && user.userId && (
                        <button
                            type="button"
                            className="bg-blue-medium font-bold text-sm rounded text-sm rounded text-white w-20 h-8"
                            onClick={handleToggleFollow}
                        >
                            {isFollowingProfile ? 'UnFollow' : 'Follow'}
                        </button>
                    )}
                </div>
               <div className="container flex mt-4">
                   {profileFollowers === null ? (
                       <Skeleton count={1} width={677} height={24} />
                   ) : (
                       <>
                           { (!activeBtnFollow && user.userId) ? (<Link to={`/p/${profile.username}/posts`}>
                                   <p className="mr-10 hover:text-blue-medium">
                                       <span className="font-bold">{photosCount}</span>{` `}
                                       {photosCount === 1 ? 'post' : 'posts'}
                                   </p>
                               </Link>) : ( <p className="mr-10">
                               <span className="font-bold">{photosCount}</span>{` `}
                               {photosCount === 1 ? 'post' : 'posts'}
                           </p>)}
                           <Link to={`/p/${profile.username}/followers`}>
                           <p className="mr-10 hover:text-blue-medium">
                               <span className="font-bold">{profileFollowers}</span>{` `}
                               {profileFollowers === 1 ? 'follower' : 'followers'}
                           </p>
                           </Link>
                           <Link to={`/p/${profile.username}/following`}>
                           <p className="mr-10 hover:text-blue-medium">
                               <span className="font-bold">{profile.following.length}</span>{` following`}
                           </p>
                           </Link>
                       </>
                   )}
               </div>
                <div className="container mt-4 ">
                    <p className="font-medium">
                        {!profile.fullName  ? (
                            <Skeleton count={1} height={24} />
                        ) : profile.fullName
                        }
                    </p>
                    {!activeBtnFollow && user.userId &&
                    <Link
                        to={ ROUTES.ADD_POST }>
                        <button
                            type="button"
                            className="bg-blue-medium inline-block font-bold text-sm rounded text-white w-20 h-8 mt-2">
                            Add post
                        </button>
                    </Link>}
                </div>
            </div>
        </div>
    )
}

ProfileHeader.propTypes = {
    photosCount: PropTypes.number.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired
}
