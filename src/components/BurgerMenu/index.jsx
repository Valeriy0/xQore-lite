import React, { useEffect } from 'react';
import { Menu, Button, CustomLink } from 'components';
import LogoIcon from 'assets/logo.svg';

export const BurgerMenu = ({ active, setActive, openSearch }) => {
  const changeMenu = () => {
    setActive(false);
  };

  const openSearchPreview = () => {
    setActive(true);
    openSearch();
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [active]);

  const clientHeightDoc = document.documentElement.clientHeight;

  return (
    <div
      className={`hidden justify-start items-start bg-main-bg pb-5 pt-7.5 transition duration-500 ease-in-out bg-main-bg absolute top-0 left-0 z-20 inset-0 h-screen w-screen z-999999 ${
        active ? 'translate-x-0' : '-translate-x-120%'
      } lg:flex flex-col lg:py-2.5`}
    >
      <div style={{ height: `${clientHeightDoc}px` }} className="w-full flex flex-col flex-1">
        <div className="flex justify-between items-center w-full px-10 sm:px-5">
          <CustomLink href="/">
            <LogoIcon className={`block mr-2.5`} />
          </CustomLink>
          <Button type="black-light-circle" className="hidden lg:flex flex-col" onClick={changeMenu}>
            <span className="w-4 border-t border-white -mb-px rotate-45" />
            <span className="w-4 border-t border-white -rotate-45" />
          </Button>
        </div>
        <div className="w-full h-full pl-10 pr-7.5 lg:pr-0 lg:pl-10 sm:pl-5 overflow-auto">
          <Menu changeActive={changeMenu} openSearchPreview={openSearchPreview} />
        </div>
      </div>
    </div>
  );
};
