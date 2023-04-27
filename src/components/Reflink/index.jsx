import React, { useMemo, useState } from 'react';
import { Button, CustomLink } from 'components';
import { ShareLinkModal } from 'components/modals';
import CopyIcon from 'assets/icons/copy_white.svg';
import ShareIcon from 'assets/icons/share_blue.svg';
import InclineArrowIcon from 'assets/icons/full_arrow_incline.svg';
import { useRouter } from 'next/router';
import { copy } from 'helpers/text';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import { ReflinkTypes } from 'helpers/constants';
import { Tips } from 'components/Tips';
import FireIcon from 'assets/icons/fire_icon.svg';

export const Reflink = ({ refkey = '', refkeyType = 'base', type, onClick }) => {
  const [isOpened, setIsOpened] = useState(false);

  const { query } = useRouter();
  const isPreviewMode = !!query.user;
  const isAuthProfile = !!useSelector(getAuthUser)?.id;

  const regToUpline = !!onClick && isPreviewMode && !isAuthProfile;

  const reflink = ReflinkTypes[refkeyType] + refkey;
  const titleReflink = reflink.replace('https://', '');

  const blockTitle = useMemo(() => (isPreviewMode ? 'Personal link' : 'My personal link'), [isPreviewMode]);

  const ShareModalOpen = (e) => {
    e.preventDefault();

    setIsOpened(true);
  };

  const renderLinks = useMemo(() => {
    switch (type) {
      case 'linkCard':
        return (
          <div className="flex flex-col max-w-500px w-full sm:max-w-full">
            <div className="relative flex flex-grow w-full h-full flex-col p-5 justify-between bg-blue-100 rounded rounded-b-none z-10">
              {!regToUpline && (
                <CustomLink href="/partners" className="absolute top-2 right-2 sm:top-1 sm:right-1">
                  <InclineArrowIcon />
                </CustomLink>
              )}
              <div className="flex items-center">
                <span className="text-white-500 text-base sm:text-sm">{blockTitle}</span>
                <Tips title={blockTitle} />
              </div>

              <div className={`flex flex-wrap justify-between flex-col`}>
                <span className={`text-main-blue text-2xl font-bold sm:text-xl mb-2.5 notranslate`}>
                  {titleReflink}
                </span>
                <div className="flex space-x-2.5">
                  <Button
                    type={regToUpline ? 'transparent' : 'light-blue-rounded'}
                    className="!leading-30px"
                    onClick={() => copy(reflink)}
                  >
                    {regToUpline ? <CopyIcon className="w-5 h-5 stroke-current text-white" /> : 'Copy'}
                  </Button>
                  {!regToUpline && !isPreviewMode && (
                    <Button type="white-blue-rounded" className="relative !leading-30px" onClick={ShareModalOpen}>
                      <FireIcon className="animate-pulse absolute -top-1.5 -right-1.5 w-5 h-5" /> Share
                    </Button>
                  )}
                </div>
                {regToUpline && (
                  <div className="flex justify-between items-center text-left border-t border-white-100 w-full mt-2.5 pt-2.5">
                    <div className="flex flex-wrap text-white-500 mr-1.5">
                      <div className="mr-1.5">Not a member yet? </div>
                      <div>
                        Sign up with <span className="whitespace-nowrap">this upline</span>
                      </div>
                    </div>
                    <Button type="light-blue-rounded" className="w-max flex-shrink-0" onClick={onClick}>
                      Sign up
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between bg-cyan-200 text-white w-full px-5 p-2.5 rounded rounded-t-none">
              My xQore invite link
              <CustomLink href="/links#xQoreLink" className="p-1 px-3 bg-white-100 rounded hover:bg-white-200">
                View
              </CustomLink>
            </div>
          </div>
        );
      case 'mini':
        return (
          <div className="flex sm:flex-col w-full bg-blue-100 justify-between items-center rounded-lg py-2 px-2.5 mb-7 sm:p-5 sm:mb-5 sm:items-start">
            <span className="text-main-blue text-base font-bold sm:mb-2.5">{titleReflink}</span>
            <div className="flex space-x-2.5">
              <Button
                type="light-blue-rounded"
                className="sm:leading-30px"
                onClick={() => {
                  copy(reflink);
                }}
              >
                Copy
              </Button>
              {!isPreviewMode && (
                <Button type="light-blue-rounded" className="sm:leading-30px" onClick={ShareModalOpen}>
                  Share
                </Button>
              )}
            </div>
          </div>
        );
      case 'fullScreenQore':
        return (
          <div className="flex flex-wrap sm:flex-col sm:right-5 w-full p-7 justify-between bg-cyan-150 rounded sm:p-5">
            <div className="flex flex-col">
              <div className="flex items-center mb-2.5">
                <span className="text-base text-white-500">
                  {blockTitle} <span className="text-cyan-500">xQore</span>{' '}
                </span>
                <Tips title={blockTitle} />
              </div>
              <span className="text-3xl font-bold text-cyan-500 sm:text-xl sm:mb-5">
                {(ReflinkTypes['xQore'] + refkey).replace('https://', '')}
              </span>
            </div>
            <div className="flex items-end space-x-7 sm:space-x-2.5 mt-2.5">
              <Button
                type="light-blue"
                className="rounded-mini sm:rounded sm:py-0 sm:px-2.5 sm:leading-30px"
                onClick={() => {
                  copy(ReflinkTypes['xQore'] + refkey);
                }}
              >
                Copy
                <CopyIcon className="w-5 h-5 ml-2.5 stroke-current text-white sm:hidden" />
              </Button>
            </div>
          </div>
        );
      case 'fullScreen':
        return (
          <div
            id="xQoreLink"
            className="flex flex-wrap sm:flex-col sm:right-5 w-full p-7 justify-between bg-dark-blue-100 rounded sm:p-5"
          >
            <div className="flex flex-col">
              <div className="flex items-center mb-2.5">
                <span className="text-base text-white-500">{blockTitle}</span>
                <Tips title={blockTitle} />
              </div>
              <span className="text-3xl font-bold text-main-blue sm:text-xl sm:mb-5">{titleReflink}</span>
            </div>
            <div className="flex items-end space-x-7 sm:space-x-2.5 mt-2.5">
              <Button
                type="light-blue"
                className="rounded-mini sm:rounded sm:py-0 sm:px-2.5 sm:leading-30px"
                onClick={() => {
                  copy(reflink);
                }}
              >
                Copy
                <CopyIcon className="w-5 h-5 ml-2.5 stroke-current text-white sm:hidden" />
              </Button>
              {!isPreviewMode && (
                <Button
                  type="light-blue"
                  className="rounded-mini sm:rounded sm:py-0 sm:px-2.5 sm:leading-30px"
                  onClick={ShareModalOpen}
                >
                  Share
                  <ShareIcon className="w-5 h-5 ml-2.5 stroke-current text-white sm:hidden" />
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-wrap sm:flex-col sm:right-5 w-full p-7 justify-between bg-dark-blue-100 rounded sm:p-5 sm:rounded-none">
            <div className="flex flex-col">
              <span className="text-base text-white-500 mb-2.5">{blockTitle}</span>
              <span className="text-two-half font-bold text-main-blue sm:text-xl sm:mb-5">{titleReflink}</span>
            </div>
            <div className="flex items-end space-x-7 sm:space-x-2.5 mt-2.5">
              <Button
                type="light-blue"
                className="flex rounded-mini sm:rounded"
                onClick={() => {
                  copy(reflink);
                }}
              >
                Copy
                <CopyIcon className="ml-2.5 sm:hidden" />
              </Button>
              <Button type="light-blue" className="flex rounded-mini sm:rounded" onClick={ShareModalOpen}>
                Share
                <ShareIcon className="ml-2.5 sm:hidden" />
              </Button>
            </div>
          </div>
        );
    }
  }, [refkey]);

  return (
    <>
      {renderLinks}
      {isOpened && <ShareLinkModal reflink={reflink} onClose={() => setIsOpened(false)} />}
    </>
  );
};
