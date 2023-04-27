import React, { useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import 'tailwindcss/tailwind.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import Head from 'next/head';
import { DefaultLayout } from 'layouts';
import getLibrary from '../helpers/getLibrary';
import nextI18NextConfig from 'next-i18next.config';
import { appWithTranslation } from 'next-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { getOrCreateStore } from 'store';
import { ManageProvider } from 'layouts';
import { checkAuth } from 'store/userSlice/asyncActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import 'styles.scss';
import { checkRedirect, redirect } from 'helpers/auth';
import { useRouter } from 'next/router';
import GoogleTranslate from '../components/GoogleTranslate';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { XQORE_DATE_START } from 'helpers/constants';
import { addHours, isAfter, isBefore, parseISO } from 'date-fns';

if (process.env.NODE_ENV !== 'development' && process.env.STAND === 'prod') {
  Sentry.init({
    dsn: 'https://b08d65f4ae90409587e2b59d31730915@o446008.ingest.sentry.io/4504813044629504',
    integrations: [new BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0,
  });
}

function App({ Component, pageProps, initialReduxState }) {
  const Layout = Component.Layout || DefaultLayout;
  const store = getOrCreateStore(initialReduxState);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-BF556F9T08', {
        page_title: document.title,
        page_location: router.asPath,
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head title="Forsage">
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="facebook-domain-verification" content="0l0jqngf7hnpo17ssvrusxn79c0muc" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ReduxProvider store={store}>
          <ManageProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ManageProvider>
        </ReduxProvider>
      </Web3ReactProvider>
      <ToastContainer />
      <GoogleTranslate />
    </>
  );
}

App.getInitialProps = async (appctx) => {
  const { Component } = appctx;
  const appProps = { showActions: false };

  const reduxStore = getOrCreateStore();

  appctx.ctx.reduxStore = reduxStore;

  if (
    appctx?.ctx?.query?.user &&
    (appctx?.ctx?.query?.user === '1259563' ||
      appctx?.ctx?.query?.user.toLowerCase() === '0x52D9dA53B85cbD0Ffc0Db4B6047777E334c67171'.toLowerCase())
  ) {
    redirect('/dashboard?user=1', appctx.ctx);
  }

  if (typeof window === 'undefined') {
    if (
      !(
        isAfter(new Date(), addHours(parseISO(XQORE_DATE_START), -1)) &&
        isBefore(new Date(), addHours(parseISO(XQORE_DATE_START), 1))
      )
    ) {
      if (!reduxStore.getState().profile?.authUser?.id) {
        await reduxStore.dispatch(checkAuth());
      }

      const excludedPathNames = ['/', '/registration', '/b/[hash]', '/br/[hash]', '/q/[hash]'];

      if (!reduxStore.getState().profile?.authUser?.id && !excludedPathNames?.includes(appctx.ctx.pathname)) {
        checkRedirect(appctx.ctx);
      }
    } else {
      const excludedRedirectNames = ['/', '/registration', '/buy-for-address', '/b/[hash]', '/br/[hash]', '/q/[hash]'];

      if (!excludedRedirectNames?.includes(appctx.ctx.pathname)) {
        redirect('/', appctx.ctx);
      }
    }
  }

  if (Component.storeInitial) {
    Object.assign(appProps, await Component.storeInitial(appctx));
  }

  return { pageProps: { ...appProps }, initialReduxState: reduxStore.getState() };
};

export default appWithTranslation(App, nextI18NextConfig);
