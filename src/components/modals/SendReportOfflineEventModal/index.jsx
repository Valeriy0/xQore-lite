import React, { useState, useMemo } from 'react';
import { Button, Input, Modal } from 'components';
import JournalIcon from 'assets/icons/journal.svg';
import { EventRepository } from 'connectors/repositories/event';
import { callNotification } from 'helpers/notification';

export const SendReportOfflineEventModal = ({ openedModal, onClose, eventId, onReport }) => {
  const [finalData, setFinalData] = useState(['']);
  const maxInputs = 10;

  const addNewInputData = (index, data) => {
    setFinalData([...finalData.slice(0, index), data, ...finalData.slice(index + 1)]);
  };

  const addInput = () => {
    if (finalData.length < maxInputs) {
      setFinalData([...finalData, '']);
    }
  };

  const onClickReport = async () => {
    try {
      const reportData = finalData.join(', ');
      await EventRepository.reportEvent(eventId, { data: reportData });

      await onReport();
    } catch (e) {}
    callNotification({ type: 'success', message: 'Сontent has been sent' });
    onClose();
  };

  const renderInputs = useMemo(() => {
    return finalData.map((item, itemIndex) => {
      const lastElem = finalData.length - 1 === itemIndex;
      const isAllow = lastElem && finalData.length < maxInputs;
      return (
        <div className="flex w-full space-x-1.5">
          <Input
            placeholder="Insert your link here"
            value={item}
            onChange={(e) => addNewInputData(itemIndex, e.target.value)}
            key={itemIndex}
          />
          {isAllow && (
            <div
              onClick={() => addInput()}
              className="rounded-mini w-[60px] bg-white-100 hover:bg-white-300 active:bg-white-200 cursor-pointer flex items-center justify-center text-white"
            >
              {' '}
              +{' '}
            </div>
          )}
        </div>
      );
    });
  }, [finalData]);

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-between w-full rounded-2xl bg-black-light p-10 overflow-hidden sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        <div className="flex flex-col items-center">
          <JournalIcon className="w-8 h-8" />
          <span className="text-white text-center text-3xl mt-5 sm:text-2xl">
            Share photo and video <br /> from your event
          </span>
          <span className="text-white-500 text-center text-base mt-5 text-center sm:text-sm">
            Provide links to social media posts on Facebook or Instagram, as well as cloud storage services like Google
            Drive or Dropbox with photo and video of your event.
          </span>
        </div>
        <div className="flex flex-col mt-10">
          <div className="flex flex-col w-full space-y-2.5 max-h-[200px] overflow-auto sm:max-h-[240px]">
            {renderInputs}
          </div>
          <Button onClick={onClickReport} className="mt-5" type="primary">
            Send links
          </Button>
        </div>
      </div>
    </Modal>
  );
};
