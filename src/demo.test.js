// eslint-disable-next-line no-redeclare
/* global it, expect */
import axios from 'axios';
import xhrAdapter from 'axios/lib/adapters/xhr';
import HttpRequestMock from 'http-request-mock';

axios.defaults.adapter = xhrAdapter;
const mocker = HttpRequestMock.setupForUnitTest('xhr');

mocker.get('https://your.api.com/path', function() {
  return { abc: 123 };
});

it('should match object`', async () => {
  const res = await axios.get('https://your.api.com/path');
  expect(res.data).toMatchObject({abc: 123});
});
