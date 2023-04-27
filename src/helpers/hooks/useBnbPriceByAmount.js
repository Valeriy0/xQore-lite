import { useGetContract } from 'helpers/hooks/useGetContract';
import { useState } from 'react';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';

export const useBnbPriceByAmount = () => {
  const [bnbPriceByAmountIsLoading, setBnbPriceByAmountIsLoading] = useState(false);
  const { getContract } = useGetContract();
  const [bnbPrice, setBnbPrice] = useState(null);
  const [bnbPriceBase, setBnbPriceBase] = useState(null);

  const getBnbPriceByAmount = async (amount, bumpPercent = 5, baseAmount = null) => {
    if (!bnbPriceByAmountIsLoading) {
      setBnbPrice(null);
      setBnbPriceByAmountIsLoading(true);
      try {
        const contractPancake = await getContract('pancake');

        const [reserve0, reserve1] = await contractPancake.getReserves();
        const bnbCurrency = reserve1 / reserve0;

        const total = parseFloat(amount / bnbCurrency);

        const totalRegistryPrice = (total + (total / 100) * bumpPercent).toFixed(3);

        if (baseAmount) {
          const baseTotal = parseFloat(baseAmount / bnbCurrency);
          const baseTotalPrice = (baseTotal + (baseTotal / 100) * bumpPercent).toFixed(3);

          setBnbPriceBase(baseTotalPrice);
        }

        setBnbPrice(totalRegistryPrice);

        return totalRegistryPrice;
      } catch (e) {
        callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
      } finally {
        setBnbPriceByAmountIsLoading(false);
      }
    }
  };

  return {
    bnbPrice,
    bnbPriceBase,
    bnbPriceByAmountIsLoading,
    getBnbPriceByAmount,
  };
};
