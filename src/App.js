import { useEffect } from 'react';
import Highlight from 'react-highlight'
import axios from 'axios'
import { stateProxy } from 'react-state-proxy';
import './App.css';

/* eslint-disable import/no-webpack-loader-syntax */
const urls =  {
  'https://jsonplaceholder.typicode.com/dynamic': require('!!raw-loader!./mock/samples/dynamic.js').default,
  'https://jsonplaceholder.typicode.com/static': require('!!raw-loader!./mock/samples/static.js').default,
  'https://jsonplaceholder.typicode.com/delay': require('!!raw-loader!./mock/samples/delay.js').default,
  'https://jsonplaceholder.typicode.com/faker': require('!!raw-loader!./mock/samples/faker.js').default,
  'https://jsonplaceholder.typicode.com/times': require('!!raw-loader!./mock/samples/times.js').default,
  'https://jsonplaceholder.typicode.com/404': require('!!raw-loader!./mock/samples/notfound.js').default,
  'https://jsonplaceholder.typicode.com/photos/1?bypass=1': require('!!raw-loader!./mock/samples/bypass.js').default,
  'https://jsonplaceholder.typicode.com/photos/1?bypass=2': require('!!raw-loader!./mock/samples/bypass.js').default,
  'https://jsonplaceholder.typicode.com/header': require('!!raw-loader!./mock/samples/header.js').default,
  'https://jsonplaceholder.typicode.com/request-info?a=1': require('!!raw-loader!./mock/samples/request.js').default,
  'https://jsonplaceholder.typicode.com/cache': require('!!raw-loader!./mock/samples/cache.js').default,
};

function App() {
  const state = stateProxy({
    url: 'https://jsonplaceholder.typicode.com/dynamic',
    btnText: 'Request',
    codes: '',
    spent: '',
    responseHeaders: '',
    responseBody: '',
    onUrlChange(event) {
      this.url = event ? event.target.value : this.url;
      this.codes = urls[this.url];
      this.doRequest();
    },
    doRequest() {
      this.btnText = 'Loading...';
      const now = Date.now();
      axios.get(this.url).then(res => {
        this.spent = Date.now() - now;
        this.responseBody = JSON.stringify(res.data, null, 2);
        this.responseHeaders = JSON.stringify(res.headers, null, 2);
        this.btnText = 'Request';
      }).catch(err => {
        this.spent = Date.now() - now;
        this.responseBody = err.message;
        this.responseHeaders = '-';
        this.btnText = 'Request';
        console.log('error:', err);
      });
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { state.onUrlChange(); }, []);

  return (
    <div className="hello">
      <h5>http-request-mock: Integration with reactjs</h5>
      <div className="request">
        <div>
          URL: <select onChange={state.onUrlChange}>
              {
                Object.keys(urls).map((url) => {
                  return <option value={url} key={url}>{url}</option>
                })
              }
            </select>
            <button onClick={state.doRequest}>{state.btnText}</button>
        </div>
        <div className="codes">
          <Highlight language="javascript">{state.codes}</Highlight>
        </div>

        <div className="separator"></div>
        <div><b>Spent</b>: {state.spent}</div>
        <div><b>Response Headers</b>: {state.responseHeaders}</div>
        <div className="codes"><Highlight language="json">{state.responseBody}</Highlight></div>
      </div>
      <div>Hit F12 to access Developer Tools and view the console logs.</div>
    </div>
  );
}

export default App;
