import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { loginUser, logoutUser } from '../utils/slices/loginSlice';
import { NETFLIX_LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {
    const loginStatus = useSelector((store) => store.login)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email } = user;
                dispatch(loginUser({ uid: uid, displayName: displayName, email: email }));
                navigate('/browse');
            } else {
                dispatch(logoutUser());
                navigate('/');
            }
        });

        // Unsubscribe when the component unmounts
        return () => unsubscribe();

    }, [dispatch]);

    const handleSignOut = (e) => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            navigate("/error");
        });
    }

    // const handleRedirectToDashboard = () => {
    //     if (loginStatus !== null) {
    //         navigate('/browse');
    //     } else {
    //         navigate('/');
    //     }
    // }
    return (
        <>
            <div className='absolute w-full h-[100vh] bg-[#282537] bg-glowBGGradient z-[-1]' />
            <div className='w-full h-auto flex p-[2%] absolute top-0 bg-gradient-to-b from-[#0000009e] z-20 justify-center md:justify-between'>
                <div data-layout="item" className="w-auto">
                    <a data-uia="" href={loginStatus !== null ? '/browse' : '/'}>
                        <img className="w-[12rem] text-red-600 fill-current block" src={NETFLIX_LOGO} alt="Netflix Logo" />
                    </a>
                </div>
                {loginStatus !== null && <div data-layout="item" className="w-[10%] text-center flex flex-row flex-wrap relative items-center group" >
                    <a data-uia="" href={loginStatus !== null ? '/browse' : '/'}>
                        <img className="w-12 rounded-md block" src={USER_AVATAR} alt="User Avatar" />
                    </a>
                    <div class="absolute left-5 items-center hidden ml-6 group-hover:flex">
                        <span class="relative z-10 leading-none text-white whitespace-no-wrap ">
                            <div className={`relative animate-fadeInSmooth ease-in-out duration-500 ml-2 rounded-lg text-center content-center hover:bg-gray-600 bg-gray-300 hover:text-white text-gray-800`}>
                                <div className='border-gray-800 border-solid border-2 hover:border-gray-400 m-[2px] rounded-md'>
                                    <button className='p-4' onClick={e => handleSignOut(e)}>{'Sign Out'}</button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Header;