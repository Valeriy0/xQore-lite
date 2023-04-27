import React, { forwardRef, useMemo } from 'react';
import InputMask from 'react-input-mask';

const Input = forwardRef(({ className, value, mask, onChange, onBlur, ...props }, ref) => {
  const typeClassName = useMemo(() => {
    switch (props?.type) {
      case 'text': {
        return `w-full bg-white-100 border-2 border-transparent rounded-mini py-3 px-5 text-white outline-none ${
          !props.readOnly && 'focus:border-2 focus:border-main-blue focus:bg-transparent'
        } ${className}`;
      }
      case 'checkbox': {
        return `w-6 h-6 mr-4 ${className} `;
      }
      default: {
        return `w-full bg-white-100 border-2 border-transparent rounded-mini py-3 px-5 text-white outline-none focus:border-2 focus:border-main-blue focus:bg-transparent ${className}`;
      }
    }
  }, [props?.type, className]);

  const renderInput = () => {
    if (mask) {
      return (
        <InputMask {...{ mask, onChange, onBlur, value }} className={typeClassName} {...props}>
          {(inputProps) => <input ref={ref} {...inputProps} value={value} />}
        </InputMask>
      );
    }

    return <input ref={ref} className={typeClassName} {...{ mask, onChange, onBlur, value }} {...props} />;
  };

  return renderInput();
});

export { Input };
