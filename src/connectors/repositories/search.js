import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getProfile = (account, params) => requestApi('get', `${this.path}/user/address/${account}`, params);
}

export const SearchRepository = new Repository('/search');
