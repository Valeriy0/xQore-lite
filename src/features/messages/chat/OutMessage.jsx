import React, { memo } from 'react';
import { format, parseISO } from 'date-fns';

const OutMessageComp = ({ id, date, message }) => {
  return (
    <div className="flex w-full justify-end pl-10 lg:p-0">
      <div className="flex w-1/2 lg:w-10/12 flex-col bg-main-blue-200 w-full max-w-45% flex justify-between self-start p-5 rounded-small">
        <div className="flex justify-between">
          <span className="text-white-500">You</span>
          <span className="text-white-500">{format(parseISO(date), 'MM/dd/yyyy HH:mm')}</span>
        </div>
        <span className="text-white-900" dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
};

export const OutMessage = memo(OutMessageComp);
