import { useState } from 'react';
import { parseErrorToUserReadableMessage } from 'helpers/format';

export const useRequest = (callback, args = [], mapper, isObserved = false, setIsObserved, inView = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [data, setData] = useState({});

  const resetData = (defaultValue = {}) => {
    setData(defaultValue);
  };

  const getData = async (params) => {
    setIsLoading(true);
    setIsError(false);
    setIsDone(false);

    try {
      const result = await callback(...(params ? params : args));

      setIsLoading(false);
      if (mapper) {
        return setData((prev) => mapper(prev, result));
      }

      setData(result);

      return result;
    } catch (e) {
      parseErrorToUserReadableMessage({ type: 'error', message: parseErrorToUserReadableMessage(e) });
      setIsError(true);
    } finally {
      setIsDone(true);
      setIsLoading(false);
    }
  };

  const call = async (params) => {
    if (!isLoading && !isObserved) {
      return await getData(params);
    }

    if (!isLoading && isObserved && inView) {
      const result = await getData(params);
      if (typeof setIsObserved === 'function') {
        setIsObserved(false);
      }

      return result;
    }
  };

  return {
    isLoading,
    data,
    call,
    isDone,
    isError,
    resetData,
  };
};
