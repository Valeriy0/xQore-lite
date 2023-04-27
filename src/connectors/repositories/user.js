import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getNonce = (address) => requestApi('get', `${this.path}/nonce`, { address });
  login = (address, signed) => requestApi('post', `${this.path}/login`, { address, signed });
  search = (params) => requestApi('get', `${this.path}/search`, params);
  info = (params) => requestApi('get', `${this.path}/info`, params);
  programs = (params) => requestApi('get', `${this.path}/programs`, params);
  profile = (params) => requestApi('get', `${this.path}/public-profile`, params);
  partners = (params) => requestApi('get', `${this.path}/partners`, params);
  updateSettings = (params) => requestApi('post', `${this.path}/settings`, params, true);
  getSettings = (params) => requestApi('get', `${this.path}/settings`, params, true);
  getRefChart = (id, params) => requestApi('get', `${this.path}/${id}/ref_chart`, params);
  deleteAvatar = () => requestApi('delete', `${this.path}/avatar`);
}

export const UserRepository = new Repository('/user');
