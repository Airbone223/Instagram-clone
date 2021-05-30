import React, {useState, useEffect} from 'react'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {doesUserNameExist} from '../services/firebase'
import {createUser} from '../services/auth-firebase'

const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'username is too short. It must be at least 2 characters.')
        .max(50, 'username is too long.')
        .required('Enter your username.'),
    fullName: Yup.string()
        .min(2, 'fullName is too short. It must be at least 2 characters.')
        .max(50, 'fullName is too long.')
        .required('Enter your full name.'),
    email: Yup.string()
        .email('Invalid email.')
        .required('Enter your email.'),
    password: Yup.string()
        .min(6, 'Password is too short. It must be at least 6 characters.')
        .max(50, 'Password is too long.')
        .required('Set password'),
    repeatedPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords are not equal.')
        .required('Repeat password.')
})

export default function SignUp() {
    const history = useHistory()
    const [SignUpError, setError] = useState(null)
    const setSignUpError = (value) => {
        setError(value)
        const timeout = setTimeout(() => {
            setError(null)
            clearInterval(timeout)
        }, 4000)
    }
    useEffect(() => {
        document.title = 'Instagram | Sign Up'
    }, [])

    return (
        <div className="container flex flex-col sm:flex-row mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-4/5 sm:w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with instagram"/>
            </div>
            <div className="flex flex-col w-4/5 sm:w-2/5 mr-2">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4"/>
                    </h1>
                    <Formik
                        initialValues={{
                            username: '',
                            fullName: '',
                            email: '',
                            password: '',
                            repeatedPassword: ''
                        }}
                        validationSchema={SignUpSchema}
                        onSubmit={async ({ username, fullName, email, password }) => {
                            const userNameExists = await doesUserNameExist(username)
                            if (!userNameExists.length) {
                                try {
                                    await createUser(username, fullName, email, password)
                                    history.push(ROUTES.DASHBOARD)
                                } catch (e) {
                                    setSignUpError(e.message)
                                }
                            } else {
                                setSignUpError('That username is already taken, please try another.')
                            }
                        }}
                    >
                        {({errors, touched}) => (
                            <Form>
                                {SignUpError ? (
                                    <div className="text-red-primary text-center">{SignUpError}</div>
                                ) : null}
                                {errors.email && touched.email ? (
                                    <div className="text-red-primary text-center">{errors.email}</div>
                                ) : null}
                                {errors.password && touched.password ? (
                                    <div className="text-red-primary text-center">{errors.password}</div>
                                ) : null}
                                {errors.repeatedPassword && touched.repeatedPassword ? (
                                    <div className="text-red-primary text-center">{errors.repeatedPassword}</div>
                                ) : null}
                                {errors.username && touched.username ? (
                                    <div className="text-red-primary text-center">{errors.username}</div>
                                ) : null}
                                {errors.fullName && touched.fullName ? (
                                    <div className="text-red-primary text-center">{errors.fullName}</div>
                                ) : null}
                                <label htmlFor="username" className="text-sm text-gray-base ml-1">Username</label>
                                <Field
                                    autoComplete="off"
                                    name="username"
                                    aria-label="Enter your username"
                                    type="text"
                                    placeholder="username..."
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                     border border-gray-primary rounded"
                                />
                                <label htmlFor="fullName" className="text-sm text-gray-base ml-1">Full name</label>
                                <Field
                                    autoComplete="off"
                                    name="fullName"
                                    aria-label="Enter your full name"
                                    type="text"
                                    placeholder="full name..."
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                     border border-gray-primary rounded"
                                />
                                <label htmlFor="email" className="text-sm text-gray-base ml-1">Email</label>
                                <Field
                                    autoComplete="off"
                                    name="email"
                                    aria-label="Enter your email address"
                                    type="text"
                                    placeholder="email..."
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                    border border-gray-primary rounded"
                                />
                                <label htmlFor="password" className="text-sm text-gray-base ml-1">Password</label>
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    aria-label="Set password"
                                    type="password"
                                    placeholder="Set password..."
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                     border border-gray-primary rounded"
                                />
                                <label htmlFor="repeatedPassword" className="text-sm text-gray-base ml-1">Repeat
                                    password</label>
                                <Field
                                    autoComplete="off"
                                    name="repeatedPassword"
                                    aria-label="Repeat password"
                                    type="password"
                                    placeholder="Repeat password..."
                                    className="text-sm text-gray-base w-full mr-3 py-5
                                    px-4 h-2 border border-gray-primary rounded"
                                />
                                <button
                                    type="submit" className={`
                                bg-blue-medium text-white w-full mt-4 rounded h-8 font-bold 
                                ${(errors.email || errors.password || errors.repeatedPassword
                                        || errors.username || errors.fullName)
                                    && ' opacity-50'}`}>Sign up</button>
                            </Form>)}
                    </Formik>
                </div>
                <div
                    className="flex flex-col justify-center items-center w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm ">
                        Already have an account? {` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

