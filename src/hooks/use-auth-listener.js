import { useState, useEffect } from 'react'
import { firebase } from '../lib/firebase'

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

    useEffect(() => {
        firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            } else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })
    }, [firebase])

    return { user }
}
