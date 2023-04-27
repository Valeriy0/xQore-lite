import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  create = (params) => requestApi('post', `${this.path}`, params);
  getList = (params) => requestApi('get', `${this.path}`, params);
  getLink = (id, params) => requestApi('get', `${this.path}/${id}`, params);
  addPartner = (params) => requestApi('post', `${this.path}_partner`, params);
  changeLinkMode = (id, params) => requestApi('post', `${this.path}/${id}`, params);
  addAlias = (id, params) => requestApi('post', `${this.path}/${id}`, params);
  togglePartner = (id, params) => requestApi('post', `${this.path}_partner/${id}`, params);
  deletePartner = (id, params) => requestApi('delete', `${this.path}_partner/${id}`, params);
}

export const GroupReflinkRepository = new Repository('/group_ref_link');
