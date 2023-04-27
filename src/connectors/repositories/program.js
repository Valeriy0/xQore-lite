import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getProgram = (params) => requestApi('get', this.path, params);
  getLevel = (params) => requestApi('get', `${this.path}/level`, params);
}

export const ProgramRepository = new Repository('/program');
