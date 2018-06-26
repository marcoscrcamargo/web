import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx'
import Database from './components/Database.js'
import DB from './components/DB.js'
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Main db={new Database()}/>,
	document.getElementById('root')
/*  <Main db={new DB()}/>,
  document.getElementById('root')*/
);

registerServiceWorker();
