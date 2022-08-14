import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../type';
import { BASE_URL } from '../../utils';

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    const [showVideos, setShowVideos] = useState(true);
    const [videoList, setVideoList] = useState<Video[]>([]);
    const { user, userVideos, userLikedVideos } = data;

    const videos = showVideos ? 'border-b-2 border-black ' : 'text-gray-400';
    const liked = !showVideos ? 'border-b-2 border-black ' : 'text-gray-400';

    useEffect(() => {
        if(showVideos) {
            setVideoList(userVideos)
        } else {
            setVideoList(userLikedVideos)
        }
    }, [showVideos, userVideos, userLikedVideos])
    return (
        <div className='w-full'>
            <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
                <div className='w-10 h-10 md:w-24 md:h-24 rounded'>
                    <Image
                        src={user.image}
                        width={120}
                        height={120}
                        alt="User Profile"
                        layout='responsive'
                        className="rounded-full"
                    />
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='md:text-xl tracking-wider justify-center flex gap-1 items-center text-md font-bold text-primary lowercase'>
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>
                        {user.userName}
                    </p>
                </div>
            </div>
            <div>
                <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full' >
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowVideos(true)}>Videos</p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowVideos(false)}>Liked</p>
                </div>
                <div className='flex gap-6 flex-wrap md:justify-start'>
                    {
                        videoList.length > 0 ? (
                            videoList.map((post: Video, index: number) => (
                                <VideoCard post={post} key={index} />
                            ))
                        ) : (
                            <NoResults text={`No ${showVideos ? '' : 'Liked'}Videos`} />
                        )
                    }
                </div>
            </div>
        </div>
            
    )
}

export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: {
            data: res.data
        }
    }
}

export default Profile