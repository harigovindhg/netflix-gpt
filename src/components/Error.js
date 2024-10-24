import { useRouteError } from 'react-router-dom';

const Error = () => {
    const routeError = useRouteError();
    return (
        <>
            <div className='flex flex-col bg-white h-screen w-screen items-center'>
                <div className=''>
                    <h1 className='text-9xl opacity-50'><strong>404</strong></h1>
                    <p><strong>Page not found!</strong></p>
                    <p>Something went wrong🤔</p>
                    <hr />
                    <div className=''>
                        <h2>Error Message</h2>
                        <p style={{ color: 'red' }}>{routeError?.error?.message}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error;