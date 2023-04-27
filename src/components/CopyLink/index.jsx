import React from 'react';
import Copy from 'assets/icons/copy.svg';
import clsx from 'clsx';

export const CopyLink = ({ className }) => {
  const wrapperClasses =
    'flex items-center justify-between p-3 items-center rounded-lg border-white-500 border cursor-pointer';
  return (
    <div className={clsx(className, wrapperClasses)}>
      <span className="text-white-500 text-xs font-bold">forsage.io/t/RTus6/</span>
      <Copy />
    </div>
  );
};
