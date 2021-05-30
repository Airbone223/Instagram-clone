import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import PostHeader from './post-header'
import Image from './image'
import Action from './action'
import Footer from './footer'
import Comments from './comments'

export default function Post ({content}) {
    const commentInput = useRef(null)
    const handleFocus = () => {
        commentInput.current.focus()
    }
return <div className="rounded col-span-4 border bg-white border-gray-primary mb-12 ml-2">
    <PostHeader username={content.username} />
    <Image
        imageSrc={content.imageSrc}
        caption={content.caption}/>
    <Action
        docId={content.docId}
        totalLikes={content.likes.length}
        userLikedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
    />
    <Footer caption={content.caption}
            username={content.username}/>
    <Comments comments={content.comments}
              docId={content.docId}
              commentInput={commentInput}
              dateCreated={content.dateCreated}/>
</div>

}

Post.propTypes = {
    content: PropTypes.shape({
        caption: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired,
        docId: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        likes: PropTypes.array.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired
    })
}
