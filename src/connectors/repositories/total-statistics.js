import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getXXX = (params) => requestApi('get', `${this.path}/xxx`, params);
  getXGold = (params) => requestApi('get', `${this.path}/xgold`, params);
  getXQore = (params) => requestApi('get', `${this.path}/xqore`, params);
  getStatistics = (params) => requestApi('get', this.path, params);
}

export const TotalStatisticsRepository = new Repository('/total-statistics');
