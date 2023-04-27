import React from 'react';
import { Button, Header, SupportWidget, Footer } from 'components';
import { useOpenSupport } from 'helpers/hooks/useOpenSupport';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';

export const InviteQoreLayout = ({ children }) => {
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
    <div className="flex relative bg-black flex-col items-center justify-center w-full min-h-screen text-white-500 overflow-hidden">
      <Header withoutRing={false} withExit={false} loginWidth={false} />
      <div className="z-10 flex flex-col items-center flex-1 w-full mt-7.5 sm:mt-0">
        <div className="flex-1 w-full">{children}</div>
      </div>
      <SupportWidget user_id={chat_id} wallet={chat_wallet} isAuth={isNormalMode} />
    </div>
  );
};
