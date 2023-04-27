import { BaseRepository } from './base';
import { requestApi } from '../api';

class Repository extends BaseRepository {
  getRecentActivities = (params) => requestApi('get', `${this.path}/recent-activities`, params);
}

export const ActivitiesRepository = new Repository('/activities');
