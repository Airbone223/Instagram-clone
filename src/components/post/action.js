import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/user'
import {toggleLikes} from '../../services/firebase'

export default function Action({docId, totalLikes, userLikedPhoto, handleFocus}) {
    const {
        user: {
            uid: userId = ''
        }
    } = useContext(UserContext)

    const [toggleLiked, setToggleLiked] = useState(userLikedPhoto)
    const [likes, setLikes] = useState(totalLikes)
    const handleToggleLikes = async () => {
        setToggleLiked(toggleLiked => !toggleLiked)
        await toggleLikes (docId, userId, toggleLiked)
        setLikes(likes => toggleLiked ? --likes : ++likes)
    }

    return (<>
        <div className="flex justify-between p-4">
            <div className="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`sm:h-8 sm:w-8 h-6 w-6 mr-4 select-none cursor-pointer ${
                        toggleLiked ? 'fill-red text-red-primary' : 'text-black-light' 
                    }`}
                    onClick={handleToggleLikes}
                    onKeyDown={ e => {
                        if (e.key === 'Enter') {
                            handleToggleLikes()
                        }
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5
                            4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:h-8 sm:w-8 h-6 w-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleFocus}
                    onKeyDown={ e => {
                        if (e.key === 'Enter') {
                            handleFocus()
                        }
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2
                         2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                </svg>
            </div>
        </div>
        <div className="p-4 py-0">
            <p className="text-sm font-bold">
                {likes === 1 ? `${likes} like` : `${likes} likes`}
            </p>
        </div>
    </>)
}

Action.propTypes = {
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    totalLikes: PropTypes.number.isRequired,
    handleFocus: PropTypes.func.isRequired
}

