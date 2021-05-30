import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/user'
import {addComment} from '../../services/firebase'

export default function AddComment({docId, comments, setComments, commentInput}) {
    const [comment, setComment] = useState('')
    const {
        user: {displayName}
    } = useContext(UserContext)

    const handleSubmitComment = async (event) => {
        event.preventDefault()
        setComments([{displayName, comment}, ...comments])
        setComment('')
        await addComment(docId, displayName, comment)
    }
    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) => comment.length >= 1 ?
                    handleSubmitComment(event)
                    : event.preventDefault()
                }
            >
                <input aria-label="Add a comment"
                       type="text"
                       autoComplete="off"
                       className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                       name="add-comment"
                       placeholder="Add a comment..."
                       value={comment}
                       onChange={({target}) => setComment(target.value)}
                       ref={commentInput}
                />
                <button
                    type="button"
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    disabled={!comment.length}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
}
