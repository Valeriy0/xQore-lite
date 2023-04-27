import React from 'react';
import { Wallets } from 'connectors/wallets';
import { Modal } from '../Modal';
import { useTryActivation } from 'helpers/hooks/useTryActivation';
import { useOpenSupport } from 'helpers/hooks/useOpenSupport';
import { EVENT_NAMES } from 'helpers/constants';
import { sendEvent } from 'helpers/sendEvent';

export const ActivateModal = ({ openedModal, handleCloseModal }) => {
  const { tryActivation } = useTryActivation();
  const { openSupport } = useOpenSupport();

  const onWalletClick = (wallet) => () => {
    sendEvent({ type: EVENT_NAMES.WALLET_CLICK });
    tryActivation(wallet.connector);
    handleCloseModal();
  };

  return (
    <Modal isOpened={openedModal} onClose={handleCloseModal}>
      <div className="flex flex-col items-start justify-start w-full p-10 bg-black-light rounded sm:rounded-none sm:bg-main-bg sm:p-5 sm:pt-20">
        <span className="text-3xl text-white font-medium sm:text-2xl">Connect wallet</span>
        <div className="flex w-full flex-col overflow-auto my-7.5 notranslate space-y-5">
          {Wallets?.map((wallet) => {
            const Icon = wallet.icon;

            return (
              <div
                className="flex w-full p-5 cursor-pointer items-center rounded-small bg-white-100 hover:bg-main-blue sm:text-sm sm:py-2.5"
                onClick={onWalletClick(wallet)}
                key={wallet.title}
              >
                {Icon && <Icon className={'bg-white rounded-full flex-shrink-0 w-7.5 h-7.5'} />}
                <div className="flex flex-col ml-5">
                  <span className="text-base text-white">{wallet.title}</span>
                  <span className="text-sm text-white-500">{wallet.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
        <span className="text-white-500 text-center text-base self-center">
          Got questions?
          <span className="text-white ml-1.5 cursor-pointer hover:text-white-700" onClick={openSupport}>
            Contact support
          </span>
        </span>
      </div>
    </Modal>
  );
};
