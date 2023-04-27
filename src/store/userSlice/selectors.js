export const getCurrentUserProfile = (state) => {
  return state?.profile?.currentUser || {};
};
export const getAuthUser = (state) => state?.profile?.authUser || {};

export const getNotificationsEvents = (state) => state?.profile?.notifications?.events || [];

export const getNotificationsStore = (state) => state?.profile?.notifications || {};

export const getAccountBalance = (state) => state?.profile?.accountBalance || {};

export const getPreviewAccount = (state) => state?.profile?.previewAccount || {};
