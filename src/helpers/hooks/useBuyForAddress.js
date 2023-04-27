import { useState } from 'react';

import { useGetContract } from 'helpers/hooks/useGetContract';
import { increaseByPercent, toWei } from 'helpers/numbers';
import { DEFAULT_GAS_LIMIT, nameToType, PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';

export const useBuyForAddress = () => {
  const [isLoadingBuyForAddress, setIsLoadingBuyForAddress] = useState(false);

  const { getContract } = useGetContract();

  const onBuyForAddress = async (level, address, matrix = PROGRAM_NAMES.XQORE) => {
    const contract = await getContract(nameToType[matrix]);
    if (!isLoadingBuyForAddress) {
      setIsLoadingBuyForAddress(true);
      try {
        if (matrix === PROGRAM_NAMES.XQORE) {
          const price = PROGRAM_PRICES[matrix][level].toFixed(5);

          const gas = await contract.estimateGas.buyNewLevelFor(address, level, {
            value: toWei(String(price)),
          });

          return await contract.buyNewLevelFor(address, level, {
            value: toWei(String(price)),
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        }
      } catch (e) {
        return Promise.reject(e);
      } finally {
        setIsLoadingBuyForAddress(false);
      }
    }
  };

  return {
    onBuyForAddress,
    isLoadingBuyForAddress,
  };
};
