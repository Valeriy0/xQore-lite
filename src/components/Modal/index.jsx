import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import clsx from 'clsx';

export const Modal = ({ isOpened, onClose, children, className, isDisableOnClose }) => {
  const preventDefaultCallBack = (callback) => (e) => {
    e.preventDefault();

    callback && callback(e);
  };

  return (
    <DialogOverlay
      className="header-dialog-overlay"
      isOpen={isOpened}
      as={'div'}
      onClick={!isDisableOnClose && preventDefaultCallBack(onClose)}
    >
      <DialogContent
        className={clsx(
          className,
          `header-dialog-content sm:m-0 sm:w-screen sm:h-screen sm:max-h-full sm:max-w-full relative`,
        )}
        as={'div'}
        aria-label={'modal'}
      >
        {children}
        <div
          className="hidden top-9 z-10 right-10 bg-white-100 justify-center cursor-pointer flex items-center w-10 h-10 rounded-full absolute sm:top-2.5 sm:right-5 sm:flex"
          onClick={preventDefaultCallBack(onClose)}
          onTouchEnd={preventDefaultCallBack(onClose)}
        >
          X
        </div>
      </DialogContent>
      {!isDisableOnClose && (
        <div
          className="flex top-9 z-10 right-10 bg-white-100 justify-center cursor-pointer flex items-center w-10 h-10 rounded-full absolute sm:top-2.5 sm:right-5 sm:hidden pointer-events-none"
          onClick={preventDefaultCallBack(onClose)}
          onTouchEnd={preventDefaultCallBack(onClose)}
        >
          X
        </div>
      )}
    </DialogOverlay>
  );
};
