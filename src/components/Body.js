import React from 'react';
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './Header';

const Body = () => {

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

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;