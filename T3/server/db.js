const dbname = 'petshopt3';

var nano = require('nano')('http://localhost:5984');
nano.db.create(dbname);
var db = nano.db.use(dbname);

init = function(){

	nano.db.list(function(err, body) {
	  	// body is an array
	  	for(a in body){
	  		if(body[a] == dbname)
	  			return;
	  	}
	  	nano.db.create(dbname, function(err){
			if(err){
				console.log("db already exists");
				return;
			}
			createDesigns();
		});
	});
}

createDesigns = function(){
	// Creating views for earch document.
	// SCHEDULE
	var design_schedules ={
		"_id": "_design/schedule",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'schedule')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_schedules,function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});

	// CART
	var design_carts ={
		"_id": "_design/cart",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'cart')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_carts,function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});

	// SALES
	var design_sales ={
		"_id": "_design/sale",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'sale')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_sales,function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});

	// USERS
	var design_users ={
		"_id": "_design/user",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'user')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_users,function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});


	// PETS
	var design_pet ={
		"_id": "_design/pet",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'pet')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_pet,function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});


	// PRODUCTS
	var design_product ={
		"_id": "_design/product",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'product')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_product, function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});

	//SERVICES
	var design_service ={
		"_id": "_design/service",
		"views":{
		    "all":{
		      	"map": "function(doc){if(doc.type == 'service')emit(doc._id, doc);}"
		    }
		},
		"language": "javascript"
	};
	db.insert(design_service, function(err){
		if(err){
			console.log(err.message);
			return;
		}
	});

}

view = function(designName, viewName, callback){
	db.view(designName, viewName, callback);
}

init();
createDesigns();

module.exports = db;