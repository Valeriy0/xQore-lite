import React from 'react';
import FreshChat from 'react-freshchat';

const FRESHDESK_TOKEN = 'd639bd70-b55b-4ebc-9a3e-4103af5ba606';

export const SupportWidget = ({ user_id, wallet, isAuth }) => {
  return (
    <div className="">
      <FreshChat
        token={FRESHDESK_TOKEN}
        widgetUuid="3b96ddd1-72c3-438a-a1ec-fb7cc7182e62"
        host="https://forsagesupport.freshchat.com"
        onInit={(widget) => {
          widget.user.setProperties({
            '🆔 Forsage ID': user_id ? user_id : 'unknown',
            '🌐 Wallet address': wallet ? wallet : 'unknown',
            '🔌 Connection type': isAuth ? 'auth' : 'preview',
            '❇️ Platform': 'busd',
          });
        }}
      />
    </div>
  );
};
