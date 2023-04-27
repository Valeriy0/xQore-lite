import React, { useMemo } from 'react';
import { Button } from 'components/Button';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import config from 'helpers/config';
import { EVENT_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { sendEvent } from 'helpers/sendEvent';
import SuccessCheckIcon from 'assets/icons/success_check.svg';
import ErrorCheckIcon from 'assets/icons/error_check.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';

export const FinalProgramStep = ({ hash, name, level, closeModal, onTryAgain, isWaiting, isSuccess, isError }) => {
  const onOkayClick = () => {
    sendEvent({
      type: EVENT_NAMES.SUCCESS_PROGRAM_STEP[name],
      value: `<${PROGRAM_PRICES[name][level]}>`,
      currency: '<USD>',
    });
    closeModal();
  };

  const renderIcon = useMemo(() => {
    if (isWaiting) {
      return <PuffLoadingIcon className="w-[80px] h-[80px] mb-5" />;
    }
    if (isSuccess) {
      return <SuccessCheckIcon className="w-[80px] h-[80px] mb-5" />;
    }
    if (isError) {
      return <ErrorCheckIcon className="w-[80px] h-[80px] mb-5" />;
    }
  }, [isWaiting, isError, isSuccess]);

  const renderContent = useMemo(() => {
    if (isWaiting) {
      return {
        title: 'Activating',
        desc: <span className="text-white-500 text-base sm:text-sm">Your transaction is in progress.</span>,
        button: (
          <a href={`${config.scanNetwork}${hash}`} target="_blank" className="w-full" rel="noreferrer">
            <Button className="w-full" type="light-white">
              <div className="flex">
                <span className="text-base font-bold sm:text-sm">Transaction in blockchain </span>
                <LinkSquareIcon className="w-6 h-6 ml-2.5" />
              </div>
            </Button>
          </a>
        ),
      };
    }
    if (isSuccess) {
      return {
        title: 'Upgraded',
        desc: (
          <span className="text-white-500 text-base sm:text-sm">
            Congratulations!{' '}
            <span className="text-white">
              Program {name} Level {level}
            </span>{' '}
            activated
          </span>
        ),
        button: (
          <Button className="w-full" type="primary" onClick={onOkayClick}>
            Okay
          </Button>
        ),
      };
    }
    if (isError) {
      return {
        title: 'Sorry',
        desc: <span className="text-white-500 text-base sm:text-sm">Level {level} is not activated.</span>,
        button: (
          <>
            <a
              href={`${config.scanNetwork}${hash}`}
              target="_blank"
              className="w-full flex items-center justify-center mb-2.5"
              rel="noreferrer"
            >
              <div className="flex">
                <span className="text-white text-base font-bold sm:text-sm">Transaction in blockchain </span>
                <LinkSquareIcon className="w-6 h-6 ml-2.5" />
              </div>
            </a>
            <Button className="w-full" type="primary" onClick={onTryAgain}>
              Try again
            </Button>
          </>
        ),
      };
    }
  }, [isWaiting, isError, isSuccess, hash, name, level]);

  return (
    <div className="p-10 flex z-10 relative flex-col justify-center items-center w-full bg-black-light rounded sm:rounded-none sm:p-5 sm:w-full sm:h-full ">
      <div className="flex flex-col justify-center items-center mb-10 sm:flex-1">
        <div className="flex flex-col justify-center items-center mb-5 sm:flex-col">
          {renderIcon}
          <span className="text-white text-2xl font-medium sm:text-2xl sm:order-2">{renderContent?.title}</span>
        </div>
        {renderContent?.desc}
      </div>
      <div className="flex flex-col w-full">{renderContent?.button}</div>
    </div>
  );
};
