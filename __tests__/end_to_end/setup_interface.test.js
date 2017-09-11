/* eslint-env jest */
/* eslint-disable no-var */
/* global jasmine */

const { browser, config } = require('../__helpers__/setup');
const { start } = require('../__helpers__/navigation');

const remote = browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

beforeAll((done) => {
  browser.on('status', (info) => {
    console.log(info);
  });
  browser.on('command', (eventType, command, response) => {
    console.log(eventType, command, response);
  });
  browser.on('http', (meth, path, data) => {
    console.log(meth, path, data);
  });

  remote
    .init(config.chrome)
    .nodeify(done);
});

afterAll((done) => {
  remote
    .quit()
    .nodeify(done);
});

beforeEach((done) => {
  start({ remote })
    .nodeify(done);
});

describe('Setup screen', () => {
  it('Load demo protocol', done =>
    remote
      .elementById('load-demo-protocol')
      .click()
      .sleep(3000) // Wait for transition
      .hasElementByCssSelector('.protocol')
      .then(hasElement => expect(hasElement).toBe(true))
      .nodeify(done),
  );

  it('Load external protocol', done =>
    remote
      .elementByName('protocol_url')
      .sendKeys('https://raw.githubusercontent.com/codaco/Network-Canvas-example-protocols/master/example.protocol.js')
      .elementByCssSelector('.setup__custom-protocol button[type=submit]')
      .click()
      .nodeify(done),
  );
});
