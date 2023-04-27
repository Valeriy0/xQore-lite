import React from 'react';
import PumaIcon from 'assets/forsage/status_puma.svg';
import { STATUS_TYPES, STATUS_COLORS } from 'helpers/constants';

export const StatusIcon = ({ className = '', status = STATUS_TYPES?.BASE }) => {
  return (
    <div
      className={`flex justify-center items-center w-10 h-10 sm:w-7.5 sm:h-7.5 ${STATUS_COLORS[status]?.bg} rounded-full ${className}`}
    >
      <PumaIcon className={`h-5 sm:h-3.5 fill-current ${STATUS_COLORS[status]?.pumaColor}`} />
    </div>
  );
};
