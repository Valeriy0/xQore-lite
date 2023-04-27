import { useGetContract } from 'helpers/hooks/useGetContract';
import {
  nameToType,
  CONTRACT_NAMES,
  DEFAULT_GAS_LIMIT,
  PROGRAM_NAMES,
  PROGRAM_PRICES,
  SERVICE_FEE,
  SERVICE_FEE_XQORE,
  XQORE_FIXED_NUM,
} from 'helpers/constants';
import { increaseByPercent, toWei } from 'helpers/numbers';
import { useState } from 'react';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';

const nameToInt = {
  [PROGRAM_NAMES.X3]: 1,
  [PROGRAM_NAMES.X4]: 2,
};

export const useUpgradeProgram = () => {
  const [isLoadingUpgradeProgram, setIsLoadingUpgradeProgram] = useState(false);
  const { getBnbPriceByAmount } = useBnbPriceByAmount();

  const { getContract } = useGetContract();

  const onBUSDUpgrade = async (level, programName) => {
    if (!isLoadingUpgradeProgram) {
      setIsLoadingUpgradeProgram(true);

      try {
        const routeContract = await getContract(CONTRACT_NAMES.ROUTER);

        let result = {};

        let gas = null;

        if (nameToInt[programName]) {
          gas = await routeContract.estimateGas.x3x4BuyLevelBatchBusd(nameToInt[programName], [level]);

          result = await routeContract.x3x4BuyLevelBatchBusd(nameToInt[programName], [level], {
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        } else if (programName === PROGRAM_NAMES.XXX) {
          gas = await routeContract.estimateGas.xxxBuyLevelBatchBusd([level]);

          result = await routeContract.xxxBuyLevelBatchBusd([level], {
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        } else if (programName === PROGRAM_NAMES.XGOLD) {
          gas = await routeContract.estimateGas.xGoldBuyLevelBatchBusd([level]);

          result = await routeContract.xGoldBuyLevelBatchBusd([level], {
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        }

        return result;
      } catch (e) {
        return Promise.reject(e);
      } finally {
        setIsLoadingUpgradeProgram(false);
      }
    }
  };

  const onBNBUpgrade = async (level, programName) => {
    if (!isLoadingUpgradeProgram) {
      setIsLoadingUpgradeProgram(true);
      let result = {};

      if (programName === PROGRAM_NAMES.XQORE) {
        const price = (PROGRAM_PRICES[programName][level] + SERVICE_FEE_XQORE).toFixed(XQORE_FIXED_NUM);
        try {
          const routeContract = await getContract(CONTRACT_NAMES.ROUTER);
          const value = toWei(price);

          let gas = null;
          try {
            gas = await contract.estimateGas.xQoreUpgrades([level], {
              value,
            });
          } catch (e) {
            //
          }

          result = await routeContract.xQoreUpgrades([level], {
            value,
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });

          return result;
        } catch (e) {
          console.log(e);
          return Promise.reject(e);
        } finally {
          setIsLoadingUpgradeProgram(false);
        }
      } else {
        const price = PROGRAM_PRICES[programName][level] + SERVICE_FEE;
        try {
          const routeContract = await getContract(CONTRACT_NAMES.ROUTER);
          const bnbPrice = await getBnbPriceByAmount(price);
          const value = toWei(bnbPrice);

          if (programName === PROGRAM_NAMES.X3 || programName === PROGRAM_NAMES.X4) {
            result = await routeContract.x3x4BuyLevelBatch(nameToInt[programName], [level], {
              value,
            });
          } else if (programName === PROGRAM_NAMES.XXX) {
            result = await routeContract.xxxBuyLevelBatch([level], {
              value,
            });
          } else if (programName === PROGRAM_NAMES.XGOLD) {
            result = await routeContract.xGoldBuyLevelBatch([level], {
              value,
            });
          } else if (programName === PROGRAM_NAMES.XQORE) {
            result = await routeContract.xQoreUpgrades([level], {
              value,
            });
          }

          return result;
        } catch (e) {
          return Promise.reject(e);
        } finally {
          setIsLoadingUpgradeProgram(false);
        }
      }
    }
  };

  return {
    onBNBUpgrade,
    onBUSDUpgrade,
    isLoadingUpgradeProgram,
  };
};
