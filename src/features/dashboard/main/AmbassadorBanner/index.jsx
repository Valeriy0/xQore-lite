import React, { useState } from 'react';
import { Button } from 'components';
import { AmbassadorModal } from 'components/modals';

export const AmbassadorBanner = () => {
  const [openedModal, setOpenedModal] = useState(false);
  return (
    <div className="sm:px-5">
      <div className="ambassador-buttonGradient rounded p-[1px]">
        <div className="overflow-hidden bg-darkBlack rounded h-[140px] sm:h-auto w-full flex items-center justify-between space-x-5 sm:space-x-0 sm:flex-col sm:px-5 sm:py-[30px]">
          <div className="pl-5 h-full flex items-center sm:order-3 sm:w-full sm:pl-0">
            <Button
              onClick={() => setOpenedModal(true)}
              type="ambassador-gradient"
              className="py-[8px] px-[30px] sm:w-full sm:max-w-full sm:py-2.5"
            >
              Go to Program
            </Button>
          </div>
          <div className="py-[25px] h-full flex items-center justify-center sm:order-2 sm:py-[30px] ">
            <img src="/ambassador/text-logo.svg" className="max-h-[60px] sm:max-h-[50px] h-full" alt="" />
          </div>
          <img src="/ambassador/logo-full.png" className="pr-5 sm:pr-0 h-[130%] sm:h-[125px] sm:order-1" alt="" />
        </div>
      </div>
      <AmbassadorModal onClose={() => setOpenedModal(false)} openedModal={openedModal} />
    </div>
  );
};
