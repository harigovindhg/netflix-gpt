import React from 'react';
import Header from './Header';
import LoginForm from './LoginForm';

const Login = () => {

    return (
        <div className='overflow-hidden'>
            <img className='absolute max-h-[100vh] w-full opacity-25 z-[-1]' src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="" />
            <Header />
            <div className='text-white w-full flex flex-col justify-center top-[12%] absolute'>
                <h1 className='font-bold text-5xl flex self-center'>Unlimited movies, TV shows and more </h1>
                <p className='text-2xl flex self-center'>Watch anywhere. Cancel anytime.</p>
            </div>
            <LoginForm />
        </div>
    )
}

export default Login