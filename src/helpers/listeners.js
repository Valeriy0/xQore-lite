import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { injectedConnector } from 'connectors/wallets';

export const useInactiveListener = () => {
  const { active, error, activate } = useWeb3React(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = () => {
        // eat errors
        activate(injectedConnector, undefined, true).catch((error) => {
          console.error('Failed to activate after chain changed', error);
        });
      };

      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injectedConnector, undefined, true).catch((error) => {
            console.error('Failed to activate after accounts changed', error);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, activate]);
};
