/**
 * @url https://jsonplaceholder.typicode.com/proxy-mode
 * @proxy
 * @header content-type: application/json
 * @method get
 */
module.exports = () => {
  return {
    msg: 'Proxy to local proxy server.',
  };
}

