import React, { useMemo } from 'react';
import { GoldInfoCard } from 'features/registration/GoldInfoCard';
import config from 'helpers/config';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { Button, CheckIcon, CustomLink } from 'components';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { TransactionError } from 'features/registration/TransactionError';

export const StateRegistrationStep = ({ statInfo, isWaiting, isSuccess, isError, hash, onTryAgain }) => {
  const renderResult = useMemo(() => {
    if (isError) {
      return <TransactionError onTryAgain={onTryAgain} />;
    }

    return (
      <>
        <div className="relative text-two-half leading-48px text-white sm:text-2xl">
          {isWaiting && (
            <span>
              Activating <br /> program <span className="inline-flex text-gold notranslate">&thinsp;xGold</span>
            </span>
          )}
          {!isWaiting && (
            <span>
              Program <span className="inline-flex text-gold notranslate">&thinsp;xGold</span> <br /> activated
            </span>
          )}
          {isWaiting && (
            <CheckIcon
              className="inline-flex w-10 h-10 ml-2.5 sm:w-6 sm:h-6"
              status={isWaiting ? STATUSES_ENUM.WAIT : STATUSES_ENUM.SUCCESS}
            />
          )}
        </div>

        <div className="mt-5">
          {isWaiting && (
            <span className="text-base white-500">
              Please wait, your transaction is in progress. You will be able to log in to your personal Forsage account
              after network confirmations.
            </span>
          )}
          {!isWaiting && (
            <span className="text-base white-500">Congratulations, you have successfully activated xGold!</span>
          )}
        </div>
        <a
          className="flex justify-start items-center text-base w-full text-white py-10 sm:mt-2.5 sm:px-5 sm:py-3 sm:pl-0 sm:text-sm outline-none "
          target="_blank"
          href={`${config.scanNetwork}${hash}`}
          rel="noreferrer"
        >
          <span className="text-base text-white">Blockchain transaction</span>
          <LinkSquareIcon className="w-6 h-6 ml-2.5" />
        </a>
        {isSuccess && (
          <CustomLink href={'/'}>
            <Button
              type="primary"
              className="flex items-center text-base font-bold justify-center w-full !px-10 py-5 sm:py-3 sm:!px-5 rounded-mini mt-auto sm:mt-2.5"
            >
              <span>Log in to your account</span>
            </Button>
          </CustomLink>
        )}
      </>
    );
  }, [isError, isWaiting, isSuccess, hash, onTryAgain]);

  return (
    <>
      <div className="max-w-desktop-reg-gold-status flex flex-1 flex-col items-start justify-center pr-10 sm:justify-start sm:p-5 sm:pb-5 sm:order-2 sm:items-stretch sm:max-w-full">
        {renderResult}
      </div>
      <GoldInfoCard statInfo={statInfo} />
    </>
  );
};
