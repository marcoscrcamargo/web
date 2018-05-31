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

		this.createDB = this.createDB.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getProduct = this.getProduct.bind(this);
		this.getService = this.getService.bind(this);
		this.getAllProducts = this.getAllProducts.bind(this);
		this.getAllServices = this.getAllServices.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
		this.delete = this.delete.bind(this);
		this.putUser = this.putUser.bind(this);
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
		this.db.users.add(user).then(a => console.log('new user sucess!'));
	}
}