import React from 'react';
import playIcon from './common/assets/images/play.png';

const VideoTitle = ({ title, info, trailerVideo }) => {
    return (
        // <div className='absolute text-white flex flex-col pt-[20%] pl-[5%] bg-gradient-to-r from-black w-[99vw] aspect-video'>
        <div className='absolute text-white flex flex-col pt-[20%] pl-[5%] bg-gradient-to-tr from-[#000000a3] w-full aspect-video'>
            <h2 className='font-bold md:text-6xl text-3xl mb-[1%]'>{title}</h2>
            <p className='hidden 2xl:flex max-w-[45%] text-lg'>{info}</p>
            <div className="items-center mt-0 lg:mt-6 flex">
                <div className="items-center flex 2xl:w-1/12 md:w-1/6 w-1/2 opacity-100">
                    <a className="z-10 leading-none text-white whitespace-no-wrap w-full" href={`https://www.youtube.com/watch?v=${trailerVideo?.key}`} target='_blank'>
                        <div className={`relative blurred-box animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                            <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                                <div className='p-4 text-white flex items-center justify-center'>
                                    <img className='w-7' src={playIcon} aria-hidden />
                                    <h2 className='mx-2 text-xl'>{'Watch Trailer'}</h2>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default VideoTitle