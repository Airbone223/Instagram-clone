import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Header from '../components/header'
import useUser from '../hooks/use-user'
import {addAvatar} from '../services/firebase'

export default function AddNewPost() {
    const history = useHistory()
    const {user} = useUser()
    const [src, selectFile] = useState(null)
    const [cropImgSrc, selectCropImgSrc] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({aspect: 1/1, keepSelection: true, unit: '%', width: 50})
    const [croppedImg, setCroppedImg] = useState(null)

    useEffect(() => {
        document.title = 'Instagram | Add avatar'
    }, [])

    const handleFileChange = e => {
        if (cropImgSrc) {selectCropImgSrc(null)}
        setFileName(e.target.files[0].name)
        selectFile(URL.createObjectURL(e.target.files[0]))
    }

    function getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas')
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )
        return new Promise( (resolve, reject) => {
            canvas.toBlob(async blob => {
                if (!blob) {
                    reject(new Error('Canvas is empty'))
                    console.error('Canvas is empty')
                    return
                }
                blob.name = fileName
                setCroppedImg(blob)
                selectCropImgSrc(URL.createObjectURL(blob))
            }, 'image/jpeg')
        })
    }

    async function addNewAvatar ()  {
        if (!croppedImg) {
            return
        }
        await addAvatar(user.docId, user.avatar, croppedImg)
        history.push(`/p/${user.username}`)
    }

    return (
        <>
            <Header/>
            {user?.username && <div className="w-full bg-gray-background h-full flex justify-center pl-2 pr-2">
                <div className="flex flex-col max-w-xl w-full items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <span className="cursor-pointer self-end"
                    onClick={() => history.push(`/p/${user.username}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </span>
                    <h1 className="text-3xl w-full text-center mb-2">
                        Add new avatar
                    </h1>
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                             viewBox="0 0 48 48" aria-hidden="true">
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4
                                    0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4
                                    4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>
                        {!src &&   <p className="text-blue-medium">
                            please select your photo
                        </p>}
                        {src && !croppedImg && <p className="text-blue-medium">
                            good, now select the
                            desired part of the photo and click <strong>crop</strong>
                        </p>}</p>
                        {croppedImg && <p className="text-blue-medium">
                            cool, now you see the result, you can also choose another photo,
                            or click <strong>add avatar</strong>
                        </p>}
                        <div className="flex text-sm text-gray-600 flex-wrap justify-center">
                            <input accept="image/*"
                                   aria-label="chose image"
                                   type="file"
                                   className="bg-blue-medium cursor-pointer text-center"
                                   onChange={handleFileChange}
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG up to 10MB
                        </p>
                    </div>
                    <div className="flex-col w-full flex justify-center mt-2">
                        {src && !cropImgSrc && <> <ReactCrop src={src} onImageLoaded={setImage}
                                                             crop={crop}
                                                             onChange={setCrop}
                        />
                            <button
                                disabled={!crop.width}
                                type="submit"
                                className={`bg-blue-medium text-white w-full rounded-b
                                 h-8 font-bold ${!crop.width && 'opacity-50'}
                        `} onClick={() => getCroppedImg(image, crop, fileName)}>crop</button></>}
                        { cropImgSrc &&  <>
                            <img src={cropImgSrc} alt="avatar-photo" />
                            <button
                                disabled={!croppedImg}
                                type="submit"
                                className={`bg-blue-medium text-white w-full
                             rounded-b h-8 font-bold ${!croppedImg && 'opacity-50'}`}
                                onClick={addNewAvatar}>add avatar
                            </button></>
                        }
                    </div>
                </div>
            </div>}
        </>
    )
}

