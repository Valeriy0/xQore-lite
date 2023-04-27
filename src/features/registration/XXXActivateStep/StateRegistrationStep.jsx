import React, { useMemo } from 'react';
import { CheckIcon, CustomLink } from 'components';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import ProfileIcon from 'assets/icons/profile.svg';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import config from 'helpers/config';
import { GoldInfoCard } from 'features/registration/GoldInfoCard';
import { TransactionError } from 'features/registration/TransactionError';

export const StateRegistrationStep = ({
  hash,
  isError,
  statInfo,
  isWaiting,
  isSuccess,
  onTryAgain,
  handleNextStep,
}) => {
  const renderResult = useMemo(() => {
    if (isError) {
      return <TransactionError onTryAgain={onTryAgain} />;
    }

    return (
      <>
        <div className="relative text-two-half leading-48px text-white sm:text-2xl">
          {isWaiting && (
            <span>
              Activating <br /> program <span className="notranslate">&thinsp;xXx</span>
            </span>
          )}
          {!isWaiting && (
            <span>
              Program <span className="notranslate">&thinsp;xXx</span> <br /> activated
            </span>
          )}
          <CheckIcon
            className="inline-flex w-10 h-10 ml-2.5 sm:w-6 sm:h-6"
            status={isWaiting ? STATUSES_ENUM.WAIT : STATUSES_ENUM.SUCCESS}
          />
        </div>
        <div className="mt-2.5">
          {isWaiting && (
            <span className="text-base white-500">
              Please wait, your transaction is in progress. You will be able to log in to your personal Forsage account
              after network confirmations.
            </span>
          )}
          {!isWaiting && (
            <span className="text-base white-500">Congratulations, you have successfully activated xXx program!</span>
          )}
        </div>
        <a
          className="flex justify-start items-center text-base w-full text-white py-7.5 sm:mt-2.5 sm:px-5 sm:py-3 sm:pl-0 sm:text-sm outline-none "
          target="_blank"
          href={`${config.scanNetwork}${hash}`}
          rel="noreferrer"
        >
          <span className="text-base text-white">Blockchain transaction</span>
          <LinkSquareIcon className="w-6 h-6 ml-2.5" />
        </a>
        {isSuccess && (
          <CustomLink className="w-full" href={'/'}>
            <button className="flex justify-start items-center text-base text-white py-7.5 border-t border-white-100 w-full sm:px-5 sm:py-3 sm:pl-0 sm:text-sm outline-none">
              <span>Log in to your account</span>
              <ProfileIcon className="inline-flex w-6 h-6 ml-2.5" />
            </button>
          </CustomLink>
        )}
      </>
    );
  }, [isError, isWaiting, isSuccess, hash, onTryAgain]);

  return (
    <>
      <div className="max-w-desktop-reg-gold-status w-full flex-shrink flex flex-col items-start justify-center pr-10 sm:px-5 sm:pt-7.5 sm:items-stretch sm:max-w-full sm:pb-5">
        {renderResult}
      </div>
      <GoldInfoCard statInfo={{ ...statInfo }} isCheckedRegistered={!isWaiting} onNextStep={handleNextStep} />
    </>
  );
};
