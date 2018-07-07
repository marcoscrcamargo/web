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
	//Definicao Das Pesquisas para cada modelo
	//ADMINSTRADORES
	// var design_administradores ={
	// 	"views":{
	// 	    "all":{
	// 	      	"map": "function(doc){if(doc.tipo == 'administrador')emit(doc._id, doc);}"
	// 	    }
	// 	},
	// 	"language": "javascript"
	// };
	// db.insert(design_administradores,function(err){
	// 	if(err){
	// 		console.log(err.message);
	// 		return;
	// 	}
	// });


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

/*
	CREATES
*/
// createAdministrador = function(id,nome,telefone){
// 	//TODO criar verificacaos para ID NOME E Outros
// 	var novo_adm = 
// 	{
// 		_id: id,
// 		nome: nome,
// 		telefone: telefone,
// 		tipo: "administrador"
// 	};
// 	db.insert(novo_adm,function(err,body,header){
// 		if(err){
// 			console.log("erro em inserir novo adm:", err.message);
// 			return;
// 		}
// 		console.log("novo adm inserido");
// 	});
// }

// createCliente = function(id,nome,telefone){
// 	//TODO criar verificacaos para ID NOME E Outros
// 	var novo_cliente = 
// 	{
// 		_id: id,
// 		nome: nome,
// 		telefone: telefone,
// 		tipo: "cliente"
// 	};
// 	db.insert(novo_cliente,function(err,body,header){
// 		if(err){
// 			console.log("erro em inserir novo cliente:", err.message);
// 			return;
// 		}
// 		console.log("novo cliente inserido");
// 	});
// }

// createAnimal = function(id,cliente_id,nome,raca){
// 	//TODO criar verificacaos para ID NOME E Outros
// 	var novo_animal = 
// 	{
// 		_id: id,
// 		cliente_id: cliente_id,
// 		nome: nome,
// 		raca: raca,
// 		tipo: "animal"
// 	};
// 	db.insert(novo_animal,function(err,body,header){
// 		if(err){
// 			console.log("erro em inserir novo animal:", err.message);
// 			return;
// 		}
// 		console.log("novo animal inserido");
// 	});
// }

// createProduCT = function(id, name, description, price){
// 	//TODO criar verificacaos para ID NOME E Outros
// 	var new_product =
// 	{
// 		_id: id,
// 		name: name,
// 		description: description,
// 		price: price,
// 		type: "product"
// 	};

// 	db.insert(new_product,function(err, body, header){
// 		if(err){
// 			console.log("insert new product error:", err.message);
// 			return;
// 		}
// 		console.log("new product inserted");
// 	});
// }

// createServico = function(id,nome,descricao,preco){
// 	//TODO criar verificacaos para ID NOME E Outros
// 	var novo_servico =
// 	{
// 		_id: id,
// 		nome: nome,
// 		descricao: descricao,
// 		preco: preco,
// 		tipo: "servico"
// 	};
// 	db.insert(novo_servico,function(err,body,header){
// 		if(err){
// 			console.log("erro em inserir novo Servico:", err.message);
// 			return;
// 		}
// 		console.log("novo Servico inserido");
// 	});
// }


/*
	CREATES
*/

view = function(designName, viewName, callback){
	db.view(designName, viewName, callback);
}

init();
createDesigns();

module.exports = db;