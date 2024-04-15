import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const loginStatus = useSelector((store) => store.login)
    const navigate = useNavigate();


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
        <div className='w-full h-auto flex p-[2%] absolute top-0 bg-gradient-to-b from-black z-20 justify-center md:justify-between'>
            <div data-layout="item" className="w-auto">
                <a data-uia="" href={loginStatus !== null ? '/browse' : '/'}>
                    <img className="w-[12rem] text-red-600 fill-current block" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Netflix Logo" />
                </a>
            </div>
            {loginStatus !== null && <div data-layout="item" className="w-[10%] text-center flex flex-row flex-wrap relative items-center group" >
                <a data-uia="" href={loginStatus !== null ? '/browse' : '/'}>
                    <img className="w-12 rounded-md block" src="https://occ-0-1946-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABR0fXUL7bceg4qHsYxYtSr7saR4_r1rkB6HzKAOQbjKGA0UMGsrpwBMCzaJg7DLz2GsU8mFMu0eVhXOCcoOyr59bYPQo2kc.png?r=213" alt="User Avatar" />
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
    )
}

export default Header;