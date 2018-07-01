import userData from './db_content/users.js'
import productData from './db_content/products.js'
import serviceData from './db_content/services.js'
import salesData from './db_content/sales.js'
import petsData from'./db_content/pets.js'
import scheduleData from'./db_content/schedule.js'

export default class Database {
	constructor(){
		this.nano = require('nano')('http://127.0.0.1:5984');

		this.nano.db.get('petshop', function(err, body) {
			if (!err) {
			  console.log("Database already exists");
			} else {
				var nano = require('nano')('http://127.0.0.1:5984');
				nano.db.create('petshop');
				var petshop = nano.use('petshop');

				// Not working
				userData.map(user => {
					petshop.insert(user, function(err, body) {
					});				
				});

				productData.map(product => {
					petshop.insert(product, function(err, body) {
					});				
				});
				
				serviceData.map(service => {
					petshop.insert(service, function(err, body) {
					});				
				});
				
				salesData.map(sales => {
					petshop.insert(sales, function(err, body) {
					});				
				});
				
				petsData.map(pets => {
					petshop.insert(pets, function(err, body) {
					});				
				});

				scheduleData.map(schedule => {
					petshop.insert(schedule, function(err, body) {
					});				
				});

			}
		});

		this.petshop = this.nano.use('petshop');

	}
}