import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.js'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);
registerServiceWorker();
