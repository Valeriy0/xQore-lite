import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getMainPageContent = (params) => requestApi('get', `${this.path}`, params);
}

export const MainPageRepository = new Repository('/main');
