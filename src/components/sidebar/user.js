import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

export default function User({fullName, username, avatar}) {
return (
    !username || !fullName ? (
        <Skeleton count={1} height={65}/>
    ) : (
        <Link to={`/p/${username}`} className="flex flex-wrap mb-6 justify-center xs:justify-start items-center">
            <div>
                <img
                    className="rounded-full w-24 h-24 xs:w-16 xs:h-16 mr-3"
                    src={avatar} alt={`${username}-avatar`}/>
            </div>
            <div>
                <p className="font-bold text-xl xs:text-sm">{username}</p>
                <p className="text-sm text-xl xs:text-sm">{fullName}</p>
            </div>
        </Link>
    )
)
}

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string,
    avatar: PropTypes.string

}


