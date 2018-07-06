const db = require('../db');
const counter = require('../counter');


/*
	Product:
	- name
	- description
	- price
	- type = 'product'

*/

let all = function(callback){
	db.view("product", "all", (err, body, header)=>{
		if(err){
			callback("view error", null);
			return
		}
		callback(null, body.rows);
	});
}

let create = function(product, callback){
	console.log(product)
	if(!product.description|| !product.name || !product.price){
		callback("product must have all atributtes");
		return;
	}

	counter.get("product", function(n){
		let tmp = {
			name:product.name,
			description:product.description,
			price:product.price,
			type:'product',
			chave:n,
			_id:n + "_product"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err,body,header);
		});
	});

}

let update = function(product, callback){
	console.log(product);
	db.get(product.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(product)){
			console.log(i);
			if(Object.keys(product)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(product)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(product)[i]] = product[Object.keys(product)[i]]
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