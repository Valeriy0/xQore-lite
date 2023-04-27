import { requestApi } from 'connectors/api';
import { BaseRepository } from './base';

class Repository extends BaseRepository {
  getChat = (id, params) => requestApi('get', `/direct_message_chat/${id}`, params);
  getChats = (params) => requestApi('get', '/direct_message_chat', params);
  sendToMultiUsers = (params) => requestApi('post', `${this.path}/multi`, params);
  sendMessageToUser = (params) => requestApi('post', `${this.path}`, params);
  getRecipient = (params) => requestApi('get', `${this.path}/recipient`, params);
}

export const DirectMessageRepository = new Repository('/direct_message');
