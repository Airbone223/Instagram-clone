import React, {useState, useEffect} from 'react'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import {login} from '../services/auth-firebase'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email.')
        .required('Enter your email.'),
    password: Yup.string()
        .min(6, 'Password is too short.')
        .max(50, 'Password is too long.')
        .required('Enter your password.'),
})

export default function Login() {
    const history = useHistory()
    const [loginError, setError] = useState(null)
    const setLoginError = (value) => {
        setError(value)
        const timeout = setTimeout(() => {
            setError(null)
            clearInterval(timeout)
        }, 4000)
    }
    useEffect(() => {
        document.title = 'Instagram | Login'
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
                            email: '',
                            password: ''
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async ({email, password}, formikHelpers) => {
                            try {
                                await login(email, password)
                                history.push(ROUTES.DASHBOARD)
                            } catch (e) {
                                setLoginError(e.message)
                                formikHelpers.resetForm()
                            }
                        }}
                    >
                        {({errors, touched}) => (
                            <Form>
                                {loginError ? (
                                    <div className="text-red-primary text-center">{loginError}</div>
                                ) : null}
                                {errors.email && touched.email ? (
                                    <div className="text-red-primary text-center">{errors.email}</div>
                                ) : null}
                                {errors.password && touched.password ? (
                                    <div className="text-red-primary text-center">{errors.password}</div>
                                ) : null}
                                <label htmlFor="email" className="text-sm text-gray-base ml-1">Email</label>
                                <Field
                                    name="email"
                                    aria-label="Enter your email address"
                                    type="text"
                                    placeholder="email..."
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                     border border-gray-primary rounded"
                                />
                                <label htmlFor="password" className="text-sm text-gray-base ml-1">Password</label>
                                <Field
                                    name="password"
                                    aria-label="Enter your password"
                                    type="password"
                                    placeholder="password..."
                                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2
                                     border border-gray-primary rounded"
                                />
                                <button
                                    type="submit" className={`
                                bg-blue-medium text-white w-full mt-4 rounded h-8 font-bold 
                                ${(errors.email || errors.password) && ' opacity-50'}`}>Login
                                </button>
                            </Form>)}
                    </Formik>
                </div>
                <div
                    className="flex flex-col justify-center items-center w-full
                     bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm ">
                        Don`t have an account? {` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
