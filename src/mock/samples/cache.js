/**
 * @url https://jsonplaceholder.typicode.com/cache
 * @method get
 * @header content-type: application/json
 * @status 200
 * @delay 100
 * @disable no
 */
const cacheWrapper = require('http-request-mock/plugin/cache.js');
const data = cacheWrapper('mock-cache', {
  id: 1,
  times: 0,
});
// The [data] will be memoried by localStorage.
// You can check it by localStorage.getItem('mock-cache').
module.exports = () => {
  data.times++;
  return data;
};
