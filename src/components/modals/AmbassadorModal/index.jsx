import React, { useMemo } from 'react';
import { Modal } from 'components';
import { Button, CustomLink } from 'components';
import { InputForm } from 'components/Forms';

export const AmbassadorModal = ({ onClose, openedModal }) => {
  const isAllowNewUser = false;
  const inviteLink = 'https://t.me/+tLKipei3rsw2M2My';

  const content = useMemo(() => {
    if (isAllowNewUser) {
      return {
        text: 'By clicking "Pass the selection", you confirm your readiness to participate in the Forsage Ambassador Program. The Ambassador Program is created for active and competent users and requires full involvement from the participant.',
        button: () => (
          <div className="flex flex-col space-y-2.5 !mt-[30px]">
            <InputForm type="text" value={inviteLink} readOnly withCopy />
            <CustomLink className="w-full " href={inviteLink} targetBlank>
              <Button className="max-w-full w-full" type="primary">
                Pass the selection
              </Button>
            </CustomLink>
          </div>
        ),
      };
    }
    return {
      text: 'The recruitment to the Ambassador Program for April is closed. The next recruitment for May will start on April 30 and will last a day.',
      button: () => (
        <Button onClick={() => onClose()} className="max-w-full w-full" type="light-white">
          Close
        </Button>
      ),
    };
  }, [isAllowNewUser]);
  return (
    <Modal isOpened={openedModal} onClose={onClose}>
      <div className="ambassador-lineGradient rounded p-[1px] sm:p-0 sm:rounded-none">
        <div className="bg-main-bg flex flex-col rounded p-10 space-y-10 sm:h-full sm:rounded-none">
          <div className="h-[150px] flex items-center justify-center sm:flex-1">
            <img className="max-h-full max-h-[150px] sm:max-h-[175px]" src="/ambassador/logo-full.png" alt="" />
          </div>
          <div className="flex flex-col w-full items-center text-center space-y-2.5 ">
            <span className="text-3xl font-medium text-white">Ambassador Program</span>
            <span className="text-white-500">{content?.text}</span>
          </div>
          {content?.button()}
        </div>
      </div>
    </Modal>
  );
};
