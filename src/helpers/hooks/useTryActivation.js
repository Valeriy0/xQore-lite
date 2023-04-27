import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const useTryActivation = () => {
  const { activate } = useWeb3React();

  const tryActivation = async (connector) => {
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    try {
      connector && (await activate(connector, undefined, true));
    } catch (e) {
      if (e instanceof UnsupportedChainIdError) {
      } else {
        console.log(e);
      }
    }
  };

  return {
    tryActivation,
  };
};
