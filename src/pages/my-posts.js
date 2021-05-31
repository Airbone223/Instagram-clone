import Header from '../components/header'
import React, {useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Post from '../components/post/post'
import Skeleton from 'react-loading-skeleton'
import useUserPhotos from '../hooks/use-user-photos'

export default function MyPosts () {
    const { photos } = useUserPhotos()
    const { username } = useParams()

    useEffect( () => {
        document.title = `Instagram | ${username} posts`
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
                    <div className="mt-5 w-full mr-2">
                        {!photos?.length ? (
                            <Skeleton count={4} height={500} className="mb-5" />
                        ) : photos.length > 0 ? (
                            photos.map(content =>  <Post key={content.docId} content={content}/>)
                        ) : (
                            <p className="text-center text-2xl text-blue-medium">No posts yet</p>
                        )}
                    </div>)
                </div>
            </div>
        </>
    )
}
