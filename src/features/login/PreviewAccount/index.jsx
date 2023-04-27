import React, { useState } from 'react';
import PumaIcon from 'assets/forsage/puma.svg';
import { Button, Input, CustomLink } from 'components';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { useCheckInputPreview } from 'helpers/hooks/useCheckInputPreview';
import { linkWithQuery } from 'helpers/links';
import { EVENT_NAMES } from 'helpers/constants';
import { sendEvent } from 'helpers/sendEvent';

export const PreviewAccount = ({ randomLeader }) => {
  const [inputValue, setInputValue] = useState('');
  const { checkInput, isLoadingCheck } = useCheckInputPreview();

  const postPreviewPageAnalytics = () => {
    sendEvent({ type: EVENT_NAMES.DEMO_AND_PREVIEW });
  };

  const handleOnClick = () => {
    postPreviewPageAnalytics();
    checkInput(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleOnClick();
    }
  };

  return (
    <div className="flex flex-col mb-15">
      <div className="flex flex-col">
        <div className="flex flex-col sm:px-5">
          <span className="text-white text-3xl font-bold ">Account preview</span>
          <span className="text-white-500 text-base mt-1 mb-7.5">
            Look up any <span className="notranslate mx-1.5">Forsage BUSD</span> member account in preview mode. Enter
            ID or <span className="notranslate mx-1.5">BUSD</span> address to preview or click Demo to view a random
            account.
          </span>
        </div>
        <div className="flex sm:flex-col">
          <div className="flex flex-col flex-1 justify-between sm:w-full bg-main-blue-200 rounded sm:rounded-none p-7.5 sm:p-5 mr-10 sm:mr-0 sm:mb-5">
            <span className="text-white mb-3">
              Enter <span className="notranslate mx-1">ID</span> or <span className="notranslate mx-1">BUSD</span>
              wallet
            </span>
            <div className="flex sm:flex-col">
              <Input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                value={inputValue}
                className="flex-1 mr-5 sm:mr-0 sm:mb-3.5 py-2"
                type="text"
                placeholder="example: 87381"
              />
              <Button onClick={handleOnClick} disabled={isLoadingCheck} type="primary" className="rounded-mini">
                {isLoadingCheck ? <PuffLoadingIcon className={'w-6 h-6'} /> : 'Preview'}
              </Button>
            </div>
          </div>
          <div className="w-1/3 min-w-320px sm:w-full sm:px-5">
            <div className="flex flex-col w-full rounded bg-black-light p-7.5 relative">
              <span className="text-white mb-3">
                Don’t know any <span className="notranslate ml-1.5">ID?</span>
              </span>
              <CustomLink href={linkWithQuery('/dashboard', { user: randomLeader })}>
                <Button type="light-white" className="rounded-mini w-max" onClick={postPreviewPageAnalytics}>
                  Check demo
                </Button>
              </CustomLink>
              <PumaIcon className="absolute top-1/2 right-0 transform -translate-y-1/2 fill-current text-white-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
