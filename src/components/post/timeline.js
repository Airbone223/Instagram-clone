import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../../hooks/use-photos'
import Post from './post'

export default function Timeline () {
    const { photos } = usePhotos()
    return (
        <div className="col-span-2 mr-2">
            {!photos ? (
                <Skeleton count={4} height={500} className="mb-5" />
            ) : photos.length > 0 ? (
                photos.map(content =>  <Post key={content.docId} content={content}/>)
            ) : (
                <p className="text-center text-2xl">Follow people to see photos.</p>
            )}
        </div>)
}
