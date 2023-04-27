import React, { useRef, useState } from 'react';
import { Button } from 'components';
import BellIcon from 'assets/icons/bell.svg';
import { NotificationsList } from './NotificationsList';
import { useClickOutside } from 'helpers/hooks/useClickOutside';
import { useSelector } from 'react-redux';
import { getNotificationsStore } from 'store/userSlice/selectors';

export const NotificationsButton = () => {
  const [openedList, setOpenedList] = useState(false);
  const notificationsStore = useSelector(getNotificationsStore);
  const someUnread = !!notificationsStore?.new;
  const containerButtonRef = useRef(null);

  useClickOutside(containerButtonRef, () => {
    setOpenedList(false);
  });

  return (
    <div className="ml-5 relative sm:ml-2.5" ref={containerButtonRef}>
      <Button type="black-light-circle" className="relative" onClick={() => setOpenedList(!openedList)}>
        <BellIcon />
        {someUnread && <div className="w-2.5 h-2.5 absolute bg-red rounded-full bottom-full top-1 right-0 z-10 " />}
      </Button>
      {openedList && <NotificationsList />}
    </div>
  );
};
