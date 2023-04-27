import React from 'react';
import { Tips } from 'components/Tips';

export const ReceivedTokens = ({ data }) => {
  return (
    <div className="bg-gray rounded p-5 flex flex-col max-w-full">
      <span className="inline-flex items-center text-base text-white-500 sm:text-sm">
        Members received <Tips title={'Members received'} />
      </span>
      {data?.map((item, index) => (
        <div key={index} className="flex flex-col py-2.5 border-b border-white-100 space-y-1.5 last:border-0 last:pb-0">
          <span className="text-2xl text-white font-bold sm:text-xl">
            {item?.total} {item?.token}
          </span>
          <span className="text-green-light text-base items-baseline sm:text-sm">
            + {item?.new} {item?.token}
          </span>
        </div>
      ))}
    </div>
  );
};
