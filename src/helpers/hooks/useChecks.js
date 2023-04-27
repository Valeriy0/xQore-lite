import { useCallback, useState } from 'react';

export const STATUSES_ENUM = {
  SUCCESS: 'success',
  ERROR: 'error',
  WAIT: 'pending',
};

export const useChecks = (callbacks) => {
  const baseStatuses = callbacks?.reduce((total, current) => {
    return { ...total, [current.key]: '' };
  }, {});
  const [statuses, setStatuses] = useState(baseStatuses);
  const [statusMeta, setStatusMeta] = useState({});

  const setKeyStatus = useCallback((key, status) => {
    setStatuses((prev) => ({ ...prev, [key]: status }));
  }, []);

  const callNextPromise = useCallback(
    async (callback) => {
      const index = callbacks.findIndex((currentCallback) => currentCallback.key === callback.key);
      const name = callback.key;

      try {
        setKeyStatus([name], STATUSES_ENUM.WAIT);
        await callback.func(callback.funcProps);
        setKeyStatus([name], STATUSES_ENUM.SUCCESS);

        if (callbacks[index + 1]) {
          await callNextPromise(callbacks[index + 1]);
        }
      } catch (e) {
        setStatusMeta((prev) => ({ ...prev, [name]: e }));
        setKeyStatus([name], STATUSES_ENUM.ERROR);
      }
    },
    [callbacks],
  );

  const callChecks = useCallback(async () => {
    const [firstCallback] = callbacks;
    setStatusMeta({});
    setStatuses(baseStatuses);
    await callNextPromise(firstCallback);
  }, [callbacks, baseStatuses]);

  return {
    statuses,
    statusMeta,
    callChecks,
  };
};
