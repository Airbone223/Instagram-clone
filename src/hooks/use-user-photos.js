import {useState, useEffect, useContext} from 'react'
import UserContext from '../context/user'
import { getUserPhotos } from '../services/firebase'


export default function useUserPhotos() {
    const [photos, setPhotos] = useState(null)
    const {
        user: {uid: userId = '', displayName: username}
    } = useContext(UserContext)
    useEffect(() => {
        async function getPhotos() {
            const userPhotos = await getUserPhotos(userId, username)
            userPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
            setPhotos(userPhotos)
        }
        getPhotos()
    }, [userId])

    return {photos}
}


