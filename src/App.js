import React, {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as ROUTES from './constants/routes'
import './styles/app.css'
import useAuthListener from './hooks/use-auth-listener'
import UserContext from './context/user'
import ProtectedRoute from './helpers/protected-route'
import Loading from './components/loading'

const Login = lazy(() => import ('./pages/login'))
const SignUp = lazy(() => import ('./pages/signup'))
const Dashboard = lazy(() => import ('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const NotFound = lazy(() => import ('./pages/notFound'))
const AddNewPost = lazy(() => import ('./pages/add-new-post'))
const AddAvatar = lazy(() => import ('./pages/add-avatar'))
const Followers = lazy(() => import('./pages/followers'))
const Following = lazy(() => import('./pages/following'))
const MyPosts = lazy(() => import('./pages/my-posts'))

export default function App() {

    const {user} = useAuthListener()
    return (
        <UserContext.Provider value={{user}}>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login} />
                        <Route path={ROUTES.SIGN_UP} component={SignUp} />
                        <Route path={ROUTES.PROFILE} component={Profile} exact/>
                        <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                            <Dashboard/>
                        </ProtectedRoute>
                        <ProtectedRoute user={user} path={ROUTES.ADD_POST} exact>
                            <AddNewPost/>
                        </ProtectedRoute>
                        <ProtectedRoute user={user} path={ROUTES.ADD_AVATAR} exact>
                            <AddAvatar/>
                        </ProtectedRoute>
                        <ProtectedRoute user={user} path={ROUTES.FOLLOWERS}>
                            <Followers/>
                        </ProtectedRoute>
                        <ProtectedRoute user={user} path={ROUTES.FOLLOWING}>
                            <Following/>
                        </ProtectedRoute>
                        <ProtectedRoute user={user} path={ROUTES.POSTS}>
                            <MyPosts/>
                        </ProtectedRoute>
                        <Route component={NotFound}/>
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    )
}
