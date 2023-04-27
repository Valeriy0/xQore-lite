import React, { useMemo } from 'react';
import { XXXInfoCard } from 'features/registration/XXXInfoCard';
import config from 'helpers/config';
import LinkSquareIcon from 'assets/icons/link_square.svg';
import { Button, CheckIcon, CustomLink } from 'components';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { TransactionError } from 'features/registration/TransactionError';
import ProfileIcon from 'assets/icons/profile.svg';

export const StateRegistrationStep = ({
  statInfo,
  isWaiting,
  isSuccess,
  isError,
  hash,
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
              Activating <br /> program <span className="inline-flex text-cyan notranslate">&thinsp;xQore</span>
            </span>
          )}
          {!isWaiting && (
            <span>
              Program <span className="inline-flex text-cyan notranslate">&thinsp;xQore</span> <br /> activated
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
              Your transaction is in progress. After network confirmations you will be able to log in to your personal
              FORSAGE account.
            </span>
          )}
          {!isWaiting && (
            <span className="text-base white-500">Congratulations, you have successfully activated xQore!</span>
          )}
        </div>
        <a
          className="flex justify-start items-center text-base w-full text-white py-7.5 sm:mt-2.5 sm:px-5 sm:py-3 sm:text-sm outline-none sm:pl-0"
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
              Log in to your account
              <ProfileIcon className="inline-flex w-6 h-6 ml-2.5" />
            </button>
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
      <XXXInfoCard statInfo={statInfo} isChecked={isWaiting} onNextStep={handleNextStep} />
    </>
  );
};
