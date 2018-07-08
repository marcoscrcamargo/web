const db = require('../db');
const counter = require('../counter');

/*
	Pet:
	- name
	- breed
	- age
	- picture
	- username
	- type = 'pet'

*/

let all = function(callback){
	db.view("pet", "all", (err, body, header)=>{
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


let create = function(pet, callback){
	console.log(pet)
	if(!pet.name || !pet.username|| !pet.breed || !pet.age){
		callback("pet must have all atributtes");
		return;
	}

	counter.get("pet", function(n){
		let tmp = {
			name:pet.name,
			breed:pet.breed,
			age:pet.age,
			picture:pet.picture,
			username:pet.username,
			type:'pet',
			chave:n,
			_id:n + "_pet"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err, body, header);
		});
	});
}

let update = function(pet, callback){
	console.log(pet);
	db.get(pet.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(pet)){
			console.log(i);
			if(Object.keys(pet)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(pet)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(pet)[i]] = pet[Object.keys(pet)[i]]
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