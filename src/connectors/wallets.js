import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import config from '@/helpers/config';

export const supportedChainIds = [1, 56, 97];

export const RPC = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-2-s3.binance.org:8545',
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds,
});

export const walletConnectConnector = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  network: 'binance',
  chainId: config.allowedChainId,
  supportedChainIds,
});

// export const walletLinkConnector = new WalletLinkConnector({
//   url: RPC[1],
//   appName: 'wallet bit',
//   supportedChainIds: [
//     1,
//     56, // binance smart chain
//     97, // binance test smart chain
//   ],
// });

export const Wallets = [
  {
    title: 'Trust Wallet',
    subtitle: 'DApp in app',
    connector: injectedConnector,
  },
  {
    title: 'TokenPocket',
    subtitle: 'DApp in app',
    connector: injectedConnector,
  },
  {
    title: 'MetaMask',
    subtitle: 'Desktop / DApp in app',
    connector: injectedConnector,
  },
  {
    title: 'WalletConnect',
    subtitle: 'Any wallet and browser',
    connector: walletConnectConnector,
  },
];
