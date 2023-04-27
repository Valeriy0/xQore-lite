import React from 'react';
import { Button } from 'components';
import { useRouter } from 'next/router';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';

export const CreateLink = ({ CreateLinkFunc }) => {
  const { query } = useRouter();
  const authProfile = useSelector(getAuthUser);

  const user = query?.user || authProfile?.id;

  return (
    <div className="sm:p-5 xl:max-w-full max-w-1/2 h-auto">
      <div className="relative w-full h-full flex flex-col items-center xl:items-start justify-center bg-black-light rounded relative overflow-hidden p-5 min-h-90 xl:min-h-0">
        <img src="/icons/chain.png" className="absolute top-8 right-5 z-10 xl:-top-8 xl:-right-8 xl:scale-50" />
        <img
          src="/icons/chain.png"
          className="absolute transform -rotate-120 -bottom-12 left-0 z-10 xl:rotate-75 xl:left-auto xl:right-0 xl:bottom-2 xl:scale-50 "
        />
        <span className="text-white text-2xl font-medium mb-2.5 sm:text-xl">New link</span>
        <span className="text-white-600 text-base font-medium mb-7.5 sm:text-sm">
          You can create link and earn more
        </span>
        <Button type="primary" className="xl:w-full font-medium rounded-mini z-20" onClick={CreateLinkFunc}>
          Create
        </Button>
        <div className="absolute -bottom-1/4 xl:-right-1/4 w-52 h-52 blur-190px bg-main-blue" />
      </div>
    </div>
  );
};
