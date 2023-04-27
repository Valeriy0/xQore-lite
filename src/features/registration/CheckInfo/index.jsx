import React, { memo, useMemo } from 'react';
import LoadingCheckIcon from 'assets/icons/information_circle.svg';
import { STATUSES_ENUM } from 'helpers/hooks/useChecks';
import { CustomLink, Button } from 'components';
import { BNB_COMMISSIONS, PROGRAM_NAMES, PROGRAM_PRICES } from 'helpers/constants';
import { useBalance } from 'helpers/hooks/useBalance';

const CheckInfoComp = ({ status, infoKey, program, statusMeta }) => {
  const { balanceBnb, balanceBusd } = useBalance();

  const regInfo = useMemo(() => {
    return {
      checkWallet: {
        x3: {
          wait: {
            title: 'Cryptocurrency wallet app or browser extension is required.',
            render: () => (
              <span>
                {' '}
                Use existing wallet or create a new one in Smart Chain network. Access the website via dapp browser.{' '}
                <br />
                <br /> Recommended wallets:{' '}
                <CustomLink href="https://metamask.io/" className="text-main-blue font-bold" target="_blank">
                  Metamask
                </CustomLink>
                ,{' '}
                <CustomLink href="https://www.tokenpocket.pro/" className="text-main-blue font-bold" target="_blank">
                  Tokenpocket
                </CustomLink>
                ,{' '}
                <CustomLink href="https://trustwallet.com/" className="text-main-blue font-bold" target="_blank">
                  Trust
                </CustomLink>{' '}
              </span>
            ),
          },
          error: {
            title: 'Wallet not connected.',
            text: 'Access the website via cryptowallet dapp browser (”Discover” button in Tokenpoket) or with Metamask extension installed.',
            link: 'https://support.forsage.io/article/wallet',
          },
        },
        xXx: {
          wait: {
            title: 'Cryptocurrency wallet app or browser extension is required.',
            render: () => (
              <span>
                {' '}
                Use existing wallet or create a new one in Smart Chain network. Access the website via dapp browser.{' '}
                <br />
                <br /> Recommended wallets:{' '}
                <CustomLink href="https://metamask.io/" className="text-main-blue font-bold" target="_blank">
                  Metamask
                </CustomLink>
                ,{' '}
                <CustomLink href="https://www.tokenpocket.pro/" className="text-main-blue font-bold" target="_blank">
                  Tokenpocket
                </CustomLink>
                ,{' '}
                <CustomLink href="https://trustwallet.com/" className="text-main-blue font-bold" target="_blank">
                  Trust
                </CustomLink>{' '}
              </span>
            ),
          },
          error: {
            title: 'Wallet not connected.',
            text: 'Access the website via cryptowallet dapp browser (”Discover” button in Tokenpoket) or with Metamask extension installed.',
            link: 'https://support.forsage.io/article/wallet',
          },
        },
        xGold: {
          wait: {
            title: 'Cryptocurrency wallet app or browser extension is required.',
            render: () => (
              <span>
                {' '}
                Use existing wallet or create a new one in Smart Chain network. Access the website via dapp browser.{' '}
                <br />
                <br /> Recommended wallets:{' '}
                <CustomLink href="https://metamask.io/" className="text-main-blue font-bold" target="_blank">
                  Metamask
                </CustomLink>
                ,{' '}
                <CustomLink href="https://www.tokenpocket.pro/" className="text-main-blue font-bold" target="_blank">
                  Tokenpocket
                </CustomLink>
                ,{' '}
                <CustomLink href="https://trustwallet.com/" className="text-main-blue font-bold" target="_blank">
                  Trust
                </CustomLink>{' '}
              </span>
            ),
          },
          error: {
            title: 'Wallet not connected.',
            text: 'Access the website via cryptowallet dapp browser (”Discover” button in Tokenpoket) or with Metamask extension installed.',
            link: 'https://support.forsage.io/article/wallet',
          },
        },
      },
      checkNetwork: {
        x3: {
          wait: {
            text: 'Select the Smart Chain in your wallet to interact with the platform.',
          },
          error: {
            title: 'Wrong network.',
            text: 'Please switch to Smart Chain network to continue.',
          },
        },
        xXx: {
          wait: {
            text: 'Select the Smart Chain in your wallet to interact with the platform.',
          },
          error: {
            title: 'Wrong network.',
            text: 'Please switch to Smart Chain network to continue.',
          },
        },
        xGold: {
          wait: {
            text: 'Select the Smart Chain in your wallet to interact with the platform.',
          },
          error: {
            title: 'Wrong network.',
            text: 'Please switch to Smart Chain network to continue.',
          },
        },
        xQore: {
          wait: {
            text: 'Select the Smart Chain in your wallet to interact with the platform.',
          },
          error: {
            title: 'Wrong network.',
            text: 'Please switch to Smart Chain network to continue.',
          },
        },
      },
      checkRegistered: {
        x3: {
          wait: {
            render: () => (
              <span>
                {' '}
                Before completing the registration,
                <br /> check your upline ID.{' '}
              </span>
            ),
          },
          error: {
            title: 'Already Registered.',
            text: `This wallet is already registered with ID ${
              statusMeta?.checkRegistered?.id || ''
            }. Use other to register or login by clicking on the "Login to your account" button`,
          },
        },
        xXx: {
          wait: {
            title: 'Check is successful, you can activate xXx.',
            text: 'Click on the "Activate xXx" button and sign the transaction in your wallet.',
          },
          error: {
            title: 'Already activated.',
            text: 'This wallet is already activated xXx with ID .. . Use other to activate or login by clicking on the "Login to your account" button',
          },
        },
        xGold: {
          wait: {
            title: 'Check is successful, you can activate xGold.',
            text: 'Click on the "Activate xGold" button and sign the transaction in your wallet.',
          },
          error: {
            title: 'Already activated.',
            text: 'This wallet is already activated xGold with ID .. . Use other to activate or login by clicking on the "Login to your account" button',
          },
        },
      },
      checkBalance: {
        x3: {
          wait: {
            render: () => (
              <span>
                Top up your wallet with at least{' '}
                <span className="text-white notranslate">
                  {PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]} BUSD
                </span>{' '}
                and <span className="text-white notranslate">{BNB_COMMISSIONS[PROGRAM_NAMES.X3]} BNB</span>. It is
                recommended to buy cryptocurrency on{' '}
                <CustomLink className="text-main-blue font-bold" href="https://binance.com/" target="_blank">
                  Binance.com
                </CustomLink>{' '}
                or use{' '}
                <CustomLink className="text-main-blue font-bold" href="https://pancakeswap.finance/" target="_blank">
                  {' '}
                  Pancakeswap.finance{' '}
                </CustomLink>{' '}
                for exchange.
              </span>
            ),
          },
          error: {
            title: 'Insufficient balance for registration.',
            render: () => (
              <span>
                Registration requires{' '}
                <span className="text-white notranslate">
                  {PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]} BUSD
                </span>{' '}
                and at least <span className="text-white notranslate">{BNB_COMMISSIONS[PROGRAM_NAMES.X3]} BNB</span>.
                &thinsp;
                <span>
                  Your wallet balance:{' '}
                  <span
                    className={`notranslate ${
                      balanceBusd >= PROGRAM_PRICES[PROGRAM_NAMES.X3][1] + PROGRAM_PRICES[PROGRAM_NAMES.X4][1]
                        ? 'text-white'
                        : 'text-red'
                    }`}
                  >
                    {balanceBusd} BUSD
                  </span>{' '}
                  and{' '}
                  <span
                    className={`notranslate ${
                      balanceBnb >= BNB_COMMISSIONS[PROGRAM_NAMES.X3] ? 'text-white' : 'text-red'
                    }`}
                  >
                    {balanceBnb} BNB
                  </span>
                  .
                </span>
              </span>
            ),
            link: 'https://support.forsage.io/article/guides/registration-forsage-busd',
          },
        },
        xXx: {
          wait: {
            render: () => (
              <span>
                Top up your wallet with at least{' '}
                <span className="text-white notranslate">{PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]} BUSD</span> and{' '}
                <span className="text-white notranslate">{BNB_COMMISSIONS[PROGRAM_NAMES.XXX]} BNB</span>. It is
                recommended to buy cryptocurrency on{' '}
                <CustomLink className="text-main-blue font-bold" href="https://binance.com/" target="_blank">
                  Binance.com
                </CustomLink>{' '}
                or use{' '}
                <CustomLink className="text-main-blue font-bold" href="https://pancakeswap.finance/" target="_blank">
                  {' '}
                  Pancakeswap.finance{' '}
                </CustomLink>{' '}
                for exchange.
              </span>
            ),
          },
          error: {
            title: 'Insufficient balance for xXx activation.',
            render: () => (
              <span>
                xXx starting level requires{' '}
                <span className="text-white notranslate">{PROGRAM_PRICES[PROGRAM_NAMES.XXX][1]} BUSD</span> and at least{' '}
                <span className="text-white notranslate">{BNB_COMMISSIONS[PROGRAM_NAMES.XXX]} BNB</span>. &thinsp;
                <span>
                  Your wallet balance:{' '}
                  <span
                    className={`notranslate ${
                      balanceBusd >= PROGRAM_PRICES[PROGRAM_NAMES.XXX][1] ? 'text-white' : 'text-red'
                    }`}
                  >
                    {balanceBusd} BUSD
                  </span>{' '}
                  and{' '}
                  <span
                    className={`notranslate ${
                      balanceBnb >= BNB_COMMISSIONS[PROGRAM_NAMES.XXX] ? 'text-white' : 'text-red'
                    }`}
                  >
                    {balanceBnb} BNB
                  </span>
                  .
                </span>
              </span>
            ),
            link: 'https://support.forsage.io/article/guides/registration-forsage-busd',
          },
        },
        xGold: {
          wait: {
            render: () => (
              <span>
                Top up your wallet with at least{' '}
                <span className="text-white notranslate">{PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]} BUSD</span> and{' '}
                <span className="text-white notranslate">{BNB_COMMISSIONS[PROGRAM_NAMES.XGOLD]} BNB</span>. It is
                recommended to buy cryptocurrency on{' '}
                <CustomLink className="text-main-blue font-bold" href="https://binance.com/" target="_blank">
                  Binance.com
                </CustomLink>{' '}
                or use{' '}
                <CustomLink className="text-main-blue font-bold" href="https://pancakeswap.finance/" target="_blank">
                  {' '}
                  Pancakeswap.finance{' '}
                </CustomLink>{' '}
                for exchange.
              </span>
            ),
          },
          error: {
            title: 'Insufficient balance for xGold activation.',
            render: () => (
              <span>
                xGold starting level requires{' '}
                <span className="text-white notranslate">{PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1]} BUSD</span> and at
                least <span className="text-white notranslate">{BNB_COMMISSIONS[PROGRAM_NAMES.XGOLD]} BNB</span>.
                &thinsp;
                <span>
                  Your wallet balance:{' '}
                  <span
                    className={`notranslate ${
                      balanceBusd >= PROGRAM_PRICES[PROGRAM_NAMES.XGOLD][1] ? 'text-white' : 'text-red'
                    }`}
                  >
                    {balanceBusd} BUSD
                  </span>{' '}
                  and{' '}
                  <span
                    className={`notranslate ${
                      balanceBnb >= BNB_COMMISSIONS[PROGRAM_NAMES.XGOLD] ? 'text-white' : 'text-red'
                    }`}
                  >
                    {balanceBnb} BNB
                  </span>
                  .
                </span>
              </span>
            ),
            link: 'https://support.forsage.io/article/guides/registration-forsage-busd',
          },
        },
      },
      checkApprove: {
        x3: {
          wait: {
            title: 'Check successful, you are ready to register.',
            text: 'Make sure you specify the correct Upline before proceeding. Click on the "Register" button and sign the transaction to complete the registration.',
          },
          error: {
            render: () => (
              <span>
                BUSD approval is required to work with the Forsage x3 / x4 contract. <br /> Click on the "Approve BUSD"
                button and sign the transaction in your wallet.
              </span>
            ),
          },
          success: {
            title: 'Check successful, you are ready to register.',
            text: 'Make sure you specify the correct Upline before proceeding. Click on the "Register" button and sign the transaction to complete the registration.',
          },
        },
        xXx: {
          wait: {
            title: 'Check is successful, you can activate xXx.',
            text: 'Click on the "Activate xXx" button and sign the transaction in your wallet.',
          },
          error: {
            render: () => (
              <span>
                BUSD approval is required to work with the Forsage xXx contract. <br /> Click on the "Approve BUSD"
                button and sign the transaction in your wallet.
              </span>
            ),
          },
        },
        xGold: {
          wait: {
            title: 'Check is successful, you can activate xGold.',
            text: 'Click on the "Activate xGold" button and sign the transaction in your wallet.',
          },
          error: {
            render: () => (
              <span>
                BUSD approval is required to work with the Forsage xGold contract. <br /> Click on the "Approve BUSD"
                button and sign the transaction in your wallet.
              </span>
            ),
          },
        },
        xQore: {
          wait: {
            title:
              'Cryptocurrency wallet app or browser extension is required. Use existing wallet or create a new one in Smart Chain network. Access the website via dapp browser.',
            text: 'Recommended wallets: Metamask, Tokenpocket, Trust.',
          },
        },
      },
    };
  }, [statusMeta]);

  return useMemo(() => {
    const infoTitle = regInfo[infoKey]?.[program]?.wait?.title || regInfo[infoKey]?.wait?.title;
    const infoText = regInfo[infoKey]?.[program]?.wait?.render
      ? regInfo[infoKey]?.[program]?.wait?.render()
      : regInfo[infoKey]?.[program]?.wait?.text;
    const errTitle = regInfo[infoKey]?.[program]?.error?.title || regInfo[infoKey]?.error?.title;
    const errText = regInfo[infoKey]?.[program]?.error?.render
      ? regInfo[infoKey]?.[program]?.error?.render()
      : regInfo[infoKey]?.[program]?.error?.text;
    const errLink = regInfo[infoKey]?.[program]?.error?.link || regInfo[infoKey]?.error?.link;

    switch (status) {
      case STATUSES_ENUM.WAIT:
        return (
          <div className="flex flex-col">
            <span className="flex items-center text-white text-2xl font-bold mb-5 sm:mb-2.5">
              <LoadingCheckIcon className="inline w-6 h-6 mr-5" />
              Information
            </span>
            <span className="mb-7.5">{infoTitle}</span>
            <span className="">{infoText}</span>
          </div>
        );
      case STATUSES_ENUM.ERROR:
        return (
          <div className="flex flex-col">
            <span className="flex items-center text-white text-2xl font-bold mb-5 sm:mb-2.5 sm:hidden">
              <LoadingCheckIcon className="inline w-6 h-6 mr-5" />
              Information
            </span>
            <div className="flex flex-col">
              {errTitle && <span className="text-white">{errTitle}</span>}
              {errText && <span className="">{errText}</span>}
              {errLink && (
                <CustomLink href={errLink} targetBlank>
                  <Button className="p-5 rounded-large sm:rounded-mini mt-5 sm:mt-4 sm:w-full" type="red">
                    Read guide
                  </Button>
                </CustomLink>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [status, regInfo]);
};

export const CheckInfo = memo(CheckInfoComp);
