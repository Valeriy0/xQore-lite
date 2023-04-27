import React, { useState } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useWeb3React } from '@web3-react/core'
import { ActivateModal } from '@/components/ActivateModal';
import { useGetContract } from '@/helpers/hooks/useGetContract';
import { toWei } from '@/helpers/numbers';
import { BigNumber } from '@ethersproject/bignumber';
import { increaseByPercent } from '@/helpers/numbers';
import config from '@/helpers/config';

const inter = Inter({ subsets: ['latin'] })

const Index = () => {
  const { getContract } = useGetContract();
  const [openedModal, setOpenedModal] = useState(false);
  const { account } = useWeb3React();

  const Lvls = [
    0.018,
    0.024,
    0.033,
    0.046,
    0.062,
    0.088,
    0.125,
    0.175,
    0.245,
    0.345,
    0.455,
    0.644,
  ]


  const clickReg = async () => {
    try {
      // registration BNB
      const contract = await getContract('xQore');

      let gas = null;
      try {
        gas = await contract.estimateGas.registrationExt({
          value: toWei(Lvls[0]),
        });
      } catch (e) {
        //
      }

      return await contract.registrationExt({
        value: toWei(Lvls[0]),
        gasLimit: parseInt(gas) ? increaseByPercent(gas) : BigNumber.from(2000000),
      });
    } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
  }

  const clickUpgrade = async (level) => {
    try {
      // registration BNB
      const contract = await getContract('xQore');

      console.log(contract);

      let gas = null;
      try {
        gas = await contract.estimateGas.buyNewLevel([level + 1], {
          value: toWei(Lvls[level]),
        });
      } catch (e) {
        //
      }

      return await contract.buyNewLevel([level + 1], {
        value: toWei(Lvls[level]),
        gasLimit: parseInt(gas) ? increaseByPercent(gas) : BigNumber.from(2000000),
      });
    } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
        <span className='text-white'>wallet - {account}</span>
        <span>xQore - {config?.contractXqore}</span>
        {!account && (
          <button onClick={() => setOpenedModal(true)} className='bg-white p-10 text-black'>
            Connect wallet
          </button>
        )}
      {account && (
           <div className="w-full h-screen bg-[#18191A] flex items-center justify-center sm:h-full sm:p-2 ">
           <div className="flex flex-wrap w-[950px] w-full items-center justify-center ">
             {Lvls.map((item, itemIndex) => (
               <button className="w-[180px] sm:w-[160px] sm:h-[95px] h-[170px] bg-[#4A69F6] rounded-[20px] m-2 flex flex-col items-center justify-between p-2 border border-3 border-[#3A3A3B] ">
                 <div className="flex flex-row justify-between w-full p-1">
                   <span className="text-xl font-bold">{itemIndex + 1} <span className="text-sm font-medium">lvl</span></span>
                   <span className="text-xl font-bold">{item}<span className="text-sm font-medium">bnb</span></span>
                 </div>
                 <button onClick={itemIndex === 0 ? () => clickReg() : () => clickUpgrade(itemIndex)} className="bg-[#3A3A3B] rounded-[15px] px-5 text-white w-full h-[40px] font-normal  ">
                   <span className="font-semibold sm:text-sm">{itemIndex === 0 ? 'Activate' : 'Upgrade'}</span>
                 </button>
               </button>
             ))}
             </div>    
   
         </div>
   
      )}
      <ActivateModal handleCloseModal={() => setOpenedModal(false)} openedModal={openedModal} />
    </div>
  )
}
export default Index;