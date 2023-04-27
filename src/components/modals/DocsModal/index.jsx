import React from 'react';
import { Modal, Button } from 'components';
import { Item } from './Item';
import { MAIN_DOCS } from 'helpers/docs';

export const DocsModal = ({ openedModal, onClose, data, program }) => {
  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light p-10 overflow-hidden sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        <div className="flex items-center justify-start mb-5">
          <span className="text-white text-3xl font-medium sm:text-2xl">Documents</span>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex  flex-col space-y-2.5">
            {MAIN_DOCS?.map((item, itemIndex) => {
              return <Item title={item?.title} href={item?.url} key={itemIndex} />;
            })}
          </div>
        </div>
        <Button type="black-light" className="border-2 border-line-gray !mt-5" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};
