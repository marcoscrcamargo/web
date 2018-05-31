import idb from 'idb';
import userData from './db_content/users.js'
import productData from './db_content/products.js'
import serviceData from './db_content/services.js'


// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const dbName = "petshopDB3"

export default class DB {

	constructor(store) {
		this.state = {
			name: 'Name',
			data: [],
		};
		this.dbVersion = 1;

		this.dbPromise = idb.open(dbName, this.dbVersion, updateDB => {
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
		this.insert = this.insert.bind(this);
		this.get = this.get.bind(this);
		this.set = this.set.bind(this);
	}

	get(table, idx, key) {
		return this.dbPromise.then(db => {
				return db
					.transaction(table)
					.objectStore(table)
					.index(idx)
					.get(key);
			});
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
		this.dbVersion = this.dbVersion + 1;
		this.dbPromise = idb.open(dbName, this.dbVersion, updateDB => {
			console.log(updateDB)
			// .transaction(['users'], 'readwrite')
			// .objectStore('users').put(val);
		});
	}


	addUser(user) {
		this.dbPromise.then(db => {
			var trans = db.transaction(['users'], "readwrite");
			var store = trans.objectStore("users");
			var request = store.put(user);
			store.getAll().then((a)=> { console.log(a)});
				console.log("Sucess Adding an item: ");
			request.onsuccess = function(e) {
		    };
		    request.onerror = function(e) {
				console.log("Error Adding an item: ", e);
		    };

		});
	}

	insert(table, obj){
		this.dbPromise.then(db => {
			db
			.transaction(table, 'readwrite')
			.objectStore(table)
			.add(obj);
		});

	}

	async getData(table, idx, key) {
		return this.get(table, idx, key);
	}

	async getAllData(table) {
		return this.getAll(table);
	}


	setData() {
		// this.set({ tabId: 'tab_4', name: 'Event Four', checked: true });
	}

	deleteData() {
		// this.delete('Event Three');
	}
}