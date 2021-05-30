import { useEffect } from 'react'
import React from 'react'
import Header from '../components/header'

export default function notFound() {
    useEffect(() => {
        document.title = 'Instagram | Not-found'
    }, [])
    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <p className="text-center text-2xl">
                    Not Found!
                </p>
            </div>
        </div>
    )
}
