import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from 'connectors/wallets';
import { isMobile } from 'react-device-detect';
import { useInactiveListener } from 'helpers/listeners';
import { useDispatch } from 'react-redux';
import { getProfile } from 'store/userSlice/asyncActions';
import { useRouter } from 'next/router';
import { useBalance } from 'helpers/hooks/useBalance';
import config from 'helpers/config';
import { toast } from 'react-toastify';
import { setIsLoadingRouter } from 'store/routerSlice';
import { useGetContract } from 'helpers/hooks/useGetContract';

const addChainEthsParams = {
  56: {
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  97: {
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
};

export const ManageProvider = ({ children }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const { active, error, activate, account, library, chainId } = useWeb3React();
  const { fetchBalance } = useBalance();
  const [loaded, setLoaded] = useState(false);
  const { getContract } = useGetContract();
  const isPreviewMode = !!query.user;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRouteStart = () => {
      dispatch(setIsLoadingRouter(true));
    };

    const handleRouteComplete = () => {
      dispatch(setIsLoadingRouter(false));
    };

    router.events.on('routeChangeComplete', handleRouteComplete);
    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeError', handleRouteComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
      router.events.on('routeChangeStart', handleRouteStart);
      router.events.on('routeChangeError', handleRouteComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (active) {
      toast.dismiss('unsupportedChainId');
    }
  }, [chainId, active]);

  useEffect(async () => {
    if (chainId !== config.allowedChainId && !!account) {
      const chainIntoHex = '0x' + config.allowedChainId.toString(16);
      try {
        await library?.send('wallet_switchEthereumChain', [{ chainId: chainIntoHex }, account]);
      } catch (e) {
        if (e.code === 4902) {
          library?.send('wallet_addEthereumChain', [
            {
              chainId: chainIntoHex,
              ...addChainEthsParams[config.allowedChainId],
            },
          ]);
        }
      }
    }
  }, [library, chainId, account]);

  useEffect(async () => {
    if (!!account && !!library) {
      await fetchBalance();
    }
  }, [account, library, chainId, pathname]);

  useEffect(() => {
    if (!isPreviewMode && (account || pathname === '/')) {
      account && dispatch(getProfile(account));
    }
  }, [account, pathname]);

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(injectedConnector);
        } else {
          if (isMobile && window.ethereum) {
            activate(injectedConnector, undefined, true).catch(() => {
              setLoaded(true);
            });
          }
        }
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [activate]);

  useInactiveListener();

  if (loaded) {
    return children;
  }

  return null;
};
