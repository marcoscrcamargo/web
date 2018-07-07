Para a execução do servidor.

1. Iniciar o couchdb
	sudo systemctl start couchdb
2. Iniciar o servidor
	node server.js
3. Ser feliz. :)


Comando para post
	curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Marcos Camargo", "phone": "14997189943", "username": "marcoscrcamargo", "email": "marcoscrcamargo@gmail.com", "password": "admin", "admin": "true", "adress": "R. Carlos de Camargo Salles, 306 Apt. 2"}' http://127.0.0.1:4000/user


Controllers implementados:
* http://127.0.0.1:4000/user
* http://127.0.0.1:4000/cart
* http://127.0.0.1:4000/sale
* http://127.0.0.1:4000/schedule
* http://127.0.0.1:4000/pet
* http://127.0.0.1:4000/product
* http://127.0.0.1:4000/service