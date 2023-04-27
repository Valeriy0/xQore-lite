import { useWeb3React } from '@web3-react/core';
import { useGetContract } from './useGetContract';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from 'store/userSlice';
import { getAccountBalance } from 'store/userSlice/selectors';
import { ContractNames } from 'helpers/constants';
import { callNotification } from 'helpers/notification';
import { parseErrorToUserReadableMessage } from 'helpers/format';

export const useBalance = () => {
  const { account, library } = useWeb3React();
  const { getContract } = useGetContract();
  const dispatch = useDispatch();
  const { balanceBnb, balanceBusd, isFirstLoaded } = useSelector(getAccountBalance);

  const fetchBalance = async () => {
    try {
      const resultBnb = await library.getBalance(account);
      const balanceBnb = (parseInt(resultBnb) / 1e18).toFixed(3);
      const contract = await getContract(ContractNames.TOKEN);
      const resultBalanceBusd = await contract?.balanceOf(account);
      const balanceBusd = (parseInt(resultBalanceBusd) / 1e18).toFixed(2);

      dispatch(
        setBalance({
          balanceBnb,
          balanceBusd,
          isFirstLoaded: true,
        }),
      );
    } catch (e) {
      callNotification({ type: 'error', message: parseErrorToUserReadableMessage(e) });
    }
  };

  return {
    balanceBusd: balanceBusd || 0,
    balanceBnb: balanceBnb || 0,
    isFirstLoaded,
    fetchBalance,
  };
};
