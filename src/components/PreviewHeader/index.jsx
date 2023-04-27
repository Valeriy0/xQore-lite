import React, { useEffect, useRef, useState } from 'react';
import { Button, Menu, CustomLink } from 'components';
import { useRouter } from 'next/router';
import CloseIcon from 'assets/icons/close.svg';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { useWeb3React } from '@web3-react/core';
import MobileLogoIcon from 'assets/mobile_logo.svg';
import LogoIcon from 'assets/logo.svg';

const PreviewHeader = ({ searchIsClicked, onClosedPreview }) => {
  const { active } = useWeb3React();
  const isMobileUser = window.innerWidth <= 1121;
  const { push, query, pathname } = useRouter();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(query.user);
  const [isFocused, setIsFocused] = useState(isMobileUser);
  const { checkInput, isLoadingCheck } = useCheckInputPreview();
  const authUser = useSelector(getAuthUser);

  const onGoClick = async () => {
    checkInput(inputValue);
  };

  const onClose = () => {
    handleFocused(false);
    onClosedPreview && onClosedPreview();
  };

  useEffect(() => {
    if (isFocused && isMobileUser) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFocused, isMobileUser]);

  const onLoginClick = () => {
    if (!!authUser?.id) {
      onClosedPreview();
      return push('/dashboard');
    }

    return push('/');
  };

  useEffect(() => {
    query.user && setIsFocused(false);

    setInputValue(query.user);
    if (!isMobileUser) {
      inputRef.current.blur();
    }
  }, [query.user]);

  const handleFocused = (value) => () => {
    setIsFocused(value);
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onGoClick();
    }
  };

  useEffect(() => {
    if (!isMobileUser) {
      pathname && setIsFocused(false);
    }
  }, [pathname]);

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 flex justify-center w-full px-10 py-2.5 z-40 lg:p-0 lg:max-h-screen z-999999">
        <div
          className={`flex justify-between items-center rounded-mini max-w-desktop-preview-bar w-full bg-main-blue px-5 py-2 shadow-preview-bar lg:pl-10 sm:pl-5 lg:py-2.5 lg:rounded-none lg:rounded-b-mini lg:pr-0 ${
            isFocused && 'lg:flex-col lg:pb-5 lg:h-screen lg:max-h-screen lg:rounded-b-none lg:justify-start'
          }`}
        >
          <div
            className={`flex w-full overflow-hidden items-center justify-between space-x-2.5 lg:items-start ${
              isFocused ? 'lg:order-2 lg:flex-col lg:pt-10 lg:items-start lg:space-y-7.5 lg:flex-1 lg:h-full' : ''
            }`}
          >
            <div
              className={`w-full flex justify-start items-center space-x-5 lg:flex-col lg:h-full lg:items-start lg:space-x-0 lg:space-y-7.5`}
            >
              <div
                className={`flex items-center  ${isFocused && 'lg:flex-col lg:items-start'} lg:w-full lg:pr-10 sm:pr-5`}
              >
                <CustomLink href="/">
                  {isFocused && isMobileUser ? (
                    <LogoIcon className="absolute top-4 left-5" />
                  ) : (
                    <MobileLogoIcon className="block mr-2.5" />
                  )}
                </CustomLink>

                <span
                  className={`text-base text-white whitespace-nowrap mr-5 notranslate lg:mr-0 ${
                    isFocused && 'lg:text-2xl lg:text-medium lg:mb-7.5'
                  }`}
                >
                  Preview ID
                  <span className="hidden lg:inline ml-1.5">{query.user}</span>
                </span>
                <div
                  className={`flex justify-between items-center space-x-2.5 lg:space-x-5 lg:w-full ${
                    isFocused ? 'lg:flex' : 'lg:hidden'
                  }`}
                >
                  <input
                    ref={inputRef}
                    onKeyPress={onEnter}
                    onFocus={handleFocused(true)}
                    className={`px-4 py-3 rounded-mini leading-5 bg-white-100 text-white text-base outline-none ${
                      isFocused && 'lg:w-full lg:flex-1'
                    }`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button
                    onClick={onGoClick}
                    type="black"
                    disabled={isLoadingCheck || query.user === inputValue}
                    className={isFocused && 'lg:px-10'}
                  >
                    {isLoadingCheck ? <PuffLoadingIcon className="w-6 h-6" /> : 'Go'}
                  </Button>
                </div>
              </div>
              {isFocused && (
                <>
                  <div className="w-full pr-5 lg:pr-10 sm:pr-5 !mt-4">
                    <Button
                      type="preview-login"
                      className="whitespace-nowrap hidden lg:flex w-full"
                      onClick={onLoginClick}
                    >
                      Exit preview mode
                    </Button>
                  </div>
                  <div className="overflow-auto w-full hidden lg:flex">
                    <Menu changeActive={handleFocused(false)} openSearchPreview={!!searchIsClicked} />
                  </div>
                </>
              )}
            </div>
            {!searchIsClicked && !authUser?.id && (
              <Button type="preview-login" className="whitespace-nowrap lg:hidden" onClick={onLoginClick}>
                {active ? 'Login to your account' : 'Connect wallet'}
              </Button>
            )}
          </div>
          <div className="flex lg:justify-end lg:ml-auto lg:pr-10 sm:pr-5">
            <Button type="light-white" className="rounded-full lg:hidden w-10 h-10 !p-0 ml-5" onClick={onClose}>
              <CloseIcon className="w-6 h-6 cursor-pointer" />
            </Button>
            <div className="">
              <Button
                type="light-white"
                className="flex-col rounded-full w-10 h-10 !p-0 hidden lg:flex"
                onClick={() => {
                  if (!!isFocused && isMobileUser && !query.user) {
                    onClosedPreview();
                  }

                  setIsFocused(!isFocused);
                }}
              >
                {isFocused ? (
                  <div className="">
                    <CloseIcon className="w-6 h-6 cursor-pointer" />
                  </div>
                ) : (
                  <>
                    <span className="w-4 border-t border-white mb-2" />
                    <span className="w-4 border-t border-white" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isFocused && searchIsClicked && (
        <div className="fixed w-screen h-screen bg-black-700 z-30 left-0 top-0 bottom-0 right-0" />
      )}
    </>
  );
};

export { PreviewHeader };
