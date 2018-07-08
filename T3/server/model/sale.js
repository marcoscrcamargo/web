const db = require('../db');
const counter = require('../counter');

/*
	Sales:
	- name
	- username
	- picture
	- price
	- quantity
	- id
	- type = 'sale'
*/

let all = function(callback){
	db.view("sale", "all", (err, body, header)=>{
		if(err){
			callback("view error", null);
			return
		}
		callback(null, body.rows);
	});
}

let one = function(id, callback){
	db.get(id, function(err, body, header) {
	    if(err) {
	      return callback(err);
	    }
	    callback(null, body);
  	});
}

let create = function(sale, callback){
	console.log(sale)
	if(!sale.name || !sale.username || !sale.price || !sale.quantity || !sale.id){
		callback("sale must have all atributtes");
		return;
	}

	counter.get("sale", function(n){
		let tmp = {
			name:sale.name,
			username:sale.username,
			price:sale.price,
			quantity:sale.quantity,
			id:sale.id,
			type:'sale',
			chave:n,
			_id:n + "_sale"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err, body, header);
		});
	});
}

let update = function(sale, callback){
	console.log(sale);
	db.get(sale.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(sale.value)){
			if(Object.keys(sale.value)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(sale.value)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(sale.value)[i]] = sale.value[Object.keys(sale.value)[i]]
			}
		}

		db.insert(body,(err, body, header)=>{
			if(err) console.log("err 2")
			callback(err);
		});
	})
}




let erase = function(id, callback){
	db.get(id, function(err, body, header) {
	    if(err) {
	      return callback(err);
	    }
	    db.destroy(id, body._rev, function(err, body, header) {
	      if(err) {
	        return callback(err);
	      }
	      return callback(err);
	    });
  	});
}

module.exports = {all, create, erase, update}