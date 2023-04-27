import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getUserNft = (params) => requestApi('get', `${this.path}/nft`, params);
}

export const PumalabsRepository = new Repository('/pumalabs');
