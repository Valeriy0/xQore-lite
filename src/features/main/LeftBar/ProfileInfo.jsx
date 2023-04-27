import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from 'helpers/format';
import Chat from 'assets/icons/chat.svg';
import Copy from 'assets/icons/copy.svg';
import { useTranslation } from 'next-i18next';

const ProfileInfo = () => {
  const { account } = useWeb3React();
  const { t, ...props } = useTranslation('common');

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full space-y-4 pb-5">
        <div className="flex justify-between items-baseline">
          <span className="text-white-500 text-base font-bold">{t('myId')}</span>
          <span className="text-white text-3xl font-bold">12</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-white-500 text-xs">Аплайн id</span>
          <div className="flex items-center space-x-1.5 items-center">
            <span className="text-white-500 text-xs font-bold">1</span>
            <Chat />
          </div>
        </div>
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col space-y-2">
            <span className="text-white-500 text-xs">Кошелек</span>
            <div className="flex items-center">
              <div className="rounded-full bg-green-light w-1.5 h-1.5" />
              <span className="text-green-light text-sup-xs font-medium ml-1.5">connected</span>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 items-center cursor-pointer">
            <span className="text-white-500 text-xs font-bold">
              {account ? shortenAddress(account) : 'Не подключен'}
            </span>
            <Copy />
          </div>
        </div>
      </div>
      <div className="py-6 border-l-0 border-r-0 border-b-0 border border-shadow-gray">
        <div className="flex justify-between items-baseline">
          <span className="text-white-500 text-base font-bold">Мои партнеры</span>
          <span className="text-white text-3xl font-bold">12</span>
        </div>
      </div>
      <div className="py-6 border-l-0 border-r-0 border border-shadow-gray">
        <div className="flex justify-between items-baseline">
          <span className="text-white-500 text-base font-bold">Я заработал</span>
          <div className="flex flex-col">
            <span className="text-white text-right text-3xl font-bold">12</span>
            <span className="text-white text-xs font-bold">3234234200 TRX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
