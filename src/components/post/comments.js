import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {formatDistance} from 'date-fns'
import {Link} from 'react-router-dom'
import AddComment from './add-commet'

export default function Comments({comments, docId, commentInput, dateCreated}) {
    const [allComments, setAllComments] = useState(comments)
    const [viewAll, setViewAll] = useState(false)
    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {allComments.length > 3 && (
                    <p
                        className="text-sm text-gray-base mb-1 cursor-pointer"
                        onClick={() => {setViewAll(!viewAll)}}
                    >
                        {!viewAll ? `View all ${allComments.length} comments` : `Skip comments`}
                    </p>
                )}
                {viewAll && allComments.map(item => (
                    <p key={`${item.comment}-${item.displayName}`}
                       className="mb-1"
                    >
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                {!viewAll && allComments.slice(0, 3).map(item => (
                    <p key={`${item.comment}-${item.displayName}`}
                    className="mb-1"
                    >
                        <Link to={`/p/${item.displayName}`}>
                            <span className="mr-1 font-bold">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                <p className="text-gray-base uppercase text-xs mt-2">{formatDistance(dateCreated, new Date())} ago</p>
            </div>
            <AddComment
                docId={docId}
                comments={allComments}
                setComments={setAllComments}
                commentInput={commentInput}
            />
        </>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    docId: PropTypes.string.isRequired,
    commentInput: PropTypes.object.isRequired,
    dateCreated: PropTypes.number.isRequired
}
