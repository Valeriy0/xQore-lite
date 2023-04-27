import React, { useState, useMemo } from 'react';
import { Modal, Button } from 'components';
import { ShareText } from './ShareText';
import { ShareImage } from './ShareImage';

export const ShareLinkModal = ({ openedModal, onClose, reflink = '' }) => {
  const [shareMethod, setShareMethod] = useState(0);
  const shareTypes = ['Share image', 'Share text'];
  const customReflink = reflink.replace('https://', '');

  const switcher = useMemo(() => {
    return (
      <div className="w-full flex text-white border-2 border-white-100 rounded-mini p-1 mb-5">
        {shareTypes?.map((item, itemIndex) => {
          const btnType = itemIndex === shareMethod ? 'primary' : 'transparent';

          return (
            <Button
              key={itemIndex}
              type={btnType}
              onClick={() => setShareMethod(itemIndex)}
              className="!flex-1 font-normal !p-1.5 rounded-[5px]"
            >
              {item}
            </Button>
          );
        })}
      </div>
    );
  }, [shareMethod]);

  const shareContent = useMemo(() => {
    switch (shareMethod) {
      case 0:
        return <ShareImage reflink={customReflink} />;
      case 1:
        return <ShareText reflink={customReflink} />;
      default:
        return null;
    }
  }, [shareMethod]);

  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="flex flex-col justify-start w-full rounded-2xl bg-black-light p-10 sm:rounded-none sm:p-5 overflow-auto sm:!pt-20">
        {switcher}
        {shareContent}
      </div>
    </Modal>
  );
};
