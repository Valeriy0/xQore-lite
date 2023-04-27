import { useWeb3React } from '@web3-react/core';
import config from '../config';
import { Contract } from '@ethersproject/contracts';
import { ContractNames } from 'helpers/constants';

export const useGetContract = () => {
  const { account, library } = useWeb3React();

  const types = {
    [ContractNames.BASE]: [config.contractXBase, config.matrixXBaseAbi],
    [ContractNames.TOKEN]: [config.contractToken, config.matrixTokenAbi],
    [ContractNames.XGOLD]: [config.contractXGold, config.matrixXGoldAbi],
    [ContractNames.XXX]: [config.contractXxx, config.matrixXxxAbi],
    [ContractNames.XQORE]: [config.contractXqore, config.matrixXqoreAbi],
    [ContractNames.PANCAKE]: [config.pancakeSwapAddress, config.pancakeSwapAbi],
    [ContractNames.PANCAKE_EXCHANGE]: [config.pancakeExchange, config.contractPancakeExchangeAbi],
    [ContractNames.ROUTER]: [config.router, config.contractRouterAbi],
  };

  const getContract = (type) => {
    return new Promise(function (resolve, rejected) {
      if (types[type] && library) {
        const contract = new Contract(...types[type], library?.getSigner(account).connectUnchecked() || library);

        resolve(contract);
      } else {
        rejected('error init contract: ' + type);
      }
    });
  };

  return {
    getContract,
  };
};
