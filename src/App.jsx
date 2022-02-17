import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import UserContext from './context/user';
import { useAuthListener } from './hooks/useAuthListenner';
import ProtectedRoute from './helpers/ProtectedRoute';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import FallBack from './components/FallBack';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/Not-found'));
const Explore = lazy(() => import('./pages/Explore'));
const ExploreAll = lazy(() => import('./pages/ExploreAll'));
const Message = lazy(() => import('./pages/Message'));
const EditAccount = lazy(() => import('./pages/EditAccount'));
const ViewComments = lazy(() => import('./components/post/ViewComments'));

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<FallBack />}>
          <Routes>
            <Route exact path="/"
              element={<ProtectedRoute user={user}>
                <DashBoard user={user} />
              </ProtectedRoute>}
            />
            <Route path="/login"
              element={<IsUserLoggedIn user={user} loggedInPath="/">
                <Login />
              </IsUserLoggedIn>}
            />
            <Route path="/sign-up"
              element={<IsUserLoggedIn user={user} loggedInPath="/">
                <SignUp />
              </IsUserLoggedIn>}
            />
            <Route path="/direct/inbox" element={<Message />} />
            <Route path="/p/:photos" element={<ViewComments />} />
            <Route path="/p/username" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/people" element={<ExploreAll />} />
            <Route path="/accounts/edit" element={<EditAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App;