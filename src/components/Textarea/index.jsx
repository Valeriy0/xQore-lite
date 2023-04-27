import React from 'react';
import clsx from 'clsx';
import { Button } from 'components';
import { copy } from 'helpers/text';
import CopyIcon from 'assets/icons/copy_white.svg';

export const Textarea = ({ copyValue = false, value = {}, className, ...props }) => {
  const defaultClass = `w-full bg-white-100 border-2 border-transparent rounded-mini py-1.5 px-2.5 text-white outline-none h-full resize-none ${
    !props.readOnly && 'focus:border-2 focus:border-main-blue focus:bg-transparent'
  } ${!!copyValue && `pr-10`}`;

  return (
    <div className="relative flex">
      <textarea className={clsx(className, defaultClass)} defaultValue={value} {...props} />
      {!!copyValue && (
        <Button
          onClick={() => copy(value)}
          className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-3.5"
        >
          <CopyIcon className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
