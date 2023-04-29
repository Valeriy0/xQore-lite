import React, { useEffect, useState } from "react";
import { useGetContract } from '@/helpers/hooks/useGetContract';
import { useWeb3React } from '@web3-react/core'
import { toWei } from '@/helpers/numbers';
import { BigNumber } from '@ethersproject/bignumber';
import { increaseByPercent } from '@/helpers/numbers';

export const LevelCard = ({ idx, activateBefore ,valueLvl, level, wallet, setTotalBnbForUpg, setTotalBnbForRefound, setIsActiveCount, setIsNotActiveCount }) => {
  const [isActiveLvl, setIsActiveLvl] = useState(false);
  const { getContract } = useGetContract();
  const { account } = useWeb3React();

  const isUsersLvls = async () => {
    try {
      // registration BNB
      const contract = await getContract('xQore');
      const isAlreadyBoughtLevel = await contract.usersActiveX6Levels(wallet, level);
      console.log(valueLvl, level, wallet, isAlreadyBoughtLevel)
      if (isAlreadyBoughtLevel) {
        setIsActiveLvl(isAlreadyBoughtLevel);
        setIsActiveCount((prev) => prev + 1);
        setTotalBnbForRefound((prev) => prev + valueLvl)
      } else {
        setIsActiveLvl(false);
        setIsNotActiveCount((prev) => prev + 1);
        setTotalBnbForUpg((prev) => prev + valueLvl)
      }
      

    } catch (e) {
      console.log(e);
      setIsActiveLvl(false);
    }
  }

  useEffect(() => {
    if(account) {
      isUsersLvls();
    }
  }, [account])

  const clickReg = async () => {
    try {
      // registration BNB
      const contract = await getContract('xQore');
      console.log(contract);

      let gas = null;
      try {
        gas = await contract.estimateGas.registrationExt({
          value: toWei(price),
        });
      } catch (e) {
        //
      }

      return await contract.registrationExt({
        value: toWei(price),
        gasLimit: parseInt(gas) ? increaseByPercent(gas) : BigNumber.from(2000000),
      });
    } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
  }

  const clickUpgrade = async () => {
    try {
      const contract = await getContract('xQore');

      const price = (valueLvl - 0.003).toFixed(3);

      return await contract.buyNewLevelFor(wallet, level, {
        value: toWei(price),
        gasLimit: BigNumber.from(2000000),
      });
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  if (!isActiveLvl) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex w-full space-x-4 justify-center">
          <span>{idx}</span>
          <span> | &nbsp;</span>
          <span>{wallet},</span>
          <span> | </span>
          <span>{valueLvl}</span>
          {/* <span> | </span>
          <span>level - {level}</span> */}
        </div>
        <div className="flex space-x-2.5 w-full justify-center">
          {/* <span className={isActiveLvl ? 'text-green' : 'text-red'}> {isActiveLvl ? 'upgraded' : 'NOT upgraded'}</span>
          <span>{activateBefore}</span>
          {!isActiveLvl && <button onClick={clickUpgrade}> + upgrade +</button>} */}
        </div>
      </div>
    )
  } 
  return null;
}