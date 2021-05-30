import React from 'react'
import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'

export default function Sidebar () {
    const { user: { docId, fullName, username, userId, following, avatar } } = useUser()
    return <div className="p-4 mr-2 container">
        <User fullName={fullName} username={username} avatar={avatar}/>
        <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
    </div>
}
