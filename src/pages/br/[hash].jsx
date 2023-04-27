import React, { useMemo } from 'react';
import { RefUplineRepository } from 'connectors/repositories/ref-upline';
import { setCookie } from 'nookies';
import { Button, CustomLink, StatusIcon } from 'components';
import { InviteLayout } from 'layouts';
import GoldBranchLeft from 'assets/icons/gold_branch_left.svg';
import GoldBranchRight from 'assets/icons/gold_branch_right.svg';
import CopyIcon from 'assets/icons/copy_white.svg';
import { copy } from 'helpers/text';
import { EVENT_NAMES, STATUS_TYPES } from 'helpers/constants';
import PumaIcon from 'assets/forsage/puma_full.svg';
import { BNB_COMMISSIONS, PROGRAM_NAMES, PROGRAM_PRICES, ReflinkTypes } from 'helpers/constants';
import config from 'helpers/config';
import { sendEvent } from 'helpers/sendEvent';

const BRHash = ({
  id,
  count_partners,
  photo,
  profit_x3,
  profit_x4,
  profit_xxx,
  profit_xgold,
  refkey,
  team,
  telegram,
  email,
}) => {
  const styleBgTop = {
    backgroundImage: `url('/blurs/partners/top_invite.png')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };
  const styleBgCenter = {
    backgroundImage: `url('/blurs/partners/center_invite.png')`,
    backgroundRepeat: 'round',
    backgroundSize: 'cover',
  };

  const stylesProps = photo ? { backgroundImage: `url(${photo})`, backgroundSize: 'cover' } : {};
  const statusBlocks = useMemo(() => {
    if (count_partners >= 3 && count_partners < 25)
      return {
        status: STATUS_TYPES?.BRONZE,
        title: 'Bronze',
        className: 'text-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-light to-white',
      };
    if (count_partners > 25)
      return {
        status: STATUS_TYPES?.SILVER,
        title: 'Silver',
        className: 'text-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-light to-white',
      };
    if (count_partners > 50)
      return {
        status: STATUS_TYPES?.GOLD,
        title: 'Gold',
        className:
          'font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold-900 via-gold-500 to-gold-100',
      };
    return {
      status: STATUS_TYPES?.BASE,
      title: 'Basic',
      className: 'font-bold text-2xl text-white',
    };
  }, [count_partners]);

  const reflink = ReflinkTypes['group'] + refkey;

  const tutorial = [
    {
      render: () => (
        <div className="flex justify-start items-center">
          Install a Smart Chain compatible cryptowallet (Metamask, TokenPocket, Trust)
        </div>
      ),
    },
    {
      render: () => (
        <div className="">
          Top up your wallet with at least {PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]}{' '}
          <span className="notranslate">BUSD</span> and {BNB_COMMISSIONS[PROGRAM_NAMES.X3]}{' '}
          <span className="notranslate">BNB</span> - use cryptoexchanges like Binance or local exchangers to buy crypto
          currency.
        </div>
      ),
    },
    {
      render: () => <div className="">Open dapp browser in your crypto wallet, in TokenPocket - tab "Discover".</div>,
    },
    {
      render: () => (
        <div className="flex flex-wrap ">
          <span className="inline-flex">Copy and paste your upline link in the wallet dapp browser: &nbsp;</span>
          <div className="text-white font-bold inline-flex">
            {reflink}
            <button
              onClick={() => {
                copy(reflink);
              }}
              className="ml-2.5"
            >
              <CopyIcon className="h-18px w-18px" />
            </button>
          </div>
        </div>
      ),
    },
    {
      bgStyle: 'bg-main-blue',
      render: () => (
        <div className="w-full flex justify-between sm:flex-col">
          <span>Click Registration to proceed to registration page.</span>
        </div>
      ),
    },
  ];

  const onRegisterClick = () => {
    sendEvent({ type: EVENT_NAMES.INVITE_PAGE_REGISTER });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        style={styleBgTop}
        className="absolute left-1/2 top-0 transform -translate-x-1/2 w-full h-720px sm:h-510px z-0"
      />
      <div className="max-w-desktop-invite w-full flex flex-col justify-center items-center space-y-10 z-10 sm:px-5 sm:space-y-5 sm:pt-0 sm:mt-0 pb-25 sm:pb-13 ">
        <div className="relative w-30 h-30 rounded-full sm:w-20 sm:h-20" style={stylesProps}>
          {!photo && <img className="max-w-full max-h-full" src={'/UnknownUser.png'} />}
          <StatusIcon status={statusBlocks?.status} className="absolute -bottom-1 -right-1" />
        </div>
        <span className="text-two-half text-white font-medium sm:text-2xl sm:text-center sm:max-w-220px">
          <span className="text-yellow notranslate">ID {id}</span>
          &nbsp; invites you to <span className="notranslate">Forsage BUSD</span>{' '}
        </span>
        <div className="w-full flex flex-col">
          <div
            className={`w-full flex justify-center space-x-10 w-full sm:flex-col sm:space-x-0 sm:space-y-5 ${
              (!email || !telegram) && 'mb-5'
            }`}
          >
            {telegram && (
              <div className="w-320px h-[60px] flex justify-between items-center px-5 py-3.5 sm:w-full">
                <span className="text-base text-white-500 sm:text-sm">Telegram</span>
                <span className="text-base text-white font-bold sm:text-sm">{telegram}</span>
              </div>
            )}
            {email && (
              <div className="w-320px h-[60px] flex justify-between items-center px-5 py-3.5 sm:w-full">
                <span className="text-base text-white-500 sm:text-sm">Email</span>
                <span className="text-base text-white font-bold sm:text-sm">{email}</span>
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-10 w-full sm:flex-col sm:space-x-0 sm:space-y-5">
            <div className="w-320px h-[60px]  flex justify-between items-center bg-gray rounded px-5 py-3.5 sm:w-full">
              <span className="text-base text-white-500 sm:text-sm">Team</span>
              <span className="text-2xl text-white font-bold sm:text-xl">{team}</span>
            </div>
            <div className="w-320px h-[60px]  flex justify-between items-center bg-gray rounded px-5 py-3.5 sm:w-full">
              <span className="text-base text-white-500 sm:text-sm">
                Rewards, <span className="notranslate">BUSD</span>
              </span>
              <span className="text-2xl text-white font-bold sm:text-xl">
                {(profit_x3 + profit_x4 + profit_xxx + profit_xgold).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <CustomLink href="/registration" className="sm:w-full">
          <Button type="primary" className="w-320px py-3.5 sm:w-full" onClick={onRegisterClick}>
            Register now
          </Button>
        </CustomLink>
      </div>

      <div className="bg-gray w-full flex items-center justify-center z-10 ">
        <div className="max-w-desktop-invite relative w-full flex flex-col justify-center items-center py-25 sm:py-13 sm:pt-7.5 sm:px-5">
          <div className="w-full flex justify-start items-center">
            <span className="text-two-half text-white font-medium mb-13 sm:text-xl sm:mb-7.5">
              How to register <br /> in <span className="notranslate">Forsage BUSD</span>{' '}
            </span>
          </div>
          <PumaIcon className="absolute -top-12 right-0 z-0 h-80 sm:h-24 sm:-top-3.5 sm:right-2.5" />
          <div className="z-10 flex flex-col space-y-5">
            {tutorial?.map((item, index) => (
              <div
                className={`flex items-center rounded ${
                  !!item?.bgStyle ? item?.bgStyle : 'bg-line-gray'
                } text-white py-7.5 px-10 pr-5 w-full sm:p-5 sm:text-sm sm:items-start sm:flex-col`}
              >
                <div className="flex flex-1 items-center sm:items-start">
                  <span
                    className={` ${
                      !!item?.bgStyle ? 'text-white' : 'text-main-blue'
                    } text-3xl font-bold mr-7.5 sm:text-xl sm:mr-5`}
                  >
                    {' '}
                    {index + 1}{' '}
                  </span>
                  {item.render()}
                </div>
                {index === 4 && (
                  <CustomLink href="/registration" className="sm:w-full">
                    <Button type="black" className="ml-2.5 sm:ml-0 sm:w-full sm:mt-7.5">
                      Register
                    </Button>
                  </CustomLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center relative sm:px-5 pt-25 sm:pt-7.5">
        <div
          style={styleBgCenter}
          className="absolute left-1/2 -top-1/2 transform -translate-x-1/2 w-full h-720px sm:h-510px z-0"
        />
        <div className="flex justify-center items-center mb-25 z-10 w-full sm:mb-10">
          <GoldBranchLeft />
          <span className="text-white text-3xl font-medium text-center mx-13 max-w-700px sm:max-w-180px sm:text-base sm:mx-2">
            Forsage is the largest networking community with more than 1.5 million members,who earned already more than
            2 billion USD.
          </span>
          <GoldBranchRight />
        </div>
        <span className="text-yellow text-two-half font-medium text-center mb-25 z-10 sm:text-2xl sm:mb-10">
          {' '}
          Join today to make your <br /> dreams come true!{' '}
        </span>
        <div className="flex w-full item-center justify-center relative">
          <iframe
            className="bg-black w-full h-450px max-w-760px sm:w-full sm:h-auto rounded z-10"
            src="https://www.youtube.com/embed/YAYAKIp5JeE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
};

BRHash.storeInitial = async ({ ctx }) => {
  try {
    const result = await RefUplineRepository.getRefInfo(ctx.query.hash);
    const cookiesDomain = !!config.stand ? (config.stand === 'prod' ? '.forsage.io' : '.forsage.tech') : 'localhost';
    const cookiesParams = {
      path: '/',
      sameSite: 'none',
      domain: cookiesDomain,
      secure: true,
      maxAge: 30 * 24 * 60 * 60,
    };

    setCookie(ctx, 'upline_binance', result.id, cookiesParams);

    if (result.tron_user_id) {
      setCookie(ctx, 'upline_tron', result.tron_user_id, cookiesParams);
    }

    if (result.ethereum_user_id) {
      setCookie(ctx, 'upline', result.ethereum_user_id, cookiesParams);
    }

    return {
      ...result,
    };
  } catch (e) {}

  return {};
};

BRHash.Layout = InviteLayout;

export default BRHash;
