import config from './config';

import { MAX_VALUE, PROGRAM_NAMES, PROGRAM_PRICES, SERVICE_FEE, ContractNames } from './constants';
import { toWei } from 'helpers/numbers';

export const checkNetwork = async ({ chainId }) => {
  if (chainId === config.allowedChainId) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
};

export const checkBalanceWithBnbLevel = async ({
  account,
  getContract,
  library,
  level,
  name,
  bnbMinPrice,
  busdMinPrice,
  isRegistration = false,
}) => {
  try {
    const resultBnb = await library.getBalance(account);
    const balanceBnb = parseFloat((parseInt(resultBnb) / 1e18).toFixed(4));

    const contract = await getContract(ContractNames.TOKEN);
    let balanceBusd = await contract.balanceOf(account);

    const contractPancake = await getContract(ContractNames.PANCAKE);
    const [reserve0, reserve1] = await contractPancake.getReserves();
    const bnbCurrency = reserve1 / reserve0;
    balanceBusd = parseInt(balanceBusd) / 1e18;
    const amount = isRegistration
      ? PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]
      : PROGRAM_PRICES[name][level] + SERVICE_FEE;

    const totalRegistryPrice = (parseFloat(amount / bnbCurrency) * 1.05).toFixed(3);

    if ((balanceBnb >= bnbMinPrice && balanceBusd >= busdMinPrice) || balanceBnb >= totalRegistryPrice) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

export const checkBalanceInvitexQore = async ({ account, library, price }) => {
  try {
    const resultBnb = await library.getBalance(account);
    const balanceBnb = parseFloat((parseInt(resultBnb) / 1e18).toFixed(4));

    if (balanceBnb >= price) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};

export const checkBalance = async ({ account, getContract, library, busdMinPrice = 10, bnbMinPrice = 0.005 }) => {
  const isDev = !!(config?.stand && config?.stand === 'dev');

  try {
    if (!!account && !!library) {
      const resultBnb = await library.getBalance(account);
      const balanceBnb = (parseInt(resultBnb) / 1e18).toFixed(4);
      const contract = await getContract(ContractNames.TOKEN);
      let balanceBusd = await contract.balanceOf(account);

      balanceBusd = parseInt(balanceBusd) / 1e18;

      if (isDev || (balanceBnb >= bnbMinPrice && balanceBusd >= busdMinPrice)) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  } catch (e) {
    return Promise.reject();
  }
};

export const checkWallet = ({ account }) => {
  return new Promise((resolve, reject) => {
    if (account) {
      resolve();
    } else {
      reject();
    }
  });
};

export const nameToContractConfig = {
  [PROGRAM_NAMES.X3]: 'contractXBase',
  [PROGRAM_NAMES.X4]: 'contractXBase',
  [PROGRAM_NAMES.XXX]: 'contractXxx',
  [PROGRAM_NAMES.XGOLD]: 'contractXGold',
  router: 'router',
};

export const checkApprove = async ({ getContract, account, name = 'contractXBase', price }) => {
  const MIN_BALANCE = parseInt(MAX_VALUE, 16);
  try {
    const contractToken = await getContract(ContractNames.TOKEN);
    const approveBalance = await contractToken.allowance(account, config[nameToContractConfig[name]]);

    const isAllowed = price ? parseInt(approveBalance) >= parseInt(toWei(price)) : approveBalance >= MIN_BALANCE;

    if (isAllowed) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const userAddressToId = async (userAddress, contract) => {
  let response = await contract.users(userAddress);
  return response && response.id ? response.id : null;
};

export const userIdToAddress = async (user, contract) => {
  return await contract.userIds(user);
};

export const userExists = async (user, contract) => {
  let exists;
  user = user.toString();
  if (user.match(/^[0-9]+$/)) {
    exists = await contract.isUserExists(await userIdToAddress(user, contract));
  } else if (user.match(/^0x[a-f0-9]{40}$/i)) {
    exists = await contract.isUserExists(user);
  } else {
    exists = false;
  }
  return exists;
};

export const checkRegistered = async ({ account, getContract, contractType = ProgramNames.BASE }) => {
  try {
    const contract = await getContract(contractType);

    if (!(await userExists(account, contract))) {
      return Promise.resolve();
    } else {
      const id = await userAddressToId(account, contract);

      return Promise.reject({ text: 'this account is registered', id: parseInt(id) });
    }
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
};
