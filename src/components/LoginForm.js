import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { loginUser } from '../utils/slices/loginSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const [showModal, setShowModal] = useState('default');
    const [errorMessage, setErrorMessage] = useState({});
    const [fullNameErrorMessage, setFullNameErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    // const [signUpSuccessMessage, setSignUpSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

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
            setErrorMessage('');
            setConfirmPasswordError('');
            setFullNameErrorMessage('')
        }
    }

    const showForm = (type) => {
        setShowModal(type);
    }

    const handleSubmit = (event) => {
        const fullNameValue = fullName?.current?.value;
        const emailId = email?.current?.value;
        const passwordValue = password?.current?.value;
        const confirmPasswordValue = confirmPassword?.current?.value;
        const message = checkValidData({ emailId, password: passwordValue });
        setErrorMessage(message);
        if (passwordValue !== confirmPasswordValue) setConfirmPasswordError('Passwords do not match');
        else setConfirmPasswordError('');
        if (fullNameValue === '') setFullNameErrorMessage('Full Name cannot be empty');
        else setFullNameErrorMessage('');
        if (message === undefined) {
            setIsLoading(true);
            if (showModal === 'signUp' && confirmPasswordError === '' && fullNameErrorMessage === '') {
                createUserWithEmailAndPassword(auth, emailId, passwordValue)
                    .then((userCredential) => {
                        const user = userCredential.user
                        updateProfile(user, {
                            displayName: fullNameValue
                        }).then(() => {
                            const { uid, displayName, email } = auth.currentUser;
                            dispatch(loginUser({ uid: uid, displayName: displayName, email: email }));
                            setLoginErrorMessage(``);
                            navigate("/browse");
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            setLoginErrorMessage(`${errorCode}-${errorMessage}`);
                            setIsLoading(false);
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setLoginErrorMessage(`${errorCode}-${errorMessage}`);
                        setIsLoading(false);
                    });
            }
            if (showModal === 'logIn') {
                signInWithEmailAndPassword(auth, emailId, passwordValue)
                    .then((userCredential) => {
                        setLoginErrorMessage(``);
                        navigate("/browse");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setLoginErrorMessage(`${errorCode}-${errorMessage}`);
                        if (errorCode === 'auth/invalid-credential') {
                            setLoginErrorMessage(`Invalid Email Id or Password`);
                            setIsLoading(false);
                        }
                    })
            }
        }
    }

    return (
        <div className='w-full flex justify-center top-[15rem] absolute bg-opacity-15'>
            <div onMouseMove={event => handleOnMouseMove(event)} className={`${showModal === 'default' ? 'w-[40rem]' : 'w-96'} ease-in-out duration-200 flex justify-center h-[70%] bg-[rgba(255,255,255,0.15)] rounded-xl text-white relative before:bg-radialglow before:rounded-xl before:content-[""] before:h-full before:left-0 before:w-full before:z-[3] before:absolute before:opacity-0 before:transition-opacity before:duration-500  hover:before:opacity-100 after:bg-radialglowAfter after:rounded-xl after:content-[""] after:h-full after:left-0 after:w-full after:z-[1] after:absolute after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100 before:pointer-events-none after:pointer-events-none`}>
                <div className='bg-[rgb(15,15,15)] rounded-xl m-[1px] flex flex-col relative flex-grow-[1] h-[calc(100%-2px)] w-[calc(100%-2px)] z-[2]'>
                    {showModal === 'default' && <div className={`flex flex-col animate-fadeInSmooth`}>
                        <h1 className='font-bold text-center text-5xl flex self-center pt-[10%]'>Welcome User!</h1>
                        <div className='flex flex-row px-[15%] pb-[20%] pt-[10%] justify-center'>
                            <div className='flex flex-col justify-center text-center'>
                                <label>Existing User?</label>
                                <button className='text-[rgba(255,255,255)] font-bold text-3xl rounded-sm hover:text-[rgba(255,255,255,0.75)] hover:underline ease-in-out duration-300' onClick={e => showForm('logIn')}>Sign In</button>
                            </div>
                            <div className='border-l-2 border-gray-300 border-solid mx-16 h-40' />
                            <div className='flex flex-col justify-center text-center'>
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
                        <form onSubmit={e => e.preventDefault()} className='flex flex-col px-[15%] pb-[5%]'>
                            {/* {signUpSuccessMessage !== '' && <span className='p-2 mb-2 bg-green-900 border-green-400 border-solid border-2 rounded-lg'><p className='text-green-500'>{signUpSuccessMessage}</p></span>} */}
                            <label className='font-bold mb-5 text-3xl'>{`${showModal === 'logIn' ? 'Sign In' : 'Sign Up'}`}</label>
                            {showModal === 'signUp' &&
                                <>
                                    <input
                                        type="text"
                                        placeholder='Full Name'
                                        autoComplete='full-name'
                                        ref={fullName}
                                        className={`${fullNameErrorMessage !== '' && 'border-red-500'} px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid`}
                                    />
                                    {fullNameErrorMessage !== '' && <p className='text-red-500 italic font-bold'>{fullNameErrorMessage}</p>}
                                </>
                            }
                            <input
                                type="text"
                                placeholder='Email Address'
                                autoComplete='emailid'
                                ref={email}
                                className={`${errorMessage?.field === 'email' && 'border-red-500'} px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid`}
                            />
                            {errorMessage?.field === 'email' && <p className='text-red-500 italic font-bold'>{errorMessage?.message}</p>}
                            <input
                                type="password"
                                placeholder='Password'
                                autoComplete='current-password'
                                ref={password}
                                className={`${errorMessage?.field === 'password' && 'border-red-500'} px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid`}
                            />
                            {errorMessage?.field === 'password' && <p className='text-red-500 italic font-bold'>{errorMessage?.message}</p>}
                            {showModal === 'signUp' &&
                                <>
                                    <input
                                        type="password"
                                        placeholder='Confirm Password'
                                        autoComplete='confirm-password'
                                        ref={confirmPassword}
                                        className={`${confirmPasswordError !== '' && 'border-red-500'} px-3 py-4 my-2 h-[10%] rounded-md bg-[rgba(255,255,255,0.05)] border-gray-500 border border-solid`}
                                    />
                                    {confirmPasswordError !== '' && <p className='text-red-500 italic font-bold'>{confirmPasswordError}</p>}
                                </>
                            }
                            {loginErrorMessage !== '' && <p className='text-red-500 italic font-bold'>{loginErrorMessage}</p>}
                            {/* <button className='p-4 mt-4 bg-red-700 rounded-[0.1875rem] hover:bg-red-600 ease-in-out duration-300' onClick={(e) => handleSubmit(e)}>{isLoading ? <div class="block relative w-[50px] h-[50px] "><div className='absolute border-4 border-solid border-white opacity-100 rounded-[50%] animate-rippleSpinner'></div><div className='absolute border-4 border-solid border-white opacity-100 rounded-[50%] animate-rippleSpinner animate-delay'></div></div> : `${showModal === 'logIn' ? 'Sign In' : 'Sign Up'}`}</button> */}
                            {isLoading ? <div className='mt-4 flex justify-center overflow-hidden bg-red-700 rounded-[0.1875rem]'><div class="inline-block relative w-[58px] h-[58px]"><div className='absolute border-4 border-solid border-white opacity-100 rounded-[50%] animate-rippleSpinner'></div><div className='absolute border-4 border-solid border-white opacity-100 rounded-[50%] animate-rippleSpinner'></div></div></div> : <button className='mt-4 h-[50px] bg-red-700 rounded-[0.1875rem] hover:bg-red-600 ease-in-out duration-300' onClick={(e) => handleSubmit(e)}>{`${showModal === 'logIn' ? 'Sign In' : 'Sign Up'}`}</button>}
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