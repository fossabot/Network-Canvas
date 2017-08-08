import axios from 'axios';
import Promise from 'bluebird';
import { isCordova, isElectron } from './Environment';

const getProtocolFile = (path) => {
  if (isCordova()) {
    return new Promise((resolve, reject) => {
      window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, (fs) => {
        fs.root.getFile(
          window.toInternalURL(path),
          { create: true, exclusive: false },
          (fileEntry) => {
            fileEntry.file((file) => {
              const reader = new FileReader();
              reader.onloadend = function onLoadEnd() {
                resolve(this.result);
              };
              reader.readAsText(file);
            }, reject);
          },
          reject,
        );
      }, reject);
    });
  } else if (isElectron()) {
    const fs = window.require('fs');

    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  return Promise.reject('Environment not recognised');
};

const getProtocolWeb = url => axios({
  url,
  contentType: 'application/javascript',
});

const isUrl = (source) => {
  const anchor = document.createElement('a');
  anchor.href = source;
  return !!anchor.protocol;
};

const getProtocol = (source) => {
  if (!isUrl(source)) {
    return getProtocolFile(source);
  }
  return getProtocolWeb(source);
};

export default getProtocol;
