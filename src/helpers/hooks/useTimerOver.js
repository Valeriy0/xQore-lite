import { fromUnixTime } from 'date-fns';
import { useCallback, useState } from 'react';
import { isSameOrBefore } from 'helpers/date';

export const useTimerOver = (startDate) => {
  const isBeforeOrSome = isSameOrBefore(startDate);
  const [isCompleted, setIsCompleted] = useState(isBeforeOrSome);

  const onComplete = useCallback(async () => {
    setIsCompleted(true);
  }, [isCompleted]);

  return {
    isCompleted,
    onComplete,
  };
};
