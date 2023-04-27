import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import { useWeb3React } from '@web3-react/core'
import { ActivateModal } from '@/components/ActivateModal';
import { useGetContract } from '@/helpers/hooks/useGetContract';
import config from '@/helpers/config';
import { LevelCard } from '@/components/levelCard';

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
  return (
    <div className="min-h-screen overflow-auto w-screen flex flex-col items-center justify-center">
        
        <span className='text-white sm:hidden'>wallet - {account}</span>
        <span className='sm:hidden'>xQore - {config?.contractXqore}</span>
        {!account && (
          <button onClick={() => setOpenedModal(true)} className='bg-white p-10 text-black'>
            Connect wallet
          </button>
        )}
      {account && (
           <div className="w-full h-screen bg-[#18191A] flex items-center justify-center sm:h-full sm:p-2 ">
           <div className="flex flex-wrap w-[950px] w-full items-center justify-center ">
             {Lvls.map((item, itemIndex) => (
              <LevelCard price={item} level={itemIndex + 1} /> 
             ))}
             </div>    
   
         </div>
   
      )}
      <ActivateModal handleCloseModal={() => setOpenedModal(false)} openedModal={openedModal} />
    </div>
  )
}
export default Index;