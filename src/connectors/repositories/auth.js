import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  check = (params) => requestApi('get', `${this.path}/check`, params);
  logout = (params) => requestApi('get', `${this.path}/logout`, params);
}

export const AuthRepository = new Repository('/auth');
