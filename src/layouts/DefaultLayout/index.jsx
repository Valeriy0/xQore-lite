import React, { useEffect, useState, useRef } from 'react';
import { Footer, Header, LeftBar } from 'components';
import { useRouter } from 'next/router';
import { PreviewHeader, SupportWidget } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from 'store/userSlice/selectors';
import { useWeb3React } from '@web3-react/core';
import { clearAuthUser } from 'store/userSlice';
import { destroyCookie } from 'nookies';
import { getNotifications } from 'store/userSlice/asyncActions';
import { getIsLoadingRouter } from 'store/routerSlice/selectors';
import PuffLoadingIcon from 'assets/animations/puff.svg';
import { setPreviewAccount } from 'store/userSlice';
import { useRequest } from 'helpers/hooks/useRequest';
import { UserRepository } from 'connectors/repositories/user';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { getPreviewAccount } from 'store/userSlice/selectors';
import { addHours, isAfter, isBefore, parseISO } from 'date-fns';
import { XQORE_DATE_START } from 'helpers/constants';

function omit(obj, ...keys) {
  const keysToRemove = new Set(keys.flat());

  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keysToRemove.has(k)));
}

export const DefaultLayout = ({ children }) => {
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { query, push, pathname } = useRouter();
  const isNormalMode = !query.user;
  const [clickedSearch, setClickedSearch] = useState(false);
  const authStore = useSelector(getAuthUser);
  const isLoadingRouter = useSelector(getIsLoadingRouter);
  const intervalNotifications = useRef(null);
  const { call } = useRequest(UserRepository.search);
  const currentUser = useSelector(getCurrentUserProfile);
  const previewAccount = useSelector(getPreviewAccount);
  const chat_id = !!authStore?.id ? authStore?.id : currentUser?.id;
  const chat_wallet = account;

  const onClosedPreview = () => {
    if (authStore?.id) {
      push({
        pathname,
        query: { ...omit(query, ['cycle', 'user']) },
      });
    } else {
      push('/');
    }
    setClickedSearch(false);
  };

  const callUserPreview = async () => {
    if (query?.user) {
      const trimmedInputValue = query?.user?.trim();
      const isAddress = trimmedInputValue.match(/^0x[a-f0-9]{40}$/i);
      const isUserId = trimmedInputValue.match(/^[0-9]+$/);
      if (
        (isUserId && previewAccount?.id !== trimmedInputValue) ||
        (isAddress && previewAccount?.adress !== trimmedInputValue)
      ) {
        if (isAddress || isUserId) {
          const column = isAddress ? 'address' : 'id';

          try {
            const user = await call([{ column, value: trimmedInputValue }]);

            dispatch(setPreviewAccount(user));
          } catch (e) {}
        } else {
        }
      }
    }
  };

  useEffect(() => {
    callUserPreview();
  }, [query?.user]);

  useEffect(() => {
    if (account && authStore?.address && authStore?.address?.toLowerCase() !== account?.toLowerCase()) {
      destroyCookie(null, 'apiToken');
      dispatch(clearAuthUser());

      if (isNormalMode) {
        //call notification here;
        push('/');
      }
    }
  }, [account]);

  useEffect(() => {
    if (
      authStore?.id &&
      isNormalMode &&
      !(
        isAfter(new Date(), addHours(parseISO(XQORE_DATE_START), -1)) &&
        isBefore(new Date(), addHours(parseISO(XQORE_DATE_START), 1))
      )
    ) {
      account && dispatch(getNotifications(account));

      intervalNotifications.current = setInterval(() => {
        account && dispatch(getNotifications(account));
      }, 300000);
    } else {
      intervalNotifications.current && clearInterval(intervalNotifications.current);
    }

    return () => {
      intervalNotifications.current && clearInterval(intervalNotifications.current);
    };
  }, [account, authStore?.id, isNormalMode]);

  useEffect(() => {
    if (!query.user && !clickedSearch) return;

    setClickedSearch(!query.user);
  }, [query.user]);

  return (
    <div className="relative flex bg-main-bg items-center justify-center min-h-screen min-w-full overflow-hidden">
      {isNormalMode && !clickedSearch ? (
        <Header withBurger withMagnifier withRing withExit loginWidth onClickSearch={() => setClickedSearch(true)} />
      ) : (
        <PreviewHeader searchIsClicked={clickedSearch} onClosedPreview={onClosedPreview} />
      )}
      <div className="flex w-full h-full justify-center max-w-desktop-full">
        <div className="relative w-full max-w-desktop-left-bar flex-shrink-0 border-r border-white-100 lg:hidden">
          <div className={`fixed top-0 max-w-desktop-left-bar w-full flex h-screen z-10 ${!isNormalMode && 'pt-4'}`}>
            <LeftBar />
          </div>
        </div>
        <div
          className={`flex flex-shrink w-full flex-col items-center min-h-screen bg-main max-w-[calc(100% - 326px)] lg:max-w-full overflow-auto ${
            isNormalMode ? 'pt-16' : 'pt-20 sm:pt-14'
          }`}
        >
          <div className={`flex relative flex-1 py-10 pt-8.5 flex-col justify-between w-full px-10 sm:px-0 sm:pt-7.5`}>
            {isLoadingRouter && (
              <div className="flex absolute justify-center w-full h-full bg-gray opacity-75 z-999999 top-0 bottom-0 left-0 right-0">
                <div className="flex items-center justify-center w-screen h-screen">
                  <PuffLoadingIcon className="!w-80px h-80px" />
                </div>
              </div>
            )}
            {children}
            <Footer className="pb-0 lg:pb-0 z-10" />
          </div>
        </div>
      </div>
      <SupportWidget user_id={chat_id} wallet={chat_wallet} isAuth={isNormalMode} />
    </div>
  );
};
