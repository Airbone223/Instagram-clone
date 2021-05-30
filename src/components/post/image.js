import React from 'react'
import PropTypes from 'prop-types'

export default function Image ({ imageSrc, caption }) {
    return <div>
        <img className="w-full h-auto"
            src={imageSrc}
            alt={caption}/>
    </div>
}

Image.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}
