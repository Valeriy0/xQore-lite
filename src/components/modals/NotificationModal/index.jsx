import React from 'react';
import { Modal, Button } from 'components';
import { NotificationsItem } from './NotificationsItem';
import { useSelector } from 'react-redux';
import { getNotificationsEvents } from 'store/userSlice/selectors';

export const NotificationModal = ({ openedModal, handleCloseModal }) => {
  const events = useSelector(getNotificationsEvents);

  return (
    <Modal isOpened={openedModal} onClose={handleCloseModal} className="!max-w-full">
      {!events?.length ? (
        <div className="flex flex-col items-center justify-center">
          <img className="w-120px h-120px" src={'/nothing_here_bell.png'} />
          <span className="mt-5 text-white font-medium text-3xl">Nothing here</span>
        </div>
      ) : (
        <div className="w-full flex items-center flex-col overflow-hidden p-2.5 pt-0 sm:pt-20 sm:pb-0 sm:max-w-full">
          <div className="hidden w-full justify-between items-center pb-5 px-2.5 shadow-notification-header sm:flex">
            <span className="text-white-900 text-2xl font-medium">Notifications</span>
            <Button type="light-blue-rounded">Clear All</Button>
          </div>
          <div className="flex items-center w-full h-full flex-col space-y-2.5 overflow-auto p-2.5 pb-0 sm:pb-2.5 sm:space-y-4 ">
            {events?.map((item, itemIndex) => (
              <NotificationsItem key={itemIndex} {...item} />
            ))}
          </div>
          <div className="py-4 flex w-full sm:hidden max-w-380px">
            <Button type="light-blue" className="w-full rounded-mini ">
              <span>Clear All</span>
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
