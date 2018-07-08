import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx'
// import DB from './components/DB.js'
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

registerServiceWorker();
