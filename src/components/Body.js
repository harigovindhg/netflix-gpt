import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import Header from './Header';
import MovieDetails from './MovieDetails';
import GPTSearch from './GPTSearch';
import { useDispatch } from 'react-redux';
import { toggleOpaqueHeader } from '../utils/slices/windowSlice';
import Error from './Error';

const Body = () => {
    const dispatch = useDispatch();
    const AppContainer = () => {
        return (
            <div className='AppContainer'>
                <Header />
                <Outlet />
                <GPTSearch />
            </div>
        )
    }

    function resizeHeaderOnScroll() {
        const distanceY = window.scrollY || document.documentElement.scrollTop;
        const shrinkOn = 10;

        if (distanceY > shrinkOn) {
            dispatch(toggleOpaqueHeader(true))
        } else {
            dispatch(toggleOpaqueHeader(false))
        }
    }
    // window.addEventListener("scroll", resizeHeaderOnScroll);

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
            ],
            errorElement: <Error />
        }
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body;