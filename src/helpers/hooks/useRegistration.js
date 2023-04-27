import React, { useState } from 'react';
import { useGetContract } from './useGetContract';
import {
  nameToType,
  DEFAULT_GAS_LIMIT,
  PROGRAM_NAMES,
  CONTRACT_NAMES,
  PROGRAM_PRICES,
  FORSAGE_AND_XQORE,
} from '../constants';
import { increaseByPercent, toWei } from 'helpers/numbers';
import { useBnbPriceByAmount } from 'helpers/hooks/useBnbPriceByAmount';

export const useRegistration = () => {
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false);
  const { getContract } = useGetContract();
  const { getBnbPriceByAmount } = useBnbPriceByAmount();

  const registration = async (name, uplineId = 1) => {
    if (!isLoadingRegistration) {
      setIsLoadingRegistration(true);
      try {
          // registration BNB
          const contract = await getContract(nameToType[name]);

          let gas = null;
          try {
            gas = await contract.estimateGas.registrationExt({
              value: toWei(PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1]),
            });
          } catch (e) {
            //
          }

          return await contract.registrationExt({
            value: toWei(PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1]),
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        } catch (e) {
        console.log(e);
        return Promise.reject(e);
      } finally {
        setIsLoadingRegistration(false);
      }
    }
  };
}