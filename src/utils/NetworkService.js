/* eslint-disable */
import io from 'socket.io-client';
import { JSEncrypt } from 'jsencrypt';
import forge from 'node-forge';

const pki = forge.pki;


export default class NetworkService {
  constructor() {
    this.state = {
      connected: false,
      serverKey: null,
    };

    const socket = io('http://localhost:8080');
    this.socket = socket;

    socket.on('connect', () => {
      console.log('connect');
      this.state.connected = true;
      this.test();
    });
    socket.on('connect_error', (error) => {
      console.log('connect error', error);
    });
    socket.on('connect_timeout', (error) => {
      console.log('connect timeout', error);
    });

    socket.on('key', (data) => {
      console.log('key', data);
      // this.state.serverKey = data;
      this.state.serverKey = pki.publicKeyFromPem(data);
      this.test();
    });

    this.socket = socket;
  }

  test() {
    const { serverKey, connected } = this.state;

    if (serverKey && connected) {
      const message = 'Hello world';
      const encrypted = this.state.serverKey.encrypt('My super secret message, please don\'t read it');
      console.log('send message', encrypted);
      this.socket.emit('data', encrypted, (data) => {
        console.log(data); // data will be 'woot'
      });
    }
  }
}
