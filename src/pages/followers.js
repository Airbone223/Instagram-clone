import Header from '../components/header'
import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getAllUserFollowers } from '../services/firebase'
import Follower from '../components/follow/follower'



export default function Followers () {
    const { username } = useParams()
    const [followers, setFollowers] = useState(null)

    useEffect( () => {
        document.title = `Instagram | ${username} followers`
        const takeUserProfile = async() => {
            const response = await getAllUserFollowers(username)
            setFollowers(response)
        }
        if (username) {
            takeUserProfile()
        }
    }, [username])

    const history = useHistory()
    return (
        <>
            <Header/>
            <div className="w-full bg-gray-background h-full flex justify-center pl-2 pr-2">
                <div className="flex flex-col max-w-xl w-full items-center bg-white p-4 border
                border-gray-primary mb-4 rounded">
                    <span className="cursor-pointer self-end"
                       onClick={() => history.push(`/p/${username}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </span>
                    <p className="text-blue-medium text-2xl">{username} Followers</p>
                    { followers?.length > 0 ? followers.map(follower => {
                    return <Follower key={follower} profileId={follower} />
                    }) : <p className="text-blue-medium">
                        User has no followers.</p>  }
                </div>
            </div>
        </>
    )
}
