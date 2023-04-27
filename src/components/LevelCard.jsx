import React, { useEffect, useState } from "react";
import { useGetContract } from '@/helpers/hooks/useGetContract';
import { useWeb3React } from '@web3-react/core'
import { toWei } from '@/helpers/numbers';
import { BigNumber } from '@ethersproject/bignumber';
import { increaseByPercent } from '@/helpers/numbers';

export const LevelCard = ({ price, level = 1, }) => {
  const [isActiveLvl, setIsActiveLvl] = useState(false);
  const { getContract } = useGetContract();
  const { account } = useWeb3React();

  console.log(isActiveLvl);

  const isUsersLvls = async () => {
    try {
      // registration BNB
      const contract = await getContract('xQore');
      const isAlreadyBoughtLevel = await contract.usersActiveX6Levels(account, level);
      setIsActiveLvl(isAlreadyBoughtLevel);

    } catch (e) {
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

  const clickUpgrade = async (level) => {
    try {
      const routeContract = await getContract('router');
      const value = toWei((price + 0.003).toFixed(3));

      let gas = null;
      try {
        gas = await contract.estimateGas.xQoreUpgrades([level], {
          value,
        });
      } catch (e) {
        //
      }
      return await routeContract.xQoreUpgrades([level], {
        value,
        gasLimit: parseInt(gas) ? increaseByPercent(gas) : BigNumber.from(2000000),
      });;
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  return (
    <button className={`w-[180px] sm:w-[160px] sm:h-[95px] h-[170px] ${isActiveLvl ? 'bg-[#21B914]' : 'bg-[#4A69F6]'} rounded-[20px] m-2 flex flex-col items-center justify-between p-2 border border-3 border-[#3A3A3B] `}>
    <div className="flex flex-row justify-between w-full p-1">
      <span className="text-xl font-bold">{level} <span className="text-sm font-medium">lvl</span></span>
      <span className="text-xl font-bold">{price}<span className="text-sm font-medium">bnb</span></span>
    </div>
    <button onClick={isActiveLvl ? () => console.log('activated') : level === 1 ? () => clickReg() : () => clickUpgrade(level)} className="bg-[#DBE4EB] rounded-[15px] px-5 text-white w-full h-[40px] font-normal  ">
      <span className="text-black font-semibold sm:text-sm">{isActiveLvl ? '✔️ Activated' : level === 1 ? 'Activate' : 'Upgrade'}</span>
    </button>
  </button>
  )
}