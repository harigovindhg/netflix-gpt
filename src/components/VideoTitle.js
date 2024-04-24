import React from 'react'

const VideoTitle = ({ title, info }) => {
    return (
        // <div className='absolute text-white flex flex-col pt-[20%] pl-[5%] bg-gradient-to-r from-black w-[99vw] aspect-video'>
        <div className='absolute text-white flex flex-col pt-[20%] pl-[5%] bg-gradient-to-r from-[#000000a3] w-full aspect-video'>
            <h2 className='font-bold md:text-6xl text-3xl mb-[1%]'>{title}</h2>
            <p className='hidden lg:flex max-w-[45%] text-lg'>{info}</p>
            <div className="items-center mt-0 lg:mt-6 flex">
                <button className="z-10 leading-none text-white whitespace-no-wrap lg:w-1/12 md:w-1/6 w-1/4">
                    <div className={`relative blurred-box animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                        <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                            <div className='p-4 text-white'>{'▶ Play'}</div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default VideoTitle