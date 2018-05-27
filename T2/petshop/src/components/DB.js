import idb from 'idb';
import userData from './db_content/users.js'
import productData from './db_content/products.js'
import serviceData from './db_content/services.js'


// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const dbName = "petshopDB"

export default class DB {
	constructor(store) {
		this.state = {
			name: 'Name',
			data: [],
		};

		this.dbPromise = idb.open(dbName, 1, updateDB => {
			var objectStore = updateDB.createObjectStore('users', {
				keyPath: 'username'
			});

			// Create an index to search users by name.
			// Create an index to search customers by email and username that could be unique.
			objectStore.createIndex("name", "name", { unique: false });
			objectStore.createIndex("email", "email", { unique: true });
			objectStore.createIndex("username", "username", { unique: true });

			userData.map((item, index) => objectStore.add(item));

			// Key by id autoincrement = true
			objectStore = updateDB.createObjectStore('products', {
				keyPath: 'id',
				autoIncrement: true,
			});

			// Create an index to search users by name.
			objectStore.createIndex("name", "name", { unique: false });

			productData.map((item, index) => objectStore.add(item));

			objectStore = updateDB.createObjectStore('services', {
				keyPath: 'id',
				autoIncrement: true,
			});

			objectStore.createIndex("title", "title", { unique: false });

			serviceData.map((item, index) => objectStore.add(item));

			return objectStore;
		});

		this.getData = this.getData.bind(this);
		this.getAllData = this.getAllData.bind(this);
		this.setData = this.setData.bind(this);
		this.deleteData = this.deleteData.bind(this);
	}

	get(key) {
		// return this.dbPromise
		// 	.then(db =>
		// 		db
		// 			.transaction('tabs')
		// 			// .objectStore("tabs").index("email").get(key)).then(val =>  this.setState({ name: val.name}));
		// 			.objectStore('tabs')
		// 			.index('tabId')
		// 			.getAll(key),
		// 	)
		// 	.then(val => console.log(val));
	}

	getAll(name) {
		return this.dbPromise.then(db => {
			return db
			.transaction(name)
			.objectStore(name)
			.getAll();
		});
	}

	delete(key) {
		// return this.dbPromise.then(db => {
		// 	const tx = db.transaction('tabs', 'readwrite');
		// 	tx.objectStore('tabs').delete(key);
		// 	tx.objectStore('tabs').getAll();

		// 	return tx.complete;
		// });
	}

	set(val) {
		// return this.dbPromise.then(db => {
		// 	const tx = db.transaction('tabs', 'readwrite');
		// 	tx.objectStore('tabs').put(val);
		// 	tx.objectStore('tabs').getAll();
		// 	// .then(val => this.setState({data: val}));
		// 	return tx.complete;
		// });
	}

	getData() {
		// this.get('tab_1');
	}

	async getAllData(name) {
		return this.getAll(name);
	}


	setData() {
		// this.set({ tabId: 'tab_4', name: 'Event Four', checked: true });
	}

	deleteData() {
		// this.delete('Event Three');
	}
}