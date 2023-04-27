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
        if (name === PROGRAM_NAMES.X3 || name === PROGRAM_NAMES.X4) {
          const contract = await getContract(CONTRACT_NAMES.ROUTER);

          const xbaseContract = await getContract(CONTRACT_NAMES.BASE);
          const address = await xbaseContract.userIds(uplineId);

          let gas = null;
          try {
            gas = await contract.estimateGas.forsageRegistrationBUSD(address);
          } catch (e) {
            //
          }

          return await contract.forsageRegistrationBUSD(address, {
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        }

        if (name === PROGRAM_NAMES.XXX || name === PROGRAM_NAMES.XGOLD) {
          const contract = await getContract(nameToType[name]);

          let gas = null;
          try {
            gas = await contract.estimateGas.registrationExt();
          } catch (e) {
            //
          }

          return await contract.registrationExt({
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        }
        if (name === PROGRAM_NAMES.XQORE) {
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
        }

        if (name === FORSAGE_AND_XQORE) {
          const contract = await getContract(CONTRACT_NAMES.ROUTER);
          const priceReg = await getBnbPriceByAmount(
            PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1],
          );

          const xbaseContract = await getContract(CONTRACT_NAMES.BASE);
          const address = await xbaseContract.userIds(uplineId);

          const total = parseFloat(Number(priceReg) + PROGRAM_PRICES[PROGRAM_NAMES.XQORE][1]);

          let gas = null;
          try {
            gas = await contract.estimateGas.forsageAndXQoreRegistration(address, {
              value: toWei(total),
            });
          } catch (e) {
            //
          }

          return await contract.forsageAndXQoreRegistration(address, {
            value: toWei(total),
            gasLimit: parseInt(gas) ? increaseByPercent(gas) : DEFAULT_GAS_LIMIT,
          });
        }
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      } finally {
        setIsLoadingRegistration(false);
      }
    }
  };

  const registrationBNB = async (uplineId = 1) => {
    //registration BNB only for base registration
    const routeContract = await getContract(CONTRACT_NAMES.ROUTER);
    const xbaseContract = await getContract(CONTRACT_NAMES.BASE);
    const address = await xbaseContract.userIds(parseInt(uplineId));

    const bnbPrice = await getBnbPriceByAmount(
      PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1],
    );

    const estimateGas = await routeContract.estimateGas.forsageRegistration(address, {
      value: toWei(bnbPrice),
    });

    return await routeContract.forsageRegistration(address, {
      value: toWei(bnbPrice),
      gasLimit: increaseByPercent(estimateGas),
    });
  };

  return {
    registration,
    registrationBNB,
    isLoadingRegistration,
  };
};
