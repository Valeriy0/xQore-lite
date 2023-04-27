import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getStats = (params) => requestApi('get', `${this.path}`, params);
}

export const ContentStatisticsRepository = new Repository('/content-statistics');
