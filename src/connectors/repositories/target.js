import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  create = (params) => requestApi('post', `${this.path}/create`, params, true);
  getList = (params) => requestApi('get', `${this.path}/list`, params);
}

export const TargetRepository = new Repository('/target');
