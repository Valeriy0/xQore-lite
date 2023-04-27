import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationsItem } from './NotificationsItem';
import { getNotificationsStore } from 'store/userSlice/selectors';
import { useWeb3React } from '@web3-react/core';
import { actualizeNotifications } from 'store/userSlice/asyncActions';

export const NotificationsList = () => {
  const notificationsStore = useSelector(getNotificationsStore);
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    account && !!notificationsStore?.events?.length && dispatch(actualizeNotifications(account));
  }, []);

  return (
    <div className="flex mt-2.5 p-4 sm:mt-0 bg-gray flex-col -right-3/4 absolute w-386px h-550px justify-start sm:rounded-none rounded items-start overflow-hidden top-full drop-shadow-xl sm:drop-shadow-none sm:fixed sm:right-0 sm:top-16 sm:left-0 sm:bottom-0 sm:w-full sm:h-auto">
      <span className="text-xl font-bold m-2 text-white">Notifications</span>
      <div className="flex h-full space-y-2.5 items-center overflow-auto flex-col w-full">
        {notificationsStore?.events?.length ? (
          notificationsStore?.events?.map((item, itemIndex) => <NotificationsItem key={itemIndex} {...item} />)
        ) : (
          <div className="flex flex-col items-center justify-center m-auto">
            <img className="w-120px h-120px" src={'/nothing_here_bell.png'} />
            <span className="mt-5 text-white font-medium text-3xl">Nothing here</span>
          </div>
        )}
      </div>
    </div>
  );
};
