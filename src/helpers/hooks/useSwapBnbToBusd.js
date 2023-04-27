import { useState } from 'react';
import { CONTRACT_NAMES, DEFAULT_GAS_LIMIT } from 'helpers/constants';
import { addMinutes, getUnixTime } from 'date-fns';
import { callNotification } from 'helpers/notification';
import { toast } from 'react-toastify';
import { useGetContract } from 'helpers/hooks/useGetContract';
import { useWeb3React } from '@web3-react/core';
import { useBalance } from 'helpers/hooks/useBalance';
import { increaseByPercent, toWei } from 'helpers/numbers';

export const useSwapBnbToBusd = () => {
  const { account } = useWeb3React();
  const { getContract } = useGetContract();
  const { fetchBalance } = useBalance();

  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const onSwapBnbToBusd = async (amount) => {
    if (!isLoading) {
      setIsLoading(true);

      try {
        const swapContractPancake = await getContract(CONTRACT_NAMES.PANCAKE_EXCHANGE);
        const contractPancake = await getContract(CONTRACT_NAMES.PANCAKE);
        const [reserve0, reserve1] = await contractPancake.getReserves();
        const bnbCurrency = reserve1 / reserve0;

        const totalRegistryPrice = (parseFloat(amount / bnbCurrency) * 1.05).toFixed(3);

        const estimateGas = await swapContractPancake.estimateGas.swapETHForExactTokens(
          toWei(amount),
          ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7cea3dedca5984780bafc599bd69add087d56'],
          account,
          getUnixTime(addMinutes(new Date(), 10)),
          {
            value: toWei(totalRegistryPrice),
          },
        );

        const { wait } = await swapContractPancake.swapETHForExactTokens(
          toWei(amount),
          ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7cea3dedca5984780bafc599bd69add087d56'],
          account,
          getUnixTime(addMinutes(new Date(), 10)),
          {
            value: toWei(totalRegistryPrice),
            gasLimit: parseInt(estimateGas) ? increaseByPercent(estimateGas) : DEFAULT_GAS_LIMIT,
          },
        );

        const swapBusdNotifLoading = callNotification({
          type: 'info',
          message: `Swap to ${amount} BUSD in progress. Please wait`,
          autoClose: 30000,
        });

        setIsWaiting(true);
        const waitInfo = await wait();

        toast.dismiss(swapBusdNotifLoading);

        if (waitInfo.status === 0) {
          callNotification({
            type: 'error',
            message: 'Transaction failed. Try again',
          });
        } else {
          callNotification({
            type: 'success',
            message: `Swap to ${amount} BUSD successful ✅`,
          });
        }

        await fetchBalance();

        setTimeout(() => {
          setIsWaiting(false);
          setIsLoading(false);

          fetchBalance();
        }, 10000);
      } catch (e) {
        setIsLoading(false);
        setIsWaiting(false);
        callNotification({ type: 'error', message: e?.data?.message || e?.message });
      }
    }
  };

  return {
    onSwapBnbToBusd,
    isWaitingSwap: isWaiting,
    isLoadingSwap: isLoading,
    isLoadingAnySwap: isLoading || isWaiting,
  };
};
