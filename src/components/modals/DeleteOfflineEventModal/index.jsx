import React from 'react';
import DeleteIcon from 'assets/icons/delete.svg';
import { Button, Modal } from 'components';
import { EventRepository } from 'connectors/repositories/event';

export const DeleteOfflineEventModal = ({ openedModal, onClose, eventId, onDelete }) => {
  const onClickDelete = async () => {
    try {
      await EventRepository.deleteEvent(eventId);

      await onDelete();
    } catch (e) {}

    onClose();
  };

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-between justify-start w-full rounded-2xl bg-black-light p-10 overflow-hidden sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        <div className="flex flex-col items-center">
          <DeleteIcon className="w-8 h-8 " />
          <span className="text-white text-3xl text-center mt-5 sm:text-2xl">
            Are you sure you want to delete this event?
          </span>
        </div>
        <div className="flex flex-col mt-10">
          <Button onClick={onClickDelete} type="red">
            Delete
          </Button>
          <Button onClick={onClose} type="primary" className="mt-5">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
