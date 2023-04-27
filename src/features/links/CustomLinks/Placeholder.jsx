import React from 'react';
import PuffLoadingIcon from 'assets/animations/puff.svg';

export const CustomLinkPlaceholder = () => {
  return (
    <div className="xl:max-w-full relative max-w-1/2 flex justify-center items-center bg-black-light rounded h-388px sm:h-400px sm:rounded-none p-7.5 sm:p-5 ">
      <PuffLoadingIcon className="w-10 h-10" />
    </div>
  );
};
