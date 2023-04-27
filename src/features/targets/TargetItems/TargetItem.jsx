import React from 'react';
import SettingIcon from 'assets/icons/settings.svg';
import SuccessIcon from 'assets/icons/success_check.svg';

export const TargetItem = ({ subject, description, progress, amount, image }) => {
  const bgStyles = {
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), linear-gradient(0deg, rgba(24, 25, 26, 0.6), rgba(24, 25, 26, 0.6)), url(${image})`,
    backgroundSize: 'cover',
  };
  const percent = Math.min(Math.abs((progress / amount) * 100), 100);
  const success = percent >= 100;
  const barStyle = { width: `${percent}%` };

  return (
    <div
      style={bgStyles}
      className={`relative flex flex-col justify-between p-7.5 w-full h-300px rounded bg-black-light ${
        success && 'border border-green'
      }`}
    >
      {!success && <SettingIcon className="absolute top-3.5 right-3.5" />}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-white font-medium text-2xl">{subject}</span>
          {description && <SuccessIcon className="w-6 h-6 ml-3" />}
        </div>
        <div className="">
          {description ? (
            <span className="text-green">Complete</span>
          ) : (
            <div className="mt-5">
              <div className="h-2.5 relative max-w-xl rounded-full overflow-hidden mb-2.5">
                <div className="w-full h-full bg-white-500 absolute" />
                <div className="transition-all ease-out duration-1000 h-full bg-green relative" style={barStyle} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green">{percent?.toFixed(2)}% </span>
                <span className="text-white-500">{amount} BUSD </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="text-white-500">{description}</span>
    </div>
  );
};
