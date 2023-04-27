import React from 'react';
import { CheckIcon } from 'components';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { CheckInfo } from 'features/registration';
import clsx from 'clsx';

const TEXT_CLASSES = {
  success: 'text-green',
  error: 'text-red',
  checkApprove: {
    success: 'text-green',
    error: 'text-orange',
  },
};

export const CheckStatuses = ({ className, statuses, checkTitles, statusMeta, program }) => {
  return (
    <div className={clsx('flex flex-col space-y-5', className)}>
      {Object.keys(statuses).map((key) => {
        const status = statuses[key];
        const title = checkTitles[key]?.title;
        const subtitle = checkTitles[key]?.[status];

        const textColor = key === 'checkApprove' ? TEXT_CLASSES[key][status] : TEXT_CLASSES[status];

        return (
          <div className="flex flex-col items-start" key={key}>
            <div className="flex ">
              <CheckIcon status={status} className={`w-6 h-6 flex-shrink-0 stroke-current ${textColor}`} />
              <div className={`flex flex-wrap items-center ml-2.5 leading-5 text-base whitespace-nowrap ${textColor}`}>
                <span className={subtitle && 'mr-1.5'}>
                  <span>{title}</span>
                  {subtitle && <span>:</span>}
                </span>
                {subtitle && <span className="">{subtitle}</span>}
              </div>
            </div>
            {status === STATUSES_ENUM.ERROR && (
              <div className="hidden bg-white-100 rounded flex-col w-full p-5 mt-4 sm:flex">
                <CheckInfo key={key} status={statuses[key]} infoKey={key} program={program} statusMeta={statusMeta} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
