var nano = require('nano')('http://localhost:5984');
nano.db.create('petshopt3');
var db = nano.db.use('petshopt3');

var init = function(){
	var counter ={
		_id:"counter",
		user:0,
		pet:0,
		product:0,
		services:0
	};
	db.insert(counter, function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});
}

var inc = function(type){
	db.get("counter", (err, body)=>{
		let older = body[type];
		body[type] = body[type] + 1;
		db.insert(body,(err, body, header)=>{
			if(err) console.log("nao conseguiu adicionar item ao contador")
		});
	});
}


var get = function(type, callback){
	db.get("counter", (err, body)=>{
		inc(type);
		console.log(body)
		callback(body[type]);
	});
}


init();

module.exports = {init, get}