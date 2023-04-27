import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getNotifications = (params) => requestApi('get', this.path, params);
  actualize = (params) => requestApi('post', 'notification_read_at/actualize', params);
}

export const NotificationRepository = new Repository('/notification');
