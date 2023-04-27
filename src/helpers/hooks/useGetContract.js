import { useWeb3React } from '@web3-react/core';
import config from '../config';
import { Contract } from '@ethersproject/contracts';

export const useGetContract = () => {
  const { account, library } = useWeb3React();

  const types = {
    'xQore': [config.contractXqore, config.matrixXqoreAbi],
    'router': [config.router, config.contractRouterAbi],
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
