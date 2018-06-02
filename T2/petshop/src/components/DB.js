// import idb from 'idb';
import Dexie from 'dexie';
import userData from './db_content/users.js'
import productData from './db_content/products.js'
import serviceData from './db_content/services.js'


// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const dbName = "DexiePetshopDB"

export default class DB {
	constructor(){
		this.state = {};

		this.dbVersion = 1;

		this.db = new Dexie(dbName);

		// Creating schema for database
		this.db.version(this.dbVersion).stores({
		    products: '++id,name',
		    services: '++id,title',
		    users: 'username,&email,name,&username'
		});

		// Initializing DB atributes
		this.createDB = this.createDB.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getProduct = this.getProduct.bind(this);
		this.getService = this.getService.bind(this);
		this.getAllProducts = this.getAllProducts.bind(this);
		this.getAllServices = this.getAllServices.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
		this.delete = this.delete.bind(this);
		this.putUser = this.putUser.bind(this);

		// admin info
		let admin = {
			name: 'Admin',
			phone: '00000000000',
			picture: require('../img/avatar.png'),
			pets: [
				{
					name: 'Marley',
					picture: require('../img/cachorro.jpg')
				},
				{
					name: 'Tom',
					picture: require('../img/gato.jpg')
				},
				{
					name: 'Piu Piu',
					picture: require('../img/passaro.jpg')
				},
				{
					name: 'Nemo',
					picture: require('../img/peixe.jpg')
				},
			],
			username: 'admin',
			email: 'admin@petshop.com',
			password: 'admin',
			admin: 'true',
			adress: 'Rua do admin'
		}

	// just a normal user
	let sample_user = {
			name: 'User',
			phone: '00000000000',
			picture: require('../img/avatar.png'),
			pets: [
				{
					name: 'Marley',
					picture: require('../img/cachorro.jpg')
				},
				{
					name: 'Tom',
					picture: require('../img/gato.jpg')
				},
				{
					name: 'Piu Piu',
					picture: require('../img/passaro.jpg')
				},
				{
					name: 'Nemo',
					picture: require('../img/peixe.jpg')
				},
			],
			username: 'user',
			email: 'user@gmail.com',
			password: 'user',
			admin: 'false',
			adress: 'Rua do usuario'
		}

		// inserting admin as a user in the DB
		this.db.transaction('rw', this.db.users, () =>{
			this.db.users.put(admin);
		}).catch(e => console.error(e.stack));

		// iserting the sample_user as a user in the DB
		this.db.transaction('rw', this.db.users, () =>{
			this.db.users.put(sample_user);
		}).catch(e => console.error(e.stack));

	}

	createDB(){
		this.db.transaction('rw', this.db.users, () =>{
			userData.map((user, index) => this.db.users.add(user));
		}).catch(e => console.error(e.stack));

		this.db.transaction('rw', this.db.products, () =>{
			productData.map((product, index) => this.db.products.add(product));
		});

		this.db.transaction('rw', this.db.services, () =>{
			serviceData.map((service, index) => this.db.services.add(service));
		});

	}

	deleteDB(){
		this.db.delete().then(() => {
			console.log("Database successfully deleted");
		}).catch((err) => {
			console.error("Could not delete database");
		});
	}

	getUser(idx, key) {
		return this.db.users.where(idx).equals(key).first();
	}

	getProduct(id) {
		return this.db.products.get(id);
	}

	getService(id) {
		return this.db.services.get(id);
	}

	getAllProducts() {
		return this.db.products.toArray();
	}

	getAllServices() {
		return this.db.services.toArray();
	}

	getAllUsers() {
		return this.db.users.toArray();
	}


	delete(key) {

	}

	putUser(user) {
		this.db.users.put(user).then(a => console.log('new user sucess!'));
	}
}