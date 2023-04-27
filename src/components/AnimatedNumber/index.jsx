import React, { memo, useEffect, useState } from 'react';
import AnimatedNumberLib from 'animated-number-react';
import { useComponentDidUpdate } from 'helpers/hooks/useComponentDidUpdate';

export const AnimatedNumber = memo((props) => {
  const { duration = 1000, value, fixedNums = 3, controlChange = true } = props;
  const [isChanged, setIsChanged] = useState(!controlChange);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.value && prev.value !== value && !isChanged) {
        setIsChanged(true);
      }
    },
    {
      value,
    },
  );

  if (!isChanged) return parseFloat(parseFloat(value).toFixed(fixedNums));

  const formatValue = (num) => {
    const isFloat = value % 1 !== 0;

    return isFloat ? parseFloat(parseFloat(num).toFixed(fixedNums)) : parseInt(num);
  };

  return <AnimatedNumberLib value={value} formatValue={formatValue} duration={!isMounted ? 0 : duration} />;
});
