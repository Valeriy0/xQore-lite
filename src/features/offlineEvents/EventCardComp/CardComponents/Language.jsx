import React from 'react';
import EarthIcon from 'assets/icons/earthBold.svg';

export const Language = ({ lang }) => {
  return (
    <div className="flex items-center space-x-2.5">
      <EarthIcon className="w-4 h-4 sm:w-3 sm:h-3" />
      <span>{lang}</span>
    </div>
  );
};
