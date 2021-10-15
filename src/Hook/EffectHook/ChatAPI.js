export default class ChatAPI {
  static subscribeToFriendStatus(id, cb) {
    cb(id);
  }
  static unsubscribeFromFriendStatus(id, cb) {
    cb(id);
  }
}