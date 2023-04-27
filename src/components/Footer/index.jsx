import React, { useState } from 'react';
import { SocialButtons, Button } from 'components';
import { DocsModal } from 'components/modals/DocsModal';
import { format } from 'date-fns';

export const Footer = ({ className, isLoginPage = false }) => {
  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => {
    setIsOpened(true);
  };

  if (isLoginPage) {
    return (
      <footer className="flex z-10  items-center  justify-between  py-10 w-full sm:justify-start sm:items-start sm:flex-col sm:px-5 sm:pt-7.5 sm:pb-12 sm:mt-0">
        <div className="flex items-center sm:w-full sm:items-start sm:text-left sm:flex-col sm:order-2">
          <span className="text-white-500 text-base font-normal mr-2.5 sm:text-sm sm:mb-2.5 sm:mr-0">
            © {format(new Date(), 'yyyy')} All Rights Reserved
          </span>
          <Button
            type="transparent"
            onClick={() => openModal()}
            className="text-white hover:text-white-500 font-normal text-sm notranslate"
          >
            Documents
          </Button>
        </div>
        <div className="flex space-x-14 sm:w-full sm:space-y-14 sm:space-x-0 sm:order-1 sm:mb-7.5">
          <SocialButtons />
        </div>
        {isOpened && <DocsModal onClose={() => setIsOpened(false)} />}
      </footer>
    );
  }

  return (
    <footer
      className={`flex lg:flex-col items-center mt-auto justify-between lg:justify-start lg:items-start py-10 w-full lg:p-5 lg:pb-9 ${className}`}
    >
      <div className="hidden lg:block mb-7.5">
        <SocialButtons />
      </div>
      <span className="text-white-500 text-xs font-normal lg:mb-2.5">
        © {format(new Date(), 'yyyy')} All Rights Reserved
      </span>
      <Button
        type="transparent"
        onClick={() => openModal()}
        className="text-white hover:text-white-500 font-normal text-sm notranslate"
      >
        Documents
      </Button>
      {isOpened && <DocsModal onClose={() => setIsOpened(false)} />}
    </footer>
  );
};
