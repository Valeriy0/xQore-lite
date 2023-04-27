import React, { memo, useMemo } from 'react';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { CheckIcon } from 'components';
import LinkIcon from 'assets/icons/link_square.svg';

export const Checkers = memo(({ statuses, price }) => {
  const programChecks = useMemo(() => {
    return [
      {
        title: 'Network check (Smart chain)',
        key: 'checkNetwork',
      },
      {
        title: `Balance check ${price} BNB`,
        key: 'checkBalance',
      },
    ];
  }, [price]);

  return (
    <div className="flex flex-col pt-5 px-10 sm:px-5 sm:pb-0">
      <div className="flex flex-col">
        {programChecks.map((check, index) => {
          const isActive = statuses[check.key] === STATUSES_ENUM.SUCCESS;
          const isErrorCheckBalance = check.key === 'checkBalance' && statuses[check.key] === STATUSES_ENUM.ERROR;

          return (
            <div className="mb-4" key={index}>
              <div key={index} className="flex justify-between">
                <span className={`text-base mr-5 text-${isActive ? 'green-light' : 'white-500'} sm:text-sm`}>
                  {check.title}
                </span>
                <CheckIcon status={statuses[check.key]} />
              </div>
              {isErrorCheckBalance && (
                <div
                  key={index}
                  className="inline-flex flex-wrap items-center justify-start text-sm font-medium mr-5 notranslate"
                >
                  <span className="mr-1 text-red-850">Not enough balance, select an</span>
                  <a
                    href="https://www.bestchange.com/?p=990298"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-red-850 underline font-semibold"
                  >
                    <span>exchanger</span>
                    <LinkIcon className="ml-1 fill-current text-white-850 w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
