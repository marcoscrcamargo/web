// import idb from 'idb';
import Dexie from 'dexie';
import userData from './db_content/users.js'
import productData from './db_content/products.js'
import serviceData from './db_content/services.js'
import salesData from './db_content/sales.js'
import petsData from'./db_content/pets.js'


// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const dbName = "DexiePetshopDB"

export default class DB {
	constructor(){
		this.state = {};

		this.dbVersion = 1;

		this.db = new Dexie(dbName);
		// this.deleteDB();
		// this.db = new Dexie(dbName);

		// Creating schema for database
		this.db.version(this.dbVersion).stores({
		    products: '++id,name',
		    services: '++id,title',
		    users: 'username,&email,name,&username',
		    sales: '++id,price,date,username',
		    pets: '++id,name,username'
		});

		// Initializing DB atributes
		this.createDB = this.createDB.bind(this);
		this.getUser = this.getUser.bind(this);
		this.getProduct = this.getProduct.bind(this);
		this.getService = this.getService.bind(this);
		this.getAllProducts = this.getAllProducts.bind(this);
		this.getAllServices = this.getAllServices.bind(this);
		this.getAllUsers = this.getAllUsers.bind(this);
		this.getAllSales = this.getAllSales.bind(this);
		this.getUserPets = this.getUserPets.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.deletePet = this.deletePet.bind(this);
		this.putUser = this.putUser.bind(this);

		this.createDB();

		// admin info
		let admin = {
			name: 'Admin',
			phone: '00000000000',
			picture: require('../img/avatar.png'),
			pets: [
				{
					name: 'Marley',
					picture: require('../img/silhueta_cachorro.png')
				},
				{
					name: 'Tom',
					picture: require('../img/silhueta_gato.png')
				},
				{
					name: 'Piu Piu',
					picture: require('../img/silhueta_passaro.png')
				},
				{
					name: 'Nemo',
					picture: require('../img/silhueta_peixe.png')
				},
			],
			username: 'admin',
			email: 'admin@petshop.com',
			password: 'admin',
			admin: 'true',
			adress: 'Rua do admin'
		}
		// this.createDB();

		// inserting admin as a user in the DB
		this.db.transaction('rw', this.db.users, () =>{
			this.db.users.put(admin);
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

		this.db.transaction('rw', this.db.sales, () =>{
			salesData.map((sale, index) => this.db.sales.add(sale));
		});

		this.db.transaction('rw', this.db.pets, () =>{
			petsData.map((pet, index) => this.db.pets.add(pet));
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
	getPets(idx, key) {
		return this.db.pets.where(idx).equals(key).toArray();
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

	getAllSales(){
		return this.db.sales.toArray();
	}

	getUserPets(name){
		return this.db.pets.where('username').equals(name).toArray();
	}

	deleteUser(key) {
		this.db.users.delete(key);
	}

	deleteProduct(key) {
		this.db.products.delete(key);

	}

	deletePet(key) {
		this.db.pets.delete(key).then(a=> console.log('delete user sucess!'));
	}

	putUser(user) {
		this.db.users.put(user).then(a => console.log('new user sucess!'));
	}
	putPet(pet) {
		this.db.pets.put(pet).then(a => console.log('new pet sucess!'));
	}
}