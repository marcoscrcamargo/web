import userData from './db_content/users.js'
import productData from './db_content/products.js'
import serviceData from './db_content/services.js'
import salesData from './db_content/sales.js'
import petsData from'./db_content/pets.js'
import scheduleData from'./db_content/schedule.js'

export default class Database {
	constructor(){
		this.nano = require('nano')('http://127.0.0.1:5984');
		this.createDB = this.createDB.bind(this);

		this.nano.db.get('petshop', function(err, body) {
			if (!err) {
			  console.log("Database already exists");
			} else {
				this.createDB();
				console.log("Created new database");
			}
		});
	
		this.petshop = this.nano.use('petshop');

	}

	createDB(){
		this.nano.db.create('petshop');

		userData.map(user => {
			this.petshop.insert(user, function(err, body) {
			});				
		});

		productData.map(product => {
			this.petshop.insert(product, function(err, body) {
			});				
		});
		
		serviceData.map(service => {
			this.petshop.insert(service, function(err, body) {
			});				
		});
		
		salesData.map(sales => {
			this.petshop.insert(sales, function(err, body) {
			});				
		});
		
		petsData.map(pets => {
			this.petshop.insert(pets, function(err, body) {
			});				
		});

		scheduleData.map(schedule => {
			this.petshop.insert(schedule, function(err, body) {
			});				
		});
	}
}