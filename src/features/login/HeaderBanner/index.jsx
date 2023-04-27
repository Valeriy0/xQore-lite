import React, { useEffect, useRef, useState } from 'react';
import { Profile } from './Profile';
import { useWeb3React } from '@web3-react/core';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'store/userSlice/asyncActions';
import { getCurrentUserProfile } from 'store/userSlice/selectors';
import { ContractNames } from 'helpers/constants';

export const HeaderBanner = () => {
  const [userContractId, setUserContractId] = useState(false);
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { getContract } = useGetContract();
  const userIntervalTm = useRef(null);
  const currentUser = useSelector(getCurrentUserProfile);

  const callIntervalUser = () => {
    userIntervalTm.current && clearInterval(userIntervalTm.current);

    account && dispatch(getProfile(account));

    userIntervalTm.current = setInterval(() => {
      account && dispatch(getProfile(account));
    }, 3000);
  };

  useEffect(() => {
    currentUser?.id && userIntervalTm.current && clearInterval(userIntervalTm.current);
  });

  useEffect(async () => {
    if (account && !currentUser?.id) {
      const contract = await getContract(ContractNames.BASE);
      const result = await contract.users(account);

      setUserContractId(result?.id && parseInt(result.id) ? parseInt(result.id) : null);

      if (result?.id && parseInt(result?.id)) {
        callIntervalUser();
      }
    } else {
      setUserContractId(null);
      currentUser?.id && userIntervalTm.current && clearInterval(userIntervalTm.current);
    }

    return () => {
      userIntervalTm.current && clearInterval(userIntervalTm.current);
    };
  }, [currentUser?.id, account]);

  return (
    <>
      <Profile userContractId={userContractId} />
    </>
  );
};
