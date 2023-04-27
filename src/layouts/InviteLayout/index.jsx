import React from 'react';
import { Button, Header, SupportWidget, Footer } from 'components';
import { useOpenSupport } from 'helpers/hooks/useOpenSupport';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';

export const InviteLayout = ({ children }) => {
  const { openSupport } = useOpenSupport();
  const { account } = useWeb3React();
  const currentUser = useSelector(getCurrentUserProfile);
  const authStore = useSelector(getAuthUser);
  const chat_id = !!authStore?.id ? authStore?.id : currentUser?.id;
  const chat_wallet = account;
  const { query } = useRouter();
  const isNormalMode = !query.user;

  const onSupportClick = () => {
    openSupport();
  };

  return (
    <div className="flex relative bg-black flex-col items-center justify-center w-full min-h-screen text-white-500 overflow-hidden pt-16">
      <div className="absolute left-1/2 -top-1/2 transform -translate-x-1/2 w-720px h-720px sm:w-510px sm:h-510px blur-500px bg-main-blue z-0" />
      <Header withoutRing={false} withExit={false} loginWidth={false} />
      <div className="z-10 flex flex-col items-center flex-1 w-full mt-7.5 sm:mt-0">
        <div className="flex-1 w-full">{children}</div>
        <div className="max-w-desktop-invite flex flex-col items-center w-full sm:items-center sm:text-center justify-center my-25 sm:my-12 sm:mb-0 sm:p-5 z-10 sm:my-0 sm:pt-7.5">
          <span className="text-white text-3xl font-bold mb-5 sm:text-xl"> Need help on how to use the platform? </span>
          <span className="mb-7.5 text-base sm:text-sm">
            {' '}
            Get qualified support from Forsage experts via online chat{' '}
          </span>
          <Button type="primary" className="font-medium rounded-mini sm:w-full" onClick={onSupportClick}>
            Contact support
          </Button>
        </div>
        <div className="max-w-desktop-invite w-full flex z-10  items-center">
          <Footer isLoginPage />
        </div>
      </div>
      <SupportWidget user_id={chat_id} wallet={chat_wallet} isAuth={isNormalMode} />
    </div>
  );
};
