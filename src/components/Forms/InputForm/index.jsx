import React, { forwardRef } from 'react';
import { Input, Button } from 'components';
import { copy } from 'helpers/text';
import clsx from 'clsx';
import CopyIcon from 'assets/icons/copy_white.svg';

const InputForm = forwardRef(({ className = '', title, inputStyles, errorText, withCopy = false, ...props }, ref) => {
  return (
    <div className={`w-full relative flex flex-col ${className}`}>
      <div className="flex items-baseline">
        {title && (
          <label className="mb-2.5 text-white-500 sm:text-sm flex-shrink-0" htmlFor={props?.id}>
            {title}
          </label>
        )}
        {errorText && <span className="text-red ml-2.5 text-xs">{errorText}</span>}
      </div>
      <div className="w-full relative">
        <Input
          ref={ref}
          className={clsx(inputStyles, {
            'outline-red': !!errorText,
            'border-red': !!errorText,
            'focus:border-red': !!errorText,
            'focus:outline-red': !!errorText,
          })}
          {...props}
        />
        {withCopy && props?.value && (
          <Button
            type="transparent"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 h-full"
            onClick={() => copy(props?.value)}
          >
            <CopyIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
});

export { InputForm };
