import React from 'react';
import { InviteQoreLayout } from 'layouts';
import { RefUplineRepository } from 'connectors/repositories/ref-upline';
import { Main, Facts, Mechanic, MainFeatures, Levels, Faq } from 'features/InviteXQore';
import { Footer } from 'components';
import config from 'helpers/config';
import { setCookie } from 'nookies';

const QHash = ({ id, count_partners, profit_xqore, photo }) => {
  return (
    <div className="invitexQore-wrapper w-full flex flex-col items-center space-y-[150px] sm:space-y-[70px]">
      <Main id={id} count_partners={count_partners} profit_xqore={profit_xqore} photo={photo} />
      <Facts />
      <Mechanic />
      <MainFeatures />
      <Levels />
      <Faq />
      <div className="max-w-desktop-invite w-full flex z-10  items-center">
        <Footer isLoginPage />
      </div>
    </div>
  );
};

QHash.storeInitial = async ({ ctx }) => {
  try {
    const result = await RefUplineRepository.getRefInfo(ctx.query.hash);
    const cookiesDomain = !!config.stand ? (config.stand === 'prod' ? '.forsage.io' : '.forsage.tech') : 'localhost';

    const cookiesParams = {
      path: '/',
      sameSite: 'none',
      domain: cookiesDomain,
      secure: true,
      maxAge: 30 * 24 * 60 * 60,
    };

    setCookie(ctx, 'upline_binance', result.id, cookiesParams);

    if (result.tron_user_id) {
      setCookie(ctx, 'upline_tron', result.tron_user_id, cookiesParams);
    }

    if (result.ethereum_user_id) {
      setCookie(ctx, 'upline', result.ethereum_user_id, cookiesParams);
    }

    return {
      ...result,
    };
  } catch (e) {}

  return {};
};

QHash.Layout = InviteQoreLayout;

export default QHash;
