import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import { useWeb3React } from '@web3-react/core'
import { ActivateModal } from '@/components/ActivateModal';
import { useGetContract } from '@/helpers/hooks/useGetContract';
import config from '@/helpers/config';
import { LevelCard } from '@/components/LevelCard';
import { wallets } from '@/helpers/allWallets';

const inter = Inter({ subsets: ['latin'] })

const Index = () => {
  const { getContract } = useGetContract();
  const [openedModal, setOpenedModal] = useState(false);
  const { account } = useWeb3React();
  const [isActiveCount, setIsActiveCount] = useState(0);
  const [isNotActiveCount, setIsNotActiveCount] = useState(0);

  const [totalBnbForUpg, setTotalBnbForUpg] = useState(0);
  const [totalBnbForRefound, setTotalBnbForRefound] = useState(0);


  // useEffect(() => {
  //   window.location.href = 'https://busd.forsage.io/';
  // }, [])

  const Lvls = [
    0.021,
    0.027,
    0.036,
    0.049,
    0.065,
    0.091,
    0.128,
    0.178,
    0.248,
    0.348,
    0.458,
    0.647,
  ]

  console.log(wallets)

  let fundDouble = [];

  return (
    <div className="w-screen flex flex-col items-center justify-center">
        
        <span className='text-white sm:hidden'>wallet - {account}</span>
        <span className='sm:hidden'>xQore - {config?.contractXqore}</span>
        <div className="flex flex-col items-center">
          <span className='text-green'> all activated - {isActiveCount}</span>
          <span className='text-red'> all NOT activated - {isNotActiveCount}</span>
          <span className='text-green'> bnb back - {totalBnbForRefound}</span>
          <span className='text-red'> bnb for upgrade - {totalBnbForUpg}</span>
        </div>
        {!account && (
          <button onClick={() => setOpenedModal(true)} className='bg-white p-10 text-black'>
            Connect wallet
          </button>
        )}
      {account && (
           <div className="w-full flex items-center justify-center sm:h-full sm:p-2 ">
           <div className="flex flex-col w-[950px] w-full items-center justify-center ">
            <div className="h-[5px] w-full bg-white-200 my-2.5"></div>
             {wallets.map((item, itemIndex) => {
              const l = Lvls.indexOf(item.value)
              if (itemIndex > 138) {
                return (
                  <>
                    <LevelCard idx={itemIndex+5} activateBefore={item?.activateBefore} totalBnbForUpg={totalBnbForUpg} totalBnbForRefound={totalBnbForRefound} setTotalBnbForRefound={setTotalBnbForRefound} setTotalBnbForUpg={setTotalBnbForUpg} isActiveCount={isActiveCount} isNotActiveCount={isNotActiveCount} setIsActiveCount={setIsActiveCount} setIsNotActiveCount={setIsNotActiveCount} valueLvl={item.value} level={l+1} wallet={item?.wallet} /> 
                    {/* <div className="h-[5px] w-full bg-white-200 my-2.5"></div> */}
                  </>
                )
              } 
              return null;
              })}
             </div>    
   
         </div>
   
      )}
      <ActivateModal handleCloseModal={() => setOpenedModal(false)} openedModal={openedModal} />
    </div>
  )
}
export default Index;