import React from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import WarningIcon from 'assets/icons/warning.svg';
import InformationBlack from 'assets/icons/information_circle_black.svg';
import SuccessNotification from 'assets/icons/success_notification.svg';

const defaultStyles = '!bg-main-blue !rounded !p-6 !text-sm !leading-5 sm:!p-5 sm:!mx-5 sm:!my-2.5';

const stylesByType = {
  [toast.TYPE.SUCCESS]: '!bg-main-blue !text-white',
  [toast.TYPE.ERROR]: '!bg-red !text-white',
  [toast.TYPE.INFO]: '!bg-white !text-black',
};

const iconsByType = {
  [toast.TYPE.SUCCESS]: <SuccessNotification className={'w-6 h-6 flex-shrink-0'} />,
  [toast.TYPE.ERROR]: <WarningIcon className={'w-6 h-6 stroke-current text-white flex-shrink-0'} />,
  [toast.TYPE.INFO]: <InformationBlack className={'w-6 h-6 flex-shrink-0'} />,
};

const progressClassByType = {
  [toast.TYPE.SUCCESS]: '!bg-white',
  [toast.TYPE.ERROR]: '!bg-white',
};

export const callNotification = ({ type = 'success', message = '', ...props }) => {
  const isServer = typeof window === 'undefined';

  if (isServer) return;

  return toast[type](message, {
    position: window.innerWidth <= 767 ? 'top-center' : 'bottom-left',
    className: clsx(defaultStyles, stylesByType[type]),
    progressClassName: progressClassByType[type],
    icon: iconsByType[type],
    autoClose: 3000,
    hideProgressBar: false,
    closeButton: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    ...props,
  });
};
