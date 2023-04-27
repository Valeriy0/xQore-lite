import { requestApi } from '../api';

export class BaseRepository {
  constructor(path) {
    this.path = path;
  }
  getList = (params) => {
    return requestApi('get', this.path, params);
  };
  get = (id) => {
    return requestApi('get', `${this.path}/${id}`);
  };
  create = (data) => {
    return requestApi('post', this.path, data);
  };
  edit = (id, data) => {
    return requestApi('put', `${this.path}/${id}`, data);
  };
  remove = (id) => {
    return requestApi('delete', `${this.path}/${id}`);
  };
}
