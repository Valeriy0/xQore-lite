import axios from 'axios';
import Qs from 'qs';
import MockAdapter from 'axios-mock-adapter';
import { createMocks } from './mock';
import getConfig from 'next/config';
import { destroyCookie, parseCookies } from 'nookies';

const requestContext = require('request-context');

const { publicRuntimeConfig } = getConfig();

//for interceptors etc.

const instance = axios.create({
  baseURL: process.browser ? publicRuntimeConfig.API_URL : process.env.PROXY_URL + publicRuntimeConfig.API_URL,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      destroyCookie(null, 'apiToken');
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

// createMocks(new MockAdapter(instance, { delayResponse: 500 }));

export const requestApi = async (method, url, data, multipart = false) => {
  const config = {
    method: method,
    url: url,
    params: {},
  };

  if (!process.browser) {
    config.timeout = 5000;
  }

  if (data) {
    switch (method) {
      case 'post':
      case 'put':
      case 'patch':
        config.data = data;
        break;
      default:
        config.params = { ...config.params, ...data };
        break;
    }
  }

  if (multipart) {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    config.headers = { 'Content-Type': undefined, enctype: 'multipart/form-data' };
    config.data = formData;
  } else if (method !== 'get') {
    config.data = data;
  }

  const cookies = process.browser ? parseCookies() : requestContext.get('request:cookies')?.cookies;

  instance.defaults.headers.Authorization = cookies?.apiToken ? `Bearer ${cookies?.apiToken}` : null;

  try {
    const { data } = await instance.request(config);

    return data;
  } catch (error) {
    throw error;
  }
};
