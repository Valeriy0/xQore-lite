import React from 'react';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import ErrorCheckIcon from 'assets/icons/error_check.svg';
import SuccessCheckIcon from 'assets/icons/success_check.svg';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';

export const CheckIcon = ({ status, className }) => {
  const baseClass = 'w-6 h-6 flex-shrink-0';
  const totalClass = className || baseClass;

  switch (status) {
    case STATUSES_ENUM.WAIT:
      return <PuffLoadingIcon className={totalClass} />;
    case STATUSES_ENUM.ERROR:
      return <ErrorCheckIcon className={totalClass} />;
    case STATUSES_ENUM.SUCCESS:
      return <SuccessCheckIcon className={totalClass} />;
    default:
      return <div className={`${totalClass} border rounded-full border-line-gray`} />;
  }
};
