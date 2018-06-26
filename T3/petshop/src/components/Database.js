export default class Database {
	constructor(){
		this.nano = require('nano')('http://localhost:5984');

		this.nano.db.get('petshop', function(err, body) {
			if (!err) {
			  console.log("Database already exists");
			} else {
			  this.nano.db.create('petshop');
			  console.log("Created new database");
			}
		});
	
		this.createDB();

	}

}