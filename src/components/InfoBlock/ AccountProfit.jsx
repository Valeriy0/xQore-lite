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
import { splitNumber } from 'helpers/format';

const InfoBlockComp = ({
  isLoading = false,
  className,
  title,
  newBUSD,
  totalBUSD,
  newBNB,
  totalBNB,
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

  const filterNums = (num) => {
    let filteredNum = Number(num);
    filteredNum = filteredNum.toFixed(5);
    filteredNum = filteredNum.toString().replace(/0*$/, '');
    return Number(filteredNum);
  };

  const renderUpcountBNB = useMemo(() => {
    if (isNewUpcount) {
      const wrapperBg = parseInt(newBNB) !== 0 ? 'text-green-light' : 'text-white';
      return (
        <div className="flex p-1.5">
          <div className={`w-full ${wrapperBg} flex text-base items-center justify-end notranslate sm:text-sm`}>
            <div className="flex items-center justify-start">
              {withIcon && <ArrowUpFull className={'stroke-current mr-1.5'} />}
              {isLoading ? '-' : newBNB}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="p-5 pt-0 flex text-green-light text-base items-baseline notranslate sm:text-sm">
        {withIcon && <ArrowUpFull className={'mr-1.5'} />}
        {isLoading ? '-' : filterNums(newBNB)}
      </div>
    );
  }, [isNewUpcount, withIcon, newBNB, isLoading]);

  const renderUpcount = useMemo(() => {
    if (isNewUpcount) {
      const wrapperBg = parseInt(newBUSD) > 0 ? 'text-green-light' : 'text-white';
      return (
        <div className="flex p-1.5">
          <div className={`w-full ${wrapperBg} flex text-base items-center justify-end notranslate sm:text-sm`}>
            <div className="flex items-center justify-start">
              {withIcon && <ArrowUpFull className={'stroke-current mr-1.5'} />}
              {isLoading ? '-' : newBUSD}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className=" flex text-green-light text-base items-baseline notranslate sm:text-sm">
        {withIcon && <ArrowUpFull className={'mr-1.5'} />}
        {isLoading ? '-' : newBUSD}
      </div>
    );
  }, [isNewUpcount, withIcon, newBUSD, isLoading]);

  return (
    <div className={clsx(className, 'relative flex flex-col bg-black-light rounded w-full')}>
      <img className="h-full absolute top-0 bottom-0 left-1/2 -translate-x-1/2" src="/bnbBusd.png" alt="" />
      <div className="flex flex-col px-5 py-5 w-full">
        <div className="flex items-center mb-1">
          <span className="text-white-500 text-base sm:text-sm sm:whitespace-nowrap">{title}</span>
          {!sharedTitles.includes(title) && <Tips title={title} />}
          {isActiveAuthUser && sharedTitles.includes(title) && (
            <ShareIcon className="ml-2.5 sm:ml-1 cursor-pointer" onClick={() => setOpenedModalType(title)} />
          )}
        </div>
        <div className="flex items-center justify-between">
          <div
            className={`flex flex-1 w-full text-white text-2xl font-bold notranslate sm:text-xl ${
              isNewUpcount && '!mt-1 !sm:mt-2.5'
            } ${withMarginGap && 'mt-5 sm:mt-2.5'}`}
          >
            {isLoading ? '-' : `${splitNumber(totalBUSD)} BUSD`}
          </div>
          {!isNil(newBUSD) && renderUpcount}
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`text-white text-2xl font-bold notranslate sm:text-xl ${isNewUpcount && '!mt-1 !sm:mt-2.5'} ${
              withMarginGap && 'mt-5 sm:mt-2.5'
            }`}
          >
            {isLoading ? '-' : `${splitNumber(filterNums(totalBNB))} BNB`}
          </span>
          {!isNil(newBNB) && renderUpcountBNB}
        </div>
      </div>
      <InfoBlockModal
        isOpened={openedModalType.length > 0}
        handleCloseModal={() => setOpenedModalType('')}
        openedModalType={openedModalType}
        total={`${totalBUSD} BUSD`}
      />
    </div>
  );
};

InfoBlockComp.defaultProps = {
  totalBUSD: '-',
  newBUSD: '-',
  totalBNB: '-',
  newBNB: '-',
  withIcon: true,
  withMarginGap: true,
};

export const AccountProfit = InfoBlockComp;
