Para a execução do servidor.

1. Iniciar o couchdb
	sudo systemctl start couchdb
2. Iniciar o servidor
	node server.js
3. Ser feliz. :)


Comando para post

Cria um usuário administrador

	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Admin", "phone": "00000000000", "username": "admin", "email": "admin@petshop.com", "password": "admin", "admin": "true", "adress": "adminlandia numero zero"}' http://127.0.0.1:4000/user

Criando um pet pro admin

	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Dereguejhonson", "breed": "XQDELE","age":"69", "username": "admin"}' http://127.0.0.1:4000/pet

Criando um schedule pro pet do admin

	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "banho", "username": "admin", "pet":"Dereguejhonson", "description":"lava seu animalzinho bem top confia", "date":"12 June, 2018 05:00PM",  "price":"666.66"}' http://127.0.0.1:4000/schedule

Criando um item no cart do admin

	curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "admin", "productId": "1",  "name":"COMIDA PRO DEREGUEJHENX", "description":"ai é bom meu bom, custa só 5 dol", "price":"5.00",  "quantity":"66"}' http://127.0.0.1:4000/cart


	- name
	- username
	- pet
	- picture
	- id
	- description
	- date
	- type = 'schedule'


Controllers implementados:
* http://127.0.0.1:4000/user
* http://127.0.0.1:4000/cart
* http://127.0.0.1:4000/sale
* http://127.0.0.1:4000/schedule
* http://127.0.0.1:4000/pet
* http://127.0.0.1:4000/product
* http://127.0.0.1:4000/service