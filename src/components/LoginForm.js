import React from 'react';
import { useState } from 'react';

const LoginForm = () => {
    const [showModal, setShowModal] = useState('default');

    const handleOnMouseMove = (event) => {
        const { currentTarget } = event;
        const rect = currentTarget.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;

        currentTarget.style.setProperty('--mouse-x', `${x}px`);
        currentTarget.style.setProperty('--mouse-y', `${y}px`);
    }

    const closeLoginModal = (event) => {
        if (event === 'click' || event.type === 'click') {
            setShowModal('default');
        }
    }

    const showForm = (type) => {
        setShowModal(type);
    }
    return (
        <div className='w-full flex justify-center top-[25%] absolute bg-opacity-15'>
            <div onMouseMove={event => handleOnMouseMove(event)} className={`${showModal === 'default' ? 'w-1/3' : 'w-1/4'} ease-in-out duration-200 flex justify-center h-[70%] bg-[rgba(255,255,255,0.15)] rounded-xl text-white relative before:bg-radialglow before:rounded-xl before:content-[""] before:h-full before:left-0 before:w-full before:z-[3] before:absolute before:opacity-0 before:transition-opacity before:duration-500  hover:before:opacity-100 after:bg-radialglowAfter after:rounded-xl after:content-[""] after:h-full after:left-0 after:w-full after:z-[1] after:absolute after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100 before:pointer-events-none after:pointer-events-none`}>
                <div className='bg-[rgb(15,15,15)] rounded-xl m-[1px] flex flex-col relative flex-grow-[1] h-[calc(100%-2px)] w-[calc(100%-2px)] z-[2]'>
                    {showModal === 'default' && <div className={`flex flex-col animate-fadeInSmooth`}>
                        <h1 className='font-bold text-5xl flex self-center pt-[10%]'>Welcome User!</h1>
                        <div className='flex flex-row px-[15%] pb-[20%] pt-[10%] justify-center'>
                            <div className='flex flex-col justify-center'>
                                <label>Existing User?</label>
                                <button className='text-[rgba(255,255,255)] font-bold text-3xl rounded-sm hover:text-[rgba(255,255,255,0.75)] hover:underline ease-in-out duration-300' onClick={e => showForm('logIn')}>Sign In</button>
                            </div>
                            <div className='border-l-2 border-gray-300 border-solid mx-16 h-40' />
                            <div className='flex flex-col justify-center'>
                                <label>New User?</label>
                                <button className='text-red-700 rounded-sm font-bold text-3xl hover:text-red-600 hover:underline ease-in-out duration-300' onClick={e => showForm('signUp')}>Sign Up</button>
                            </div>
                        </div>
                    </div>}
                    {showModal !== 'default' && <div className='animate-fadeInSmooth flex flex-col ease-in-out duration-200'>
                        <div className="w-[15%] self-end opacity-60 hover:opacity-100 ease-in-out duration-300 active:" onClick={e => closeLoginModal(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
                                <line x1="15" y1="15" x2="25" y2="25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>
                                <line x1="25" y1="15" x2="15" y2="25" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeMiterlimit="10"></line>
                            </svg>
                        </div>
                        <form className='flex flex-col px-[15%] pb-[5%]'>
                            <label className='font-bold mb-5 text-3xl'>{`${showModal === 'logIn' ? 'Sign In' : 'Sign Up'}`}</label>
                            {showModal === 'signUp' && <input type="text" placeholder='Full Name' className='px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid' />}
                            <input type="text" placeholder='Email Address' className='px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid' />
                            <input type="password" placeholder='Password' className='px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid' />
                            {showModal === 'signUp' && <input type="password" placeholder='Confirm Password' className='px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid' />}
                            <button className='p-4 mt-4 bg-red-700 rounded-[0.1875rem] hover:bg-red-600 ease-in-out duration-300'>{`${showModal === 'logIn' ? 'Sign In' : 'Sign Up'}`}</button>
                        </form>
                        <div className='pb-[15%] px-[15%]'>
                            {showModal === 'logIn' ? <p>New to Netflix? <button className='text-red-700 font-bold hover:underline' onClick={e => showForm('signUp')}>Sign up now.</button></p> : <p>Already have an account? <button className='text-red-700 font-bold hover:underline' onClick={e => showForm('logIn')}>Log in.</button></p>}
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default LoginForm;