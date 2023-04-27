import React from 'react';
import { Modal, Textarea } from 'components';

export const PromoModal = ({ openedModal, onClose, link, publishLink, title }) => {
  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full h-full rounded-2xl bg-black-light p-10 sm:rounded-none sm:p-5 sm:!pb-12 overflow-auto space-y-5">
        <div className="flex items-center justify-center sm:!pt-10">
          <span className="text-white text-2xl font-medium sm:text-xl">{title}</span>
        </div>
        <div className="flex flex-1 justify-center items-center w-full max-h-full">
          <img src={link} className="max-w-full max-h-1/2" alt="" />
        </div>
        <Textarea copyValue value={publishLink} readOnly className={'text-xs text-white-500 h-24'} />
      </div>
    </Modal>
  );
};
