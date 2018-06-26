import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx'
import DB from './components/DB.js'
import './index.css';

import registerServiceWorker from './registerServiceWorker';

function createDatabase(){

  var nano = require('nano')('http://localhost:5984');

  nano.db.get('petshop', function(err, body) {
    if (!err) {
      console.log("Database already exists");
    } else {
      nano.db.create('petshop');
      console.log("Created new database");
    }
  });

}

ReactDOM.render(
	<Main db={new DB()}/>,
	document.getElementById('root')
);
createDatabase();
registerServiceWorker();
