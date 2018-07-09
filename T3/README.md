Victor Forbes - 9293394
Marcos Camargo - 9278045
Gabriel Camargo - 9293456
Letícia Sakurai - 9278010

Repositório do github: https://github.com/marcoscrcamargo/web

O projeto foi feito utilizando react e react-materialize. Para rodar o servidor do site é necessário utilizar o npm. O index.html está dentro da pasta "public/" (e dentro da "build/").

Na pasta petshop rodar os comandos:
	npm install

	npm start

É possível também rodar a aplicação usando "serve -s build"

O projeto contém os arquivos:
	petshop:
	src:
		- index.css
		- index.js
		- registerServiceWorker.js
		components:
			- Admin.jsx
			- Cart.jsx
			- ForgotPassword.jsx
			- Header.jsx
			- Home.jsx
			- Login.jsx
			- Main.jsx
			- Pets.jsx
			- Products.jsx
			- ProductsManagement.jsx
			- Profile.jsx
			- SalesManagement.jsx
			- Schedule.jsx
			- Services.jsx
			- ServicesManagement.jsx
			- Signup.jsx
	public:
		- index.html
		- manifest.json

server:
	- counter.js
	- db.js
	- server.js
	- package.json
	controller:
		- cart_controller.js
		- pet_controller.js
		- product_controller.js
		- sale_controller.js
		- schedule_controller.js
		- service_controller.js
		- user_controller.js
	model:
		- cart.js
		- pet.js
		- product.js
		- sale.js
		- schedule.js
		- service.js
		- user.js

Roteiro para teste do site:

	- Deslogado:

		- Tentar comprar um produto na aba Products (notar que aparecerá um aviso pedindo para logar antes).
		
		- Tentar agendar um serviço na aba Services (notar que aparecerá um aviso pedindo para logar antes).
		
		- Criar usuário (opção signup logo abaixo do campo "Username" no canto superior direito da página).
		
	- Logar com o usuário criado (canto superior direito da página):

		- Adicionar produtos ao carrinho, mudando as quantidades do mesmo produto adicionadas de uma vez (ir na aba products e clicar no botão "Buy" do produto desejado e escolher a quantidade desejada).
		
		- Cadastrar animais (aba profile, sub-aba pets, clicar em "new pet").
		
		- Agendar serviços para os animais cadastrados (aba Services, clicar no botão "Schedule" do serviço desejado, escolher data e hora).
		
		- Ir para a aba Profile e vizualizar o carrinho de produtos e os serviços agendados.
		
		- Remover alguns produtos do carrinho (clicando no botão delete ao lado do produto desejado).
		
		- "Comprar" os produtos do carrinho (clicando em Checkout, inserindo informações de pagamento e depois clicando em Pay).
		
		- Remover alguns serviços da agenda (clicando no botão "Details" ao lado do serviço desejado e depois em "Delete").
		
		- Remover alguns animais (clicando no botão "Details" ao lado do animal desejado e depois em "Delete").
		
		- Deslogar (clicando no botão Logout no canto superior direito).
		
	- Logar com a conta Username: admin / Password: admin.
	
		- Ver os usuários cadastrados e transformá-los em admin/não-admin pela checkbox dentro de Details (na aba Management, sub-aba Users).
		
		- Adicionar novos produtos no banco de dados (na aba Management, sub-aba Products, "New Product").
		
		- Editar e/ou deletar produtos criados.
		
		- Adicionar novos serviços no banco de dados (na aba Management, sub-aba Services, "New Service").
		
		- Editar e/ou deletar serviços criados.
		
		- Verificar as transações efetuadas (na aba Management, sub-aba Services).
		
