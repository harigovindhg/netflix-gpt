import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { loginUser, logoutUser } from '../utils/slices/loginSlice';
import { toggleGPTSearchBar } from '../utils/slices/gptSlice';
import { NETFLIX_LOGO, USER_AVATAR } from '../utils/constants';
import celluloidLogo from './common/assets/images/celluloid.png';
import AIButton from './AIButton';

const Header = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const loginStatus = useSelector((store) => store.login);
    // const opaqueHeader = useSelector((store) => store.windows.opaqueHeader);
    const opaqueHeader = true;
    const isGptSearchOpen = useSelector((store) => store.gpt.showGPTSearch);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let isDragging = false;
    let headerButton, floatingButton, removeZone, removeText, startX, startY, initialX, initialY;
    let isFloating = false;

    useEffect(() => {
        bindFloatingButtonControls();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email } = user;
                dispatch(loginUser({ uid: uid, displayName: displayName, email: email }));
                if (window.location.pathname === '/') {
                    navigate('/browse');
                }
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

    const bindFloatingButtonControls = () => {
        headerButton = document.getElementById('headerButton');
        floatingButton = document.getElementById('floatingButton');
        removeZone = document.getElementById('removeZone');
        removeText = document.getElementById('removeText');

        floatingButton.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        floatingButton.addEventListener('touchstart', startDragging);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDragging);

        window.addEventListener('scroll', () => handleScroll(floatingButton));
    }

    function handleScroll(floatingButton) {
        if (window.scrollY > 50 && !isFloating) {
            isFloating = true;
            if (floatingButton) {
                floatingButton.style.opacity = '1';
                floatingButton.style.pointerEvents = 'auto';
                floatingButton.style.right = '20px';
                floatingButton.style.bottom = '20px';
            }
        } else if (window.scrollY <= 50 && isFloating) {
            isFloating = false;
            if (floatingButton) {
                floatingButton.style.opacity = '0';
                floatingButton.style.pointerEvents = 'none';
            }
        }
    }

    function startDragging(e) {
        isDragging = true;
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        initialX = floatingButton.offsetLeft;
        initialY = floatingButton.offsetTop;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            let currentX, currentY;
            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            } else {
                currentX = e.clientX;
                currentY = e.clientY;
            }
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            floatingButton.style.left = `${initialX + deltaX}px`;
            floatingButton.style.top = `${initialY + deltaY}px`;

            // Show remove zone when dragging near bottom
            const removeThreshold = window.innerHeight * 0.8;
            if (currentY > removeThreshold) {
                const removeZoneHeight = (currentY - removeThreshold) / (window.innerHeight - removeThreshold);
                removeZone.style.height = `${removeZoneHeight * 100}%`;
                removeText.style.opacity = removeZoneHeight;
            } else {
                removeZone.style.height = '0';
                removeText.style.opacity = '0';
            }
        }
    }

    function stopDragging(e) {
        if (isDragging) {
            const removeTextRect = removeText.getBoundingClientRect();
            const floatingButtonRect = floatingButton.getBoundingClientRect();

            // Check if the floating button overlaps with the remove text
            if (
                floatingButtonRect.left < removeTextRect.right &&
                floatingButtonRect.right > removeTextRect.left &&
                floatingButtonRect.top < removeTextRect.bottom &&
                floatingButtonRect.bottom > removeTextRect.top
            ) {
                floatingButton.remove();
                isFloating = false;
            } else {
                snapToEdge();
            }
        }

        isDragging = false;
        removeZone.style.height = '0';
        removeText.style.opacity = '0';
    }

    function snapToEdge() {
        const rect = floatingButton.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distanceToLeft = buttonCenterX;
        const distanceToRight = window.innerWidth - buttonCenterX;

        const minDistance = Math.min(distanceToLeft, distanceToRight);

        if (minDistance === distanceToLeft) {
            floatingButton.style.left = '20px';
            floatingButton.style.top = `${buttonCenterY - rect.height / 2}px`;
        } else if (minDistance === distanceToRight) {
            floatingButton.style.left = `${window.innerWidth - rect.width - 20}px`;
            floatingButton.style.right = '20px';
            floatingButton.style.top = `${buttonCenterY - rect.height / 2}px`;
        }
    }

    return (
        <>
            <div className={`${loginStatus === null ? 'md:justify-center' : 'md:justify-between'} justify-center w-full h-auto flex fixed top-0 z-30 ${opaqueHeader ? 'sticky-header-blur px-[2%] pt-[1%] pb-0' : 'p-[2%] bg-gradient-to-b from-[#0000009e]'} transition-all ease-in-out duration-250`}>
                <div data-layout="item" className="w-auto">
                    <a data-uia="" href={loginStatus !== null ? '/browse' : '/'}>
                        <img className={`w-[14rem] opacity-100 transition-all ease-in-out duration-500 fill-current block`} src={celluloidLogo} alt="Celluloid Logo" />
                    </a>
                </div>
                {loginStatus !== null &&
                    <div className='w-fit flex flex-row items-center'>
                        <div className="items-center flex w-fit">
                            <AIButton handleGPTSearchToggle={handleGPTSearchToggle} text={'Smart Search'} />
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
            <button id="floatingButton" className="fixed opacity-0 z-50 w-20 h-20 blur-overlay text-white border-none rounded-full select-none flex items-center justify-center text-2xl shadow-md transition-all duration-300 ease-in-out pointer-events-auto" onClick={e => handleGPTSearchToggle(e)} onKeyDown={handleGPTSearchToggle}>
                <svg className="overflow-visible [--scale-x:1.4] [--scale-y:1.4]" data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
                    <path className="origin-center [transform-box:fill-box] motion-safe:animate-[scale_1.5s_0.15s_infinite]" d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#ffff"></path>
                    <path className="origin-center [transform-box:fill-box] motion-safe:animate-[scale_1.5s_0.3s_infinite]" d="M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z" fill="#ffff"></path>
                    <path className="origin-center [transform-box:fill-box] motion-safe:animate-[scale_1.5s_0s_infinite]" d="M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z" fill="#ffff"></path>
                </svg>
            </button>
            <div id="removeZone" className="fixed bottom-0 left-0 w-full h-0 bg-gradient-to-t from-slate-950 to-transparent flex justify-center items-end text-white text-2xl font-bold transition-all duration-300 ease-in-out pointer-events-none z-40">
                <div id="removeText" className="mb-5 opacity-0 transition-opacity duration-300 ease-in-out">Remove</div>
            </div>
        </>
    )
}

export default Header;