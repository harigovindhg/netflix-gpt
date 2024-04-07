import React from 'react';

const Header = () => {
    return (
        <div className='w-full h-auto flex pl-[5%] pt-[2%] absolute top-0 bg-gradient-to-b from-black z-20 justify-center md:justify-start'>
            <div data-layout="item" className="w-auto">
                <a data-uia="" href="/">
                    <img className="w-[12rem] text-red-600 fill-current block" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Netflix Logo" />
                </a>
            </div>
        </div>
    )
}

export default Header;