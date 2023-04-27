import React from 'react';
import { SocialButtons, Menu } from 'components';

export const LeftBar = () => {
  return (
    <div className="flex flex-col min-h-screen w-full flex-shrink-0 pl-10 pr-5 pt-22 overflow-auto">
      <div className="flex-1 lg:pr-0 lg:pl-10 sm:pl-5">
        <Menu />
      </div>
      <div className="mt-auto ">
        <div className="pt-5 pb-10 w-full flex flex-col items-center justify-center">
          <SocialButtons />
        </div>
      </div>
    </div>
  );
};
