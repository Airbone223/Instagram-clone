import React, {useContext, useEffect, useState} from 'react'
import {Link, useHistory } from 'react-router-dom'
import UserContext from '../context/user'
import {getUserByUsername} from '../services/firebase'
import * as ROUTES from '../constants/routes'
import {logout} from '../services/auth-firebase'
import {defaultAvatarUrl} from '../constants/constants'


export default function Header() {
    const { user } = useContext(UserContext)
    const [userProfile, setUserProfile] = useState(null)
    const history = useHistory()
    useEffect(() => {
        const takeUserProfile = async() => {
            const profile = await getUserByUsername(user.displayName)
            setUserProfile(profile[0])
        }
        if (user?.displayName) {
            takeUserProfile()
        }
    }, [])

    return (
        <header className="xs:h-16 h-20 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-center ss:justify-between h-full">
                    <div className="text-gray-700 text-center ss:flex hidden items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 ml-2"/>
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {user ?
                            (<>
                                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                    <svg
                                        className="w-10 h-10 xs:w-8 xs:h-8 mr-6 text-black-light cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1
                                1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-63 0h6"
                                        />
                                    </svg>
                                </Link>
                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={async () => {
                                        await logout()
                                    history.push(ROUTES.LOGIN)}}
                                    onKeyDown={async (event) => {
                                        if (event.key === 'Enter') {
                                          await logout()
                                        }
                                    }}
                                >
                                    <svg
                                        className="w-10 h-10 xs:w-8 xs:h-8 mr-6 text-black-light cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0
                                            013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                                {userProfile?.username ?   (<div className="flex items-center cursor-pointer mr-2">
                                    <Link to={`/p/${userProfile.username.toLowerCase()}`}>
                                        <img
                                            className="rounded-full w-10 h-10 xs:w-8 xs:h-8 flex"
                                            src={userProfile.avatar}
                                            alt={`${userProfile.username}-avatar`}/>
                                    </Link>
                                </div>) : <img
                                    className="rounded-full w-10 h-10 xs:w-8 xs:h-8 flex"
                                    src={defaultAvatarUrl}
                                    alt="default-avatar"/>}
                            </>)
                            :
                            (<>
                                <Link to={ROUTES.LOGIN}>
                                    <button
                                        className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                        type="button">Login</button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button
                                        className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                                        type="button">Sign Up</button>
                                </Link>
                            </>)}
                    </div>
                </div>
            </div>
        </header>
    )
}
