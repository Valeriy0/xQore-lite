import { useCallback } from 'react';
import { sendEvent } from 'helpers/sendEvent';
import { EVENT_NAMES } from 'helpers/constants';

export const useOpenSupport = () => {
  const openSupport = useCallback(() => {
    if (typeof window.fcWidget !== 'undefined') {
      sendEvent({ type: EVENT_NAMES.SUPPORT_CLICK });
      window.fcWidget.open();
      // FreshworksWidget('open');
    }
  }, []);

  return {
    openSupport,
  };
};
