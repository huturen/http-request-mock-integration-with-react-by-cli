/**
 * @url https://jsonplaceholder.typicode.com/remote
 * @remote https://jsonplaceholder.typicode.com/posts/1
 * @method get
 */
module.exports = function (remote) {
  console.log('remote response:', remote);
  return {
    code: 0,
    msg: 'ok',
    data: remote.responseJson
  };
};
