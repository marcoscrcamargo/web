const db = require('../db');
const counter = require('../counter');

/*
	Cart:
	- username
	- productId
	- name
	- picture
	- description
	- price
	- quantity
	- type = 'cart'

*/

let all = function(callback){
	db.view("cart", "all", (err, body, header)=>{
		if(err){
			callback("view error", null);
			return
		}
		callback(null, body.rows);
	});
}

let create = function(cart, callback){
	console.log(cart)
	if(!cart.username || !cart.productId || !cart.name || !cart.description || !cart.price || !cart.quantity){
		callback("cart must have all atributtes");
		return;
	}

	counter.get("cart", function(n){
		let tmp = {
			username:cart.username,
			productId:cart.productId,
			name:cart.name,
			description:cart.description,
			price:cart.price,
			quantity:cart.quantity,
			type:'cart',
			chave:n,
			_id:n + "_cart"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err, body, header);
		});
	});

}

let update = function(cart, callback){
	console.log(cart);
	db.get(cart.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(cart)){
			console.log(i);
			if(Object.keys(cart)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(cart)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(cart)[i]] = cart[Object.keys(cart)[i]]
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