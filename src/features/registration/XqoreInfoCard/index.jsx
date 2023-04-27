import React from 'react';
import { BNB_COMMISSIONS, PROGRAM_NAMES, PROGRAM_PRICES, EVENT_NAMES, SERVICE_FEE_XQORE } from 'helpers/constants';
import ReactPlaceholder from 'react-placeholder';
import { TextRow } from 'react-placeholder/lib/placeholders';
import { sendEvent } from 'helpers/sendEvent';

const customTextPlaceHolder = (
  <div>
    <TextRow color="rgba(0,0,0, 0.4)" className="text-2xl !w-40 text-white font-bold" />
  </div>
);

export const XqoreInfoCard = ({ onNextStep, isChecked, statInfo }) => {
  return (
    <div className="relative bg-white-100 rounded p-10 flex-grow-1 max-w-desktop-reg-info-card h-auto flex flex-col justify-between sm:min-h-auto sm:flex-1 sm:p-5 sm:max-w-full sm:rounded-none sm:order-2">
      <div className="flex flex-col">
        <span className="text-white text-2xl font-medium notranslate">
          Forsage
          <span className="text-cyan ml-2.5">xQore</span>
        </span>
        <div className="flex flex-col mt-5">
          <span className="text-base white-500">
            The most rewarding Forsage xQore program is here: more than 500% per cycle, more partners and more levels.
            Activate now!
          </span>
          <span className="text-base white-500 mt-7 sm:mt-3">
            xQore starting level:
            <span className="text-white notranslate">&thinsp;{PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1]} BNB</span> <br />
            <span> + service fee </span>
            <span className="text-white notranslate">&thinsp;{SERVICE_FEE_XQORE} BNB</span>
          </span>
          <div className="flex flex-col mt-10 sm:mt-5">
            <ReactPlaceholder
              ready={!statInfo?.isLoading}
              showLoadingAnimation
              customPlaceholder={customTextPlaceHolder}
            >
              <span className="text-2xl text-white font-bold">{statInfo?.count_members}</span>
            </ReactPlaceholder>
            <span className="mt-2 5 text-base text-white-500">participants in xQore</span>
          </div>
          <div className="flex flex-col mt-5 sm:mt-5">
            <ReactPlaceholder
              ready={!statInfo?.isLoading}
              showLoadingAnimation
              customPlaceholder={customTextPlaceHolder}
            >
              <span className="text-2xl text-white font-bold">{statInfo?.total_revenue}</span>
            </ReactPlaceholder>
            <span className="mt-2 5 text-base text-white-500">
              Members` results, <span className="notranslate">BNB</span>
            </span>
          </div>
        </div>
      </div>

      {!!onNextStep && (
        <div className="sm:h-10 w-full mt-10 sm:mt-5">
          <div className="sm:fixed sm:left-0 sm:bottom-0 w-full sm:px-5 sm:pb-5 relative">
            <button
              className={`flex items-center text-base font-bold justify-center w-full py-5 rounded-mini mt-auto ${
                isChecked ? 'bg-gray text-white-300' : 'bg-main-blue text-white'
              } sm:justify-center sm:mt-5 sm:px-5 sm:py-3 sm:text-center sm:rounded-mini sm:font-bold sm:text-sm outline-none`}
              onClick={() => {
                sendEvent({ type: EVENT_NAMES.ACTIVATE_XXX });
                onNextStep();
              }}
              disabled={isChecked}
            >
              Activate xQore
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
