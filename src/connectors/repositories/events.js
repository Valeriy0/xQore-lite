import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  searchEvents = (params) => requestApi('get', `${this.path}`, params);
}

export const EventsRepository = new Repository('/events');
