import { Router } from 'next/router';
import { ROLES } from './constants';
require('request-context');

export const checkAuth = (context) => {
  const { reduxStore } = context;

  if (!reduxStore.getState()?.profile?.authUser?.id) {
    if (context.res) {
      try {
        context.res.writeHead(303, { Location: '/' });
        context.res.end();
        context.res.finised = true;
      } catch (e) {}
    }
  }
};

export const redirect = (target, ctx) => {
  if (ctx?.res) {
    // If on the server, an HTTP 303 response with a "Location"
    // is used to redirect.
    try {
      ctx?.res.writeHead(303, { Location: target });
      ctx?.res.end();
      ctx.res.finised = true;
    } catch (e) {}
  } else {
    Router?.replace && Router?.replace(target);
  }
};

export const checkRedirect = (context) => {
  const { reduxStore, query } = context;

  if (!query.user && !reduxStore.getState()?.profile?.authUser?.id) {
    redirect('/', context);
  }
};

export const checkRoleRedirect = (context) => {
  const { reduxStore } = context;
  const isMananger = reduxStore.getState()?.profile?.authUser?.role === ROLES?.MANAGER;

  if (!isMananger) {
    redirect('/', context);
  }
};
