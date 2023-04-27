import React from 'react';
import { Header } from 'components/Header';
import { SocialButtons, SupportWidget, Footer } from 'components';
import { format } from 'date-fns';
import { getAuthUser } from 'store/userSlice/selectors';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';

export const LoginLayout = ({ children }) => {
  const { account } = useWeb3React();
  const authStore = useSelector(getAuthUser);
  const currentUser = useSelector(getCurrentUserProfile);
  const { query } = useRouter();
  const isNormalMode = !query.user;
  const chat_id = !!authStore?.id ? authStore?.id : currentUser?.id;
  const chat_wallet = account;

  return (
    <div className="flex relative bg-main-bg flex-col items-center justify-center w-full min-h-screen text-white-500 px-10 sm:px-0 overflow-hidden pt-16">
      <Header withoutRing={false} withExit={false} loginWidth={false} />
      <div className="flex flex-col flex-1 w-full max-w-desktop-login mt-7.5 sm:mt-0">
        {children}
        <Footer isLoginPage />
      </div>
      <SupportWidget user_id={chat_id} wallet={chat_wallet} isAuth={isNormalMode} />
    </div>
  );
};
