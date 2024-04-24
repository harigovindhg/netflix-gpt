import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import Header from './Header';
import MovieDetails from './MovieDetails';
import GPTSearch from './GPTSearch';

const Body = () => {

    const AppContainer = () => {
        return (
            <div className='AppContainer'>
                <Header />
                <Outlet />
                <GPTSearch />
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
                },
                {
                    path: '/browse/detail/:movieId/:isTVShow?',
                    element: <MovieDetails />
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