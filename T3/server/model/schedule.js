const db = require('../db');
const counter = require('../counter');

/*
	Schedule:
	- name
	- username
	- pet
	- picture
	- price
	- description
	- date
	- type = 'schedule'

*/

let all = function(callback){
	db.view("schedule", "all", (err, body, header)=>{
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

let create = function(schedule, callback){
	console.log(schedule)
	if(!schedule.name || !schedule.username || !schedule.pet || !schedule.price || !schedule.description || !schedule.date){
		callback("schedule must have all atributtes");
		return;
	}

	counter.get("schedule", function(n){
		let tmp = {
			name:schedule.name,
			username:schedule.username,
			pet:schedule.pet,
			price:schedule.price,
			description:schedule.description,
			date:schedule.date,
			img_file:schedule.img_file,
			type:'schedule',
			chave:n,
			_id:n + "_schedule"
		}
		db.insert(tmp, (err, body, header)=>{
			callback(err);
			console.log(err, body, header);
		});
	});
}

let update = function(schedule, callback){
	console.log(schedule);
	db.get(schedule.id, (err, body)=>{
		if(err){
			callback(err);
			return;
		}
		if(!body._rev){
			callback("not found");
			return;
		}

		// posiciona novos atributos
		for(i in Object.keys(schedule.value)){
			if(Object.keys(schedule.value)[i] != "id"){
				if(!Object.keys(body).includes(Object.keys(schedule.value)[i])) {
					callback("atributte not found!");
					return;
				}
				body[Object.keys(schedule.value)[i]] = schedule.value[Object.keys(schedule.value)[i]]
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