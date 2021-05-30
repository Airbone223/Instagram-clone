import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import Timeline from '../components/post/timeline'
import Sidebar from '../components/sidebar/sidebar'

export default function Dashboard () {

    useEffect(() => {
        document.title = 'Instagram'
    }, [])
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="xs:grid xs:grid-cols-3 xs:gap-2 xs:justify-between flex
            flex-col-reverse mx-auto max-w-screen-lg xs:items-start items-center">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
}
