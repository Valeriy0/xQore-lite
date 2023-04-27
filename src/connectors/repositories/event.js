import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  createEvent = (params) => requestApi('post', this.path, params, true);
  getEvents = (params) => requestApi('get', this.path, params);
  approveEvent = (id) => requestApi('post', `${this.path}/${id}/approve`);
  declineEvent = (id) => requestApi('post', `${this.path}/${id}/decline`);
  deleteEvent = (id) => requestApi('delete', `${this.path}/${id}`);
  reportEvent = (id, data) => requestApi('post', `${this.path}/${id}/report`, data);
}

export const EventRepository = new Repository('/event');
