const db = require('../db');
const counter = require('../counter');

/*
	Service:
	- title
	- description
	- price
	- type = 'service'

*/

let all = function(callback){
	db.view("service", "all", (err, body, header)=>{
		if(err){
			callback("view error", null);
			return
		}
		callback(null, body.rows);
	});
}

let create = function(service, callback){
	console.log(service)
	if(!service.description|| !service.title || !service.price){
		callback("service must have all atributtes");
		return;
	}

	counter.get("service", function(n){
		let tmp = {
			title:service.title,
			description:service.description,
			price:service.price,
			type:'service',
			chave:n,
			_id:n + "_service"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err, body, header);
		});
	});

}

let update = function(service, callback){
	console.log(service);
	db.get(service.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(service)){
			console.log(i);
			if(Object.keys(service)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(service)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(service)[i]] = service[Object.keys(service)[i]]
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