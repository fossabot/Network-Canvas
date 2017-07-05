/* eslint-disable */
import io from 'socket.io-client';
import PrivateSocket from 'private-socket';

export default class NetworkService {
  constructor() {
    this.privateSocket = new PrivateSocket(io('http://localhost:8080'));

    console.log('private socket');
  }

  send(data) {
    this.privateSocket.send(data);
  }
}
