const db = require('../db');
const counter = require('../counter');

/*
	User:
    - name
    - phone
    - picture
    - username
    - email
    - password
    - admin
    - adress
	- type
*/

let all = function(callback){
	db.view("user", "all", (err, body, header)=>{
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

let create = function(user, callback){
	console.log(user)
	if(!user.name|| !user.phone || !user.username || !user.email || !user.password || !user.admin || !user.adress){
		callback("user must have all atributtes");
		return;
	}

	counter.get("user", function(n){
		let tmp = {
			name:user.name,
			picture:user.picture,
			phone:user.phone,
			username:user.username,
			email:user.email,
			password:user.password,
			admin:user.admin,
			adress:user.adress,
			type:'user',
			chave:n,
			_id:n + "_user"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err, body, header);
		});
	});

}

let update = function(user, callback){
	console.log(user);
	db.get(user.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(user)){
			console.log(i);
			if(Object.keys(user)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(user)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(user)[i]] = user[Object.keys(user)[i]]
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

module.exports = {all, one, create, erase, update}