import axios from 'axios';
import xhrAdapter from 'axios/lib/adapters/xhr';
import HttpRequestMock from 'http-request-mock';
const mocker = HttpRequestMock.setupForUnitTest('xhr');

axios.defaults.adapter = xhrAdapter;
it('use', async () => {
  mocker.use('./mock/samples/dynamic.js');
  const res = await axios.get('https://jsonplaceholder.typicode.com/dynamic');
  expect(res.data.msg).toBe('ok');
});
