import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { loginUser, logoutUser } from '../utils/slices/loginSlice';
import { toggleGPTSearchBar } from '../utils/slices/gptSlice';
import { NETFLIX_LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const loginStatus = useSelector((store) => store.login);
    const opaqueHeader = useSelector((store) => store.windows.opaqueHeader);
    const isGptSearchOpen = useSelector((store) => store.gpt.showGPTSearch);
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

    }, [dispatch, navigate]);

    const handleSignOut = (e) => {
        if (isGptSearchOpen) {
            dispatch(toggleGPTSearchBar());
        }
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            navigate("/error");
        });
    }

    const showSignOutTooltip = (e) => {
        if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13))
            setShowTooltip(!showTooltip);
    }

    const handleGPTSearchToggle = (e) => {
        if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
            dispatch(toggleGPTSearchBar());
        }
    }

    return (
        <>
            <div className={`w-full h-auto flex fixed top-0 z-30 ${opaqueHeader ? 'sticky-header-blur px-[2%] pt-[1%] pb-0' : 'p-[2%] bg-gradient-to-b from-[#0000009e]'} transition-all ease-in-out duration-250 justify-center md:justify-between`}>
                <div data-layout="item" className="w-auto">
                    <a data-uia="" href={loginStatus !== null ? '/browse' : '/'}>
                        <img className={`w-[12rem] ${opaqueHeader ? 'opacity-60 hover:opacity-100' : 'opacity-100'} transition-all ease-in-out duration-500 fill-current block`} src={NETFLIX_LOGO} alt="Netflix Logo" />
                    </a>
                </div>
                {loginStatus !== null &&
                    <div className='w-fit flex flex-row items-center'>
                        <div className="items-center flex w-fit">
                            <button className="z-30 leading-none flex flex-row text-white whitespace-no-wrap w-full mr-4" onClick={e => handleGPTSearchToggle(e)} onKeyDown={handleGPTSearchToggle}>
                                <div className={`relative blurred-box animate-fadeInSmooth group/ai ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                                    <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                                        <div className='p-4 text-white flex flex-row'>
                                            <h2 className='contents'>
                                                <svg className="overflow-visible md:mr-2 [--scale-x:1.4] [--scale-y:1.4]" data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                                                    <path className="origin-center [transform-box:fill-box] motion-safe:group-hover/ai:animate-[scale_0.5s_0.15s] motion-safe:group-active/ai:animate-[scale_0.5s_0.15s]" d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#ffff"></path>
                                                    <path className="origin-center [transform-box:fill-box] motion-safe:group-hover/ai:animate-[scale_0.5s_0.3s] motion-safe:group-active/ai:animate-[scale_0.5s_0.3s]" d="M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z" fill="#ffff"></path>
                                                    <path className="origin-center [transform-box:fill-box] motion-safe:group-hover/ai:animate-[scale_0.5s_0s] motion-safe:group-active/ai:animate-[scale_0.5s_0s]" d="M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z" fill="#ffff"></path>
                                                </svg>
                                                <p className='hidden md:block'>{'Smart Search'}</p>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div data-layout="item" className="w-fit text-center flex md:flex-col flex-row flex-wrap relative items-center group" >
                            <div className='flex flex-row items-center' tabIndex={0} onKeyDown={showSignOutTooltip} onClick={e => showSignOutTooltip(e)}>
                                <img className="w-12 rounded-md block" src={USER_AVATAR} alt="User Avatar" />
                                <span className={`hidden md:block border-t-white border-l-transparent border-r-transparent border-b-transparent border-solid border-t-4 border-r-4 border-b-0 border-l-4 ml-3 group-hover:rotate-180 ${showTooltip && 'rotate-180'}`} role="presentation"></span>
                            </div>
                            {showTooltip &&
                                <div className="absolute top-8 -left-8 md:top-8 md:left-auto flex-col items-center mt-6 flex w-max">
                                    <span className="relative z-10 leading-none text-white whitespace-no-wrap ">
                                        <div className={`relative animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center hover:bg-gray-600 bg-gray-300 hover:text-white text-gray-800`}>
                                            <div className='border-gray-800 border-solid border-2 hover:border-gray-400 m-[2px] rounded-md'>
                                                <button tabIndex={0} className='p-4' onClick={e => handleSignOut(e)}>{'Sign Out'}</button>
                                            </div>
                                        </div>
                                    </span>
                                </div>}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Header;