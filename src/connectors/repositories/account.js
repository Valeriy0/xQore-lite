import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getPrograms = (id, params) => requestApi('get', `${this.path}/${id}/programs`, params);
  getInfo = (id, params) => requestApi('get', `${this.path}/${id}/info`, params);
  getProfile = (id, params) => requestApi('get', `${this.path}/${id}/profile`, params);
  getProgram = (id, programId) => requestApi('get', `${this.path}/${id}/program/${programId}`);
  getProgramEvents = (id, programId) => requestApi('get', `${this.path}/${id}/program/${programId}/events`);
  getProgramLevel = (id, programId, levelId) =>
    requestApi('get', `${this.path}/${id}/program/${programId}/level/${levelId}`);
  getProgramLevelEvents = (id, programId, levelId) => {
    return requestApi('get', `${this.path}/${id}/program/${programId}/level/${levelId}/events`);
  };
  getPartnersList = (id, params) => requestApi('get', `${this.path}/${id}/partners`, params);
}

export const AccountRepository = new Repository('/account');
