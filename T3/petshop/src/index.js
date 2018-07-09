import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx'
// import DB from './components/DB.js'
import './index.css';

import registerServiceWorker from './registerServiceWorker';

fetch('http://127.0.0.1:4000/user').then((response)=>{
	response.json().then((users)=>{
		if(users.length === 0){
			let admin = {
				name: "Admin",
				phone: "00000000000",
				username: "admin",
				email: "admin@petshop.com",
				password: "admin",
				admin: "true",
				adress: "no address"
			};
			fetch('http://127.0.0.1:4000/user', {
				headers: {
					'Content-type':'application/json'
				},
				method:'POST',
				body: JSON.stringify(admin)
			});
		}
	});
});

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

registerServiceWorker();
