import React, { forwardRef } from 'react';

export const Checkbox = forwardRef(({ title, onChange, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-4">
      <input
        ref={ref}
        onChange={onChange}
        className="w-6 h-6"
        type="checkbox"
        id="forsage-checkbox"
        name="A3-confirmation"
        {...props}
      />
      <label htmlFor="forsage-checkbox" className="text-white text-base">
        {title}
      </label>
    </div>
  );
});
