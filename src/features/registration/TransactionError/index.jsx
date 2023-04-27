import React from 'react';
import WarningIcon from 'assets/icons/warning_triangle_orange.svg';
import { Button } from 'components';

export const TransactionError = ({ onTryAgain }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center space-x-5 ">
        <WarningIcon className="flex-shrink-0 w-[80px] h-[80px] sm:w-[50px] sm:h-[50px]" />
        <span className="text-[40px] leading-[47px] text-white sm:text-[32px]">Sorry!</span>
      </div>
      <span className="text-2xl text-white mt-6 sm:text-xl">
        The transaction failed, <br /> please try again
      </span>
      <Button onClick={onTryAgain} type="primary" className="mt-6 py-4.5">
        Try again
      </Button>
    </div>
  );
};
