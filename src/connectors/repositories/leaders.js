import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getLeaders = (params) => requestApi('get', this.path, params);
}

export const LeadersRepository = new Repository('/leaders');
