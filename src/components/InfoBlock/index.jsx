import React, { useMemo, useState } from 'react';
import ArrowUpFull from 'assets/icons/arrow_up_full.svg';
import clsx from 'clsx';
import ShareIcon from 'assets/icons/share_white_in_circle.svg';
import { Tips } from 'components/Tips';
import { isNil } from 'ramda';
import InfoBlockModal from './InfoBlockModal';
import { useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { useRouter } from 'next/router';

const InfoBlockComp = ({
  isLoading = false,
  new: newCount,
  className,
  title,
  total,
  withIcon,
  withMarginGap,
  isNewUpcount = false,
}) => {
  const sharedTitles = ['Partners', 'Team', 'Ratio', 'Profits'];
  const [openedModalType, setOpenedModalType] = useState('');
  const authStore = useSelector(getAuthUser);
  const user = authStore?.id;
  const { query } = useRouter();
  const isActiveAuthUser = !!query.user ? query.user === user : true;

  const renderUpcount = useMemo(() => {
    if (isNewUpcount) {
      const wrapperBg = parseInt(newCount) > 0 ? 'bg-green-100 text-green-light' : 'bg-white-100 text-white';
      return (
        <div className="flex p-2.5 w-full">
          <div
            className={`w-full ${wrapperBg} rounded p-2 flex text-base items-center justify-between notranslate sm:text-sm`}
          >
            <div className="flex items-center justify-start">
              {withIcon && <ArrowUpFull className={'stroke-current mr-1.5'} />}
              {isLoading ? '-' : newCount}
            </div>
            {parseInt(newCount) > 0 ? (
              <img src="/icons/activity_green.png" className="ml-2.5 w-6 h-6" />
            ) : (
              <img src="/icons/activity_white.png" className="ml-2.5 w-6 h-6" />
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="p-5 pt-0 flex text-green-light text-base items-baseline notranslate sm:text-sm">
        {withIcon && <ArrowUpFull className={'mr-1.5'} />}
        {isLoading ? '-' : newCount}
      </div>
    );
  }, [isNewUpcount, withIcon, newCount, isLoading]);

  return (
    <div
      className={clsx(
        className,
        'flex flex-col bg-black-light rounded desktop-infoblock-base sm:mobile-infoblock-base',
      )}
    >
      <div className="flex flex-col px-5 pt-5 w-full">
        <div className="flex items-center">
          <span className="text-white-500 text-base sm:text-sm sm:whitespace-nowrap">{title}</span>
          {!sharedTitles.includes(title) && <Tips title={title} />}
          {isActiveAuthUser && sharedTitles.includes(title) && (
            <ShareIcon className="ml-2.5 sm:ml-1 cursor-pointer" onClick={() => setOpenedModalType(title)} />
          )}
        </div>

        <span
          className={`text-white text-2xl font-bold notranslate sm:text-xl ${isNewUpcount && '!mt-1 !sm:mt-2.5'} ${
            withMarginGap && 'mt-5 sm:mt-2.5'
          }`}
        >
          {isLoading ? '-' : total}
        </span>
      </div>
      {!isNil(newCount) && renderUpcount}
      <InfoBlockModal
        isOpened={openedModalType.length > 0}
        handleCloseModal={() => setOpenedModalType('')}
        openedModalType={openedModalType}
        total={total}
      />
    </div>
  );
};

InfoBlockComp.defaultProps = {
  total: '-',
  new: '-',
  withIcon: true,
  withMarginGap: true,
};

export const InfoBlock = InfoBlockComp;
