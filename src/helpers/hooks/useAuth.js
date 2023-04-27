import { setCookie } from 'nookies';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { UserRepository } from 'connectors/repositories/user';
import { checkAuth } from 'store/userSlice/asyncActions';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const { push } = useRouter();
  const { account, library } = useWeb3React();
  const dispatch = useDispatch();

  const authAccount = async () => {
    const { nonce } = await UserRepository.getNonce(account);

    if (nonce) {
      try {
        const resultmessage = await library?.getSigner(account).signMessage(nonce);
        const { apiToken } = await UserRepository.login(account, resultmessage);
        setCookie(null, 'apiToken', apiToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        await dispatch(checkAuth());

        push('/dashboard');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return {
    authAccount,
  };
};
