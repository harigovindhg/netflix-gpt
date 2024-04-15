import React, { useEffect } from 'react';
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../utils/slices/loginSlice';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import Header from './Header';

const Body = () => {
    const dispatch = useDispatch();

    const AppContainer = () => {
        return (
            <div className='AppContainer'>
                <Header />
                <Outlet />
            </div>
        )
    }

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <AppContainer />,
            children: [
                {
                    path: '/',
                    element: <Login />
                },
                {
                    path: '/browse',
                    element: <Browse />
                }
            ]
        }
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email } = user;
                dispatch(loginUser({ uid: uid, displayName: displayName, email: email }));
            } else {
                dispatch(logoutUser());
            }
        });
    }, [dispatch]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;