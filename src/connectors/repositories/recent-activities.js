import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getList = (params) => requestApi('get', `${this.path}/recentActivities`, params);
}

export const RecentActivitiesRepository = new Repository('/recent-activities');
