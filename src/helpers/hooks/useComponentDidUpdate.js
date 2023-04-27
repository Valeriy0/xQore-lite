import { useRef, useEffect } from 'react';

export const useComponentDidUpdate = (callback, nextProps) => {
  const didMount = useRef(false);
  const prevProps = useRef(nextProps);
  useEffect(() => {
    if (didMount.current) {
      callback(prevProps.current);
      prevProps.current = nextProps;
    } else {
      didMount.current = true;
    }
  });
};
