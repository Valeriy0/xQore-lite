import { useWeb3React } from '@web3-react/core';
import { AuthRepository } from 'connectors/repositories/auth';
import { destroyCookie } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { clearAuthUser } from 'store/userSlice';
import { getAuthUser } from 'store/userSlice/selectors';

export const useDeactivationWallet = () => {
  const { account, deactivate } = useWeb3React();
  const authProfile = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const deactivationWallet = async () => {
    if (!!account) {
      try {
        if (authProfile.id) {
          await AuthRepository.logout();
        }
        deactivate();
      } catch (ex) {
        console.log(ex);
      }
      destroyCookie(null, 'apiToken', {
        path: '/',
      });
      dispatch(clearAuthUser());
      push('/');
    }
  };

  return {
    deactivationWallet,
  };
};
