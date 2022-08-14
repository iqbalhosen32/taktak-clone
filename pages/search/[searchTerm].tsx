import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';

import VideoCard from '../../components/VideoCard';
import { IUser, Video } from '../../type';
import { BASE_URL } from '../../utils';
import userAuthStore from './../../store/authStore';
import NoResults from './../../components/NoResults';
import { useRouter } from 'next/router';



const SearchTerm = ({ videos }: {
    videos: Video[]
}) => {
    const [isAccounts, setIsAccounts] = useState(false)

    const { allUsers } = userAuthStore();
    const router = useRouter();
    const { searchTerm }: any = router.query;

    const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    const accounts = isAccounts ? 'border-b-2 border-black ' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black ' : 'text-gray-400';
    return (
        <div className='w-full'>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full' >
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>Accounts</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>Videos</p>
            </div>
            {
                isAccounts ? (
                    <div className="md:mt-16">
                        {
                            searchAccounts.length > 0 ? (
                                searchAccounts.map((user: IUser, index: number) => (
                                    <Link href={`/profile/${user._id}`} key={index}>
                                        <div className='flex gap-3 cursor-pointer p-2 font-semibold border-b-2 border-gray-200'>
                                            <div className=' rounded'>
                                                <Image
                                                    src={user.image}
                                                    width={50}
                                                    height={50}
                                                    alt="User Profile"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className='hidden xl:block'>
                                                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                                                    {user.userName.replaceAll(' ', '')}
                                                    <GoVerified className='text-blue-400' />
                                                </p>
                                                <p className='capitalize text-gray-400 text-xs'>
                                                    {user.userName}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : <NoResults text={`No Video result for ${searchTerm}`} />
                        }
                    </div>
                ) : (
                    <div className='md:mt-6 flex flex-wrap gap-6 md:justify-start'>
                        {
                            videos?.length ? (
                                videos.map((video: Video, index: number) => (
                                    <VideoCard post={video} key={index}
                                    />
                                ))
                            ) : <NoResults text={`No Video result for ${searchTerm}`} />
                        }
                    </div>
                )
            }
        </div>
    )
}

export const getServerSideProps = async ({
    params: { searchTerm }
}: {
    params: { searchTerm: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: {
            videos: res.data
        }
    }
}

export default SearchTerm