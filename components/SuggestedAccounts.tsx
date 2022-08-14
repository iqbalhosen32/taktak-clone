import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import userAuthStore from './../store/authStore';
import { IUser } from '../type';

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = userAuthStore();

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])
  return (
    <div className='xl:border-b-2 border-gray-300 pb-4'>
      <p className='text-gray font-semibold m-3 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>
      <div className=''>
        {
          allUsers.slice(0, 5).map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
                <div className='w-10 h-10 rounded'>
                  <Image
                    src={user.image}
                    width={34}
                    height={34}
                    alt="User Profile"
                    layout='responsive'
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
        }
      </div>
    </div>
  )
}

export default SuggestedAccounts