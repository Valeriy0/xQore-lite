import React from 'react';
import { BNB_COMMISSIONS, EVENT_NAMES, PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { TextRow } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import { sendEvent } from 'helpers/sendEvent';

const customTextPlaceHolder = (
  <div>
    <TextRow color="rgba(0,0,0, 0.4)" className="text-2xl !w-40 text-white font-bold" />
  </div>
);

export const GoldInfoCard = ({ isCheckedRegistered, onNextStep, statInfo }) => {
  return (
    <div className="bg-white-100 rounded p-10 flex-grow-1 max-w-desktop-reg-info-card h-auto flex flex-col justify-between sm:min-h-auto sm:flex-1 sm:p-5 sm:max-w-full sm:rounded-none sm:order-2">
      <div className="flex flex-col">
        <span className="text-white text-2xl font-medium notranslate">
          Forsage
          <span className="text-gold ml-2.5">xGold</span>
        </span>
        <div className="flex flex-col mt-5">
          <span className="text-base white-500">
            The most rewarding Forsage xGold program is here: more than 1000% per cycle, more partners and more levels.{' '}
            Activate now!
          </span>
          <span className="text-base white-500 mt-7 sm:mt-3">
            xGold starting level:{' '}
            <span className="text-white notranslate">&thinsp;{PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]} BUSD</span> <br />{' '}
            + network fee{' '}
            <span className="text-white notranslate">&thinsp;{BNB_COMMISSIONS[PROGRAM_NAMES.XGOLD]} BNB</span>
          </span>
          <div className="flex flex-col mt-10 sm:mt-5">
            <ReactPlaceholder
              ready={!statInfo?.isLoading}
              showLoadingAnimation
              customPlaceholder={customTextPlaceHolder}
            >
              <span className="text-2xl text-white font-bold">{statInfo?.count_members}</span>
            </ReactPlaceholder>
            <span className="mt-2 5 text-base text-white-500">
              Members in <span className="notranslate">xGold</span>
            </span>
          </div>
          <div className="flex flex-col mt-10 sm:mt-5">
            <ReactPlaceholder
              ready={!statInfo?.isLoading}
              showLoadingAnimation
              customPlaceholder={customTextPlaceHolder}
            >
              <span className="text-2xl text-white font-bold">{statInfo?.total_revenue}</span>
            </ReactPlaceholder>
            <span className="mt-2 5 text-base text-white-500">
              Members` results, <span className="notranslate">BUSD</span>
            </span>
          </div>
        </div>
      </div>
      {!!onNextStep && (
        <div className="sm:h-10 w-full sm:mt-5">
          <div className="sm:fixed sm:left-0 sm:bottom-0 w-full sm:px-5 sm:pb-5 relative">
            <button
              className={`flex items-center text-base font-bold justify-center w-full py-5 mt-10 rounded-mini mt-auto ${
                !isCheckedRegistered
                  ? 'flex justify-center items-center text-center text-base font-bold text-white rounded-mini sm:text-sm outline-none bg-white-100 py-3 px-5 cursor-not-allowed'
                  : 'bg-main-blue text-white'
              } sm:justify-center sm:mt-5 sm:px-5 sm:py-3 sm:text-center sm:rounded-mini sm:font-bold sm:text-sm outline-none`}
              onClick={() => {
                sendEvent({ type: EVENT_NAMES.ACTIVATE_XGOLD });
                onNextStep();
              }}
              disabled={!isCheckedRegistered}
            >
              Activate xGold
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
