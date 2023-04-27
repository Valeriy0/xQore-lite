import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getRefInfo = (hash) => requestApi('get', `${this.path}/${hash}`);
}

export const RefUplineRepository = new Repository('/ref_upline');
