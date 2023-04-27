import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Button, CustomLink } from 'components';
import { StatusIconBlack } from 'assets/forsage/roundedLogoBasic.svg';
import { getAuthUser } from 'store/userSlice/selectors';
import { useSelector } from 'react-redux';
import TrioPeopleIcon from 'assets/icons/trio_people.svg';
import ChainUsualIcon from 'assets/icons/chain_usual.svg';
import MedalIcon from 'assets/icons/medal.svg';
import BooksIcon from 'assets/icons/books.svg';
import CircleLikeAtomicIcon from 'assets/icons/circle_like_atomic.svg';
import GiftCrossedIcon from 'assets/icons/gift_crossed.svg';
import { LeaderCard } from './LeaderCard';
import LockIcon from 'assets/icons/lock.svg';
import CopyIcon from 'assets/icons/copy_white.svg';
import { copy } from 'helpers/text';
import { findLastIndex } from 'ramda';

const LEADERS_CARDS = [
  {
    type: 'basic',
    min: 0,
  },
  {
    type: 'bronze',
    min: 3,
  },
  {
    type: 'silver',
    min: 25,
  },
  {
    type: 'gold',
    min: 50,
  },
];

export const StatusModal = ({ openedModal, onClose, partners }) => {
  const [isOpenedSecretFeature, setIsOpenedSecretFeature] = useState(false);
  const authProfile = useSelector(getAuthUser);
  const wrapperScrolledRef = useRef(null);
  const tm = useRef(null);
  const isAllowLeaderChat = partners >= LEADERS_CARDS[1]?.min;

  const backgroundBar = useMemo(() => {
    if (partners >= 3 && partners < 25)
      return 'linear-gradient(63.54deg, #BB3B13 16.62%, #CF6E38 48.82%, #F8CFC9 83.38%)';
    if (partners >= 25 && partners < 50)
      return 'linear-gradient(63.46deg, #A9AAAE 33.31%, #C8CACA 65.48%, #F6F9FC 100%)';
    if (partners >= 50) return 'linear-gradient(63.45deg, #A67D01 33.32%, #CFAB38 65.48%, #F8F0C9 100%)';
    return '#ffffff';
  }, [partners]);

  const percent = Math.min(Math.abs((partners / 50) * 100), 100);
  const barStyle = { width: `${percent}%`, background: `${backgroundBar}` };

  useEffect(() => {
    tm.current && clearTimeout(tm.current);

    tm.current = setTimeout(() => {
      if (wrapperScrolledRef.current) {
        const index = findLastIndex(({ min }) => min <= partners)(LEADERS_CARDS);

        wrapperScrolledRef.current.children[index + 1].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }, 0);

    return () => {
      tm.current && clearTimeout(tm.current);
    };
  }, []);

  const renderBodyAndHeader = useMemo(() => {
    if (isOpenedSecretFeature) {
      return (
        <div className="flex h-full overflow-y-auto flex-col items-center">
          <div className="flex flex-col justify-start w-full ">
            <div className="flex sm:!pt-16 mb-6 pl-10 pt-10 sm:px-4.5">
              <div className="flex flex-col relative z-[20]">
                <span className="text-white text-3xl font-semibold sm:text-2xl">
                  WOW, you’ve unlocked a secret feature
                </span>
                <span className="text-3xl text-white-500 font-semibold leading-[36px] sm:text-2xl">
                  Now you are a Priority Leader
                </span>
                <span className="text-base text-white-500 leading-[19px] mt-7.5 sm:mt-2.5">
                  Become a part of a tight circle of Priority Leaders and make the most out of your journey with
                  Forsage.
                </span>
              </div>
              <div className="flex w-[220px] h-full relative flex-shrink-0 sm:hidden" />
              <img
                src="/gold_puma.png"
                className="absolute flex-shrink-0 w-[314px] h-[210px] top-14 -right-10 sm:hidden"
              />
            </div>
          </div>
          <div className="flex pb-4 sm:px-4.5 overflow-hidden w-full">
            <div className="flex rounded px-10 w-full overflow-x-scroll sm:rounded-none mb-[-50px] pb-[50px]">
              <div className="flex h-[350px] bg-black-verylight backdrop-blur-md sm:bg-transparent w-auto  rounded sm:rounded-none py-10 px-8 w-full sm:py-0 sm:px-0 drop-shadow-md sm:drop-shadow-none">
                <div className="flex flex-col h-full justify-between sm:bg-black-verylight sm:rounded sm:px-7 sm:py-10 sm:drop-shadow-md">
                  <div className="flex flex-col w-[170px] flex-shrink-0 items-center justify-center">
                    <TrioPeopleIcon />
                    <span className="text-white-500 text-center text-base leading-[19px] mt-4">
                      Learn from other leaders who share their tools and hacks
                    </span>
                  </div>
                  <div className="flex flex-col w-[170px] flex-shrink-0 items-center justify-center">
                    <ChainUsualIcon />
                    <span className="text-white-500 text-center text-base leading-[19px] mt-4">
                      Join our weekly AMA sessions with Forsage co-creators and stars
                    </span>
                  </div>
                </div>
                <div className="mx-6 h-full bg-white w-[1px] sm:mx-3 sm:w-0" />
                <div className="flex flex-col h-full justify-between sm:bg-black-verylight sm:rounded sm:px-7 sm:py-10 sm:drop-shadow-md">
                  <div className="flex flex-col w-[170px] flex-shrink-0 items-center justify-center">
                    <MedalIcon />
                    <span className="text-white-500 text-center text-base leading-[19px] mt-4">
                      Become an ambassador with regular reward
                    </span>
                  </div>
                  <div className="flex flex-col w-[170px] flex-shrink-0 items-center justify-center">
                    <BooksIcon />
                    <span className="text-white-500 text-center text-base leading-[19px] mt-4">
                      Enjoy daily activities and training sessions
                    </span>
                  </div>
                </div>
                <div className="mx-6 h-full bg-white w-[1px] sm:mx-3 sm:w-0" />
                <div className="flex flex-col h-full justify-between sm:bg-black-verylight sm:rounded sm:px-7 sm:py-10 sm:drop-shadow-md">
                  <div className="flex flex-col w-[170px] flex-shrink-0 items-center justify-center">
                    <CircleLikeAtomicIcon />
                    <span className="text-white-500 text-center text-base leading-[19px] mt-4">
                      Get one-to-one support and a breakdown of the current state of your team
                    </span>
                  </div>
                  <div className="flex flex-col w-[170px] flex-shrink-0 items-center justify-center">
                    <GiftCrossedIcon />
                    <span className="text-white-500 text-center text-base leading-[19px] mt-4">
                      Unlock early access to new products in the Forsage ecosystem
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full overflow-y-auto flex-col items-center">
        <div className="flex flex-col justify-start w-full ">
          <div className="flex flex-col  sm:!pt-16 mb-6 px-10 pt-10 sm:px-4.5">
            <span className="text-white text-3xl font-medium sm:text-2xl">Status</span>
            <span className="text-base text-white-500 leading-[19px] mt-7.5 sm:mt-2.5">
              Join the Priority Leaders Community to learn from experienced leaders, participate in AMA-sessions, get
              early access to new features, and more.
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col w-1/2 sm:w-3/4">
              <div className="h-5 relative w-full mb-5">
                <StatusIconBlack className="absolute -left-1 w-5 h-5" />
                <img src="/statuses/bronze.png" className="absolute left-5 w-5 h-5" alt="" />
                <img src="/statuses/silver.png" className="absolute inset-x-1/2 w-5 h-5" alt="" />
                <img src="/statuses/gold.png" className="absolute -right-1 w-5 h-5" alt="" />
              </div>
              <div className="h-3 relative max-w-xl rounded-full mb-2.5">
                <div className="w-full h-full bg-white-500 absolute rounded-full" />
                <div
                  className="transition-all ease-out duration-1000 h-full bg-green relative rounded-full"
                  style={barStyle}
                >
                  <div className="absolute -right-0.5 -top-0.5 rounded-full w-4 h-4 bg-white z-10" />
                  <span className="z-10 absolute -right-3 -bottom-10 sm:-bottom-7.5 sm:-right-1.5 text-white text-xl bg-black-light flex justify-center items-center w-8 h-8 font-medium sm:w-5 sm:h-5 sm:text-base">
                    {partners}
                  </span>
                </div>
              </div>
              <div className="h-4 relative w-full text-white-500 text-base sm:text-sm">
                <span className="absolute left-0">0</span>
                <span className="absolute left-6">3</span>
                <span className="absolute inset-x-1/2">25</span>
                <span className="absolute right-0">50</span>
                <span className="" />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={wrapperScrolledRef}
          className="w-full flex-shrink-0 flex overflow-x-auto py-6 px-7.5 sm:px-4.5 scroll-hidden"
        >
          <div className="flex w-[216px] flex-shrink-0 sm:w-[60px]" />
          {LEADERS_CARDS.map((leaderCard) => (
            <div className="flex px-7.5 sm:px-4.5 sm:first:pl-0 sm:last:pr-0" key={leaderCard.type}>
              <LeaderCard type={leaderCard.type} isActive={partners >= leaderCard.min} />
            </div>
          ))}
          <div className="flex w-[196px] flex-shrink-0 sm:w-[36px]" />
        </div>
      </div>
    );
  }, [barStyle, isOpenedSecretFeature]);

  const renderActionButton = useMemo(() => {
    if (!isOpenedSecretFeature) {
      return (
        <Button
          onClick={() => setIsOpenedSecretFeature(true)}
          className="py-[16px] sm:py-[22px] px-[28px] min-w-[400px] sm:min-w-full font-semibold !text-base sm:w-full"
          type="gradient-purp-orange"
        >
          Get to know other Priority Leaders
        </Button>
      );
    } else {
      if (isAllowLeaderChat) {
        return (
          <CustomLink
            targetBlank
            href={authProfile.pro_leaders_club_invite_link || ''}
            className="flex justify-center sm:w-full"
          >
            <Button
              className="uppercase py-[16px] px-[28px] min-w-[400px] sm:min-w-full sm:py-[22px] font-semibold !text-base sm:w-full"
              type="gradient-purp-orange"
            >
              Join the community
            </Button>
          </CustomLink>
        );
      }

      return (
        <Button
          type="light-white"
          className="!bg-black-verylight font-semibold text-white-500 py-[16px] px-[28px] min-w-[636px] drop-shadow-md sm:min-w-full sm:w-full"
          disabled
        >
          <LockIcon className="h-[30px] sm:h-[24px] fill-current text-white-500 mr-3.5 sm:mr-2.5" />
          <span className="sm:hidden">To unlock the feature, invite at least 3 partners</span>
          <span className="hidden sm:inline">To unlock the feature</span>
        </Button>
      );
    }
  }, [isOpenedSecretFeature, isAllowLeaderChat]);

  const isShowLink = Boolean(authProfile?.pro_leaders_club_invite_link) && isAllowLeaderChat && isOpenedSecretFeature;

  return (
    <Modal className="!max-w-[760px]" isOpened={openedModal} onClose={onClose}>
      <div className="flex justify-between flex-col justify-start w-full rounded-2xl bg-black-light  sm:rounded-none overflow-auto">
        {renderBodyAndHeader}
        <div className="relative flex justify-center my-5 sm:w-full sm:px-5">
          {isShowLink && (
            <div className="absolute -top-8 sm:-top-10 text-white flex items-center justify-center space-x-2.5">
              <span>{authProfile.pro_leaders_club_invite_link}</span>
              <Button type="transparent" onClick={() => copy(authProfile.pro_leaders_club_invite_link)}>
                <CopyIcon className="w-5 h-5" />
              </Button>
            </div>
          )}
          {renderActionButton}
        </div>
      </div>
    </Modal>
  );
};
