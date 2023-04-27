import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getTransactionHistory = (params) => requestApi('get', `${this.path}/history`, params);
  getTransactionStatistics = (params) => requestApi('get', `${this.path}/statistics`, params);
}

export const TransactionsRepository = new Repository('/transactions');
