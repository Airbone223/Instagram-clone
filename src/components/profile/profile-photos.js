import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

export default function ProfilePhotos({photos}) {
    return (
        <div className="h-16 border-t border-gray-primary mt-12 pt-4 mr-5 ml-5">
            <div className="grid xs:grid-cols-2 gap-8 md:grid-cols-3 mt-4 pb-10">
                {
                    !photos ? (
                        <Skeleton count={12} width={320} height={400}/>
                    ) : photos.length > 0 ? (
                        photos.map(photo => {
                            return <div
                                key={photo.docId}
                                className="relative group"
                            ><img className="w-full h-auto"
                                src={photo.imageSrc}
                                alt={photo.caption}
                            />
                            <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly
                             items-center h-full bg-black-faded group-hover:flex hidden">
                                <p className="flex items-center text-white font-bold text-xl xs:text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-10 w-10 xs:h-7 xs:w-7" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4
                                              0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                              clipRule="evenodd" />
                                    </svg>
                                    {photo.likes.length}
                                </p>
                                <span className="flex items-center text-white font-bold text-xl xs:text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-10 w-10 xs:h-7 xs:w-7"
                                         viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0
                                               012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                              clipRule="evenodd" />
                                    </svg>
                                    {photo.comments.length}
                                </span>
                            </div>
                            </div>
                        })
                    ) : (
                     null
                    )
                }
            </div>
            {!photos || (photos.length === 0 && <p className="text-center text-2xl">No posts yet</p>)}
        </div>
    )
}

ProfilePhotos.propTypes = {
    photos: PropTypes.array.isRequired
}
