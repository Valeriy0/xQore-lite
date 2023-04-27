import { useRouter } from 'next/router';
import { useRequest } from './useRequest';
import { UserRepository } from 'connectors/repositories/user';
import { callNotification } from 'helpers/notification';
import { linkWithQuery } from 'helpers/links';
import { useDispatch } from 'react-redux';
import { setPreviewAccount } from 'store/userSlice';

export const useCheckInputPreview = () => {
  const { push } = useRouter();
  const { isLoading, call } = useRequest(UserRepository.search);
  const dispatch = useDispatch();

  const checkInput = async (inputValue) => {
    const trimmedInputValue = inputValue?.trim();
    const isAddress = trimmedInputValue.match(/^0x[a-f0-9]{40}$/i);
    const isUserId = trimmedInputValue.match(/^[0-9]+$/);

    if (isAddress || isUserId) {
      const column = isAddress ? 'address' : 'id';

      try {
        const user = await call([{ column, value: trimmedInputValue }]);

        push(linkWithQuery('/dashboard', { user: user.id }));
        dispatch(setPreviewAccount(user));
      } catch (e) {
        callNotification({ type: 'error', message: 'User not found' });
      }
    } else {
      callNotification({ type: 'error', message: 'Invalid ID or BUSD wallet' });
    }
  };

  return {
    isLoadingCheck: isLoading,
    checkInput,
  };
};
