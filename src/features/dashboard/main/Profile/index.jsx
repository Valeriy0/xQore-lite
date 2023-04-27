import React, { useMemo, useState } from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import ReactPlaceholder from 'react-placeholder';
import { TextRow } from 'react-placeholder/lib/placeholders';
import { linkWithQuery } from 'helpers/links';
import { format, parseISO } from 'date-fns';
import SettingsIcon from 'assets/icons/settings.svg';
import { Reflink, Button, CustomLink, StatusIcon } from 'components';
import CopyIcon from 'assets/icons/copy_white.svg';
import { shortenAddress } from 'helpers/format';
import { copy } from 'helpers/text';
import { StatusModal } from 'components/modals';
import { STATUS_TYPES } from 'helpers/constants';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { getPreviewAccount } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';

const IdPlaceHolder = (
  <div className="flex items-center justify-center w-[170px] ml-2.5 mr-2.5">
    <TextRow color="white" className="min-h-[26px] !m-0 rounded-mini" />
  </div>
);

export const Profile = () => {
  const { query, push } = useRouter();
  const currentUser = useSelector(getCurrentUserProfile);
  const previewAccount = useSelector(getPreviewAccount);
  const isPreviewMode = !!query.user;
  const { id, date, count_partners, refkey, referrer_id, address, nickname, photo } = isPreviewMode
    ? previewAccount
    : currentUser;

  const [isHideId, setIsHideId] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const stylesProps = photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover' } : {};
  const isNormalMode = !query.user;

  const onClickSignupPreview = () => {
    setCookie(null, 'upline_binance', id, {
      path: '/',
    });

    push('/registration');
  };

  const statusModalOpen = (e) => {
    e.preventDefault();
    if (isNormalMode) {
      setIsOpened(true);
    }
  };

  const handleSetHide = () => {
    setIsHideId((prev) => !prev);
  };

  const statusBlocks = useMemo(() => {
    if (count_partners >= 3 && count_partners < 25)
      return {
        status: STATUS_TYPES?.BRONZE,
        title: 'Bronze',
        className: 'text-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-light to-white',
        bg: 'bg_bronze_gradient',
      };
    if (count_partners >= 25 && count_partners < 50)
      return {
        status: STATUS_TYPES?.SILVER,
        title: 'Silver',
        className: 'text-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-light to-white',
        bg: 'bg_silver_gradient',
      };
    if (count_partners >= 50)
      return {
        status: STATUS_TYPES?.GOLD,
        title: 'Gold',
        className:
          'font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold-900 via-gold-500 to-gold-100',
        bg: 'bg_gold_gradient',
      };
    return {
      status: STATUS_TYPES?.BASE,
      title: 'Basic',
      className: 'font-bold text-2xl text-white',
      bg: '',
    };
  }, [count_partners]);

  const renderIdInfo = useMemo(() => {
    return (
      <div className="flex flex-col items-start ml-6 h-full justify-center my-auto">
        <div className="flex justify-center items-center mb-1 sm:mb-2.5">
          {nickname ? (
            <div className="flex flex-wrap items-center">
              <span className="text-white text-3xl font-medium mr-2.5">{nickname}</span>
              <span
                onClick={handleSetHide}
                className="text-main-blue text-xl white mr-2.5 whitespace-nowrap cursor-pointer"
              >
                ID {isHideId ? '***' : id}
              </span>
            </div>
          ) : (
            <ReactPlaceholder ready={id} showLoadingAnimation customPlaceholder={IdPlaceHolder}>
              <span
                onClick={handleSetHide}
                className="text-white notranslate font-bold text-3xl mr-2.5 sm:text-xl cursor-pointer"
              >
                {`ID ${isHideId ? '*****' : id}`}
              </span>
            </ReactPlaceholder>
          )}
          {isNormalMode && (
            <CustomLink href={linkWithQuery(`/dashboard/profile`, { user: query.user })}>
              <Button
                className="rounded-full !p-0 w-10 h-10 sm:bg-transparent sm:p-0 sm:h-auto sm:w-auto"
                type="light-white"
              >
                <SettingsIcon className="w-6 h-6" />
              </Button>
            </CustomLink>
          )}
        </div>
        <div className="flex flex-col items-start">
          {!!address && (
            <div className="flex items-center mb-1">
              <span className="text-white font-bold mr-2.5 text-base sm:text-sm">{shortenAddress(address, 4)}</span>
              <button
                onClick={() => {
                  copy(address);
                }}
              >
                <CopyIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          {!!referrer_id && (
            <div className="flex items-center text-white-500 text-base sm:text-sm">
              <div className="flex items-center flex-wrap mr-1">
                <span className="mr-1.5"> invited {date ? format(parseISO(date), 'dd.MM.yyyy') : ''} </span>
                <div className="flex items-center flex-nowrap">
                  <span className="mr-1.5"> by </span>
                  <CustomLink
                    href={linkWithQuery('/dashboard', { user: referrer_id })}
                    className="inline-flex px-2.5 notranslate !leading-30px bg-blue-100 hover:bg-main-blue-300 text-main-blue rounded text-base w-max sm:text-sm"
                  >
                    ID {isHideId ? '***' : referrer_id}
                  </CustomLink>
                </div>
              </div>
            </div>
          )}
          {isNormalMode && (
            <Button
              onClick={statusModalOpen}
              className="px-5 py-1 sm:py-1.5 rounded-2xl mt-3.5"
              type="gradient-purp-orange"
            >
              Join Priority Leaders
            </Button>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="flex w-full items-start justify-between space-x-10 lg:space-x-2.5 sm:space-x-0 sm:space-y-5 sm:flex-col sm:px-5">
      <div className="flex items-start flex-shrink-0 sm:flex-shrink">
        <div onClick={statusModalOpen} className="relative cursor-pointer rounded-full bg-gray p-2.5 sm:p-[5px] z-10">
          <div className="">
            <div
              className="z-10 flex-shrink-0 relative w-30 h-30 rounded-full bg-black-light cursor-pointer sm:w-[80px] sm:h-[80px]"
              style={stylesProps}
            >
              {!photo && <img alt="" className="max-w-full max-h-full" src={'/UnknownUser.png'} />}
            </div>
            <StatusIcon className="z-10 absolute bottom-0 right-0" status={statusBlocks?.status} />
          </div>
          <div className="absolute z-0 -bottom-2.5 -right-2.5 sm:bottom-[-5px] sm:right-[-5px] bg-gray w-[60px] h-[60px] sm:w-10 sm:h-10 rounded-full"></div>
        </div>
        {renderIdInfo}
      </div>
      <Reflink type="linkCard" refkey={refkey} onClick={onClickSignupPreview} />
      {isOpened && <StatusModal partners={count_partners} id={id} onClose={() => setIsOpened(false)} />}
    </div>
  );
};
