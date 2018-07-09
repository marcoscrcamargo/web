## Integrantes

* Victor Forbes - 9293394
* Marcos Camargo - 9278045
* Gabriel Camargo - 9293456
* Letícia Sakurai - 9278010

## Instruções de uso

Repositório do github: https://github.com/marcoscrcamargo/web

O projeto foi feito utilizando react e react-materialize. Para rodar o servidor do site é necessário utilizar o npm. O index.html está dentro da pasta "/petshop/public/" (e dentro da "/petshop/build/").

Para iniciar o DB você deve ir na pasta server e rodar os comandos:
	
	sudo service couchdb start
	
	node server.js

Então você deve ir na pasta petshop e rodar os comandos:

	npm install

	npm start

É possível também rodar a aplicação usando "serve -s build"

O projeto contém os arquivos:

* petshop:
	* src:
		* index.css
		* index.js
		* registerServiceWorker.js
		* components:
			* Main.jsx: Componente principal, realiza as chamadas para os outros componentes.
			* Admin.jsx: Página de administrador, onde é possivel ver e editar os usuários, produtos, serviços e as vendas.
			* Cart.jsx: Página com o carrinho de compras.
			* ForgotPassword.jsx: Página de "Esqueceu a Senha".
			* Header.jsx: Componente do Header da página.
			* Home.jsx
			* Login.jsx: Página de Login (utilizada na navbar em mobile).
			* Pets.jsx: Sub-aba da página Profile com os pets do usuário.
			* Schedule.jsx: Sub-aba da página Profile com a agenda do usuário.
			* ProductsManagement.jsx: Sub-aba da página Management com os produtos.
			* SalesManagement.jsx: Sub-aba da página Management com as vendas.
			* ServicesManagement.jsx: Sub-aba da página Management com os serviços.
			* Profile.jsx: Página principal do usuário, onde é possivel ver o profile, editar os pets, ver o carrinho e os horários agendados.
			* Services.jsx: Página para exibição dos serviços.
			* Products.jsx: Página para exibição dos produtos.
			* Signup.jsx: Página para criar novo usuário.
	* public:
		* index.html
		* manifest.json

* server:
	* counter.js: conta a quantidade dos itens do banco de dados (usado para gerar os ids únicos)
	* db.js: cria a estrutura do banco de dados usando nano e também cria as views
	* server.js: estrutura principal do servidor back-end, onde é configurada a API REST
	* controller
		* cart_controller.js: redireciona os requests da url localhost:4000/cart
		* pet_controller.js: redireciona os requests da url localhost:4000/pet
		* product_controller.js: redireciona os requests da url localhost:4000/product
		* sale_controller.js: redireciona os requests da url localhost:4000/sale
		* schedule_controller.js: redireciona os requests da url localhost:4000/schedule
		* service_controller.js: redireciona os requests da url localhost:4000/service
		* user_controller.js: redireciona os requests da url localhost:4000/user
	* model:
		* cart.js: define a estrutura do cart no banco de dados
		* pet.js: define a estrutura do pet no banco de dados
		* product.js: define a estrutura do product no banco de dados
		* sale.js: define a estrutura da sale no banco de dados
		* schedule.js: define a estrutura do schedule no banco de dados
		* service.js: define a estrutura do service no banco de dados
		* user.js: define a estrutura do user no banco de dados

## Roteiro para teste do site:

* Deslogado:
	* Tentar comprar um produto na aba Products (notar que aparecerá um aviso pedindo para logar antes).
	* Tentar agendar um serviço na aba Services (notar que aparecerá um aviso pedindo para logar antes).
	* Criar usuário (opção signup logo abaixo do campo "Username" no canto superior direito da página).
* Logar com o usuário criado (canto superior direito da página):
	* Adicionar produtos ao carrinho, mudando as quantidades do mesmo produto adicionadas de uma vez (ir na aba products e clicar no botão "Buy" do produto desejado e escolher a quantidade desejada).
	* Cadastrar animais (aba profile, sub-aba pets, clicar em "new pet").
	* Agendar serviços para os animais cadastrados (aba Services, clicar no botão "Schedule" do serviço desejado, escolher data e hora).
	* Ir para a aba Profile e vizualizar o carrinho de produtos e os serviços agendados.
	* Remover alguns produtos do carrinho (clicando no botão delete ao lado do produto desejado).
	* "Comprar" os produtos do carrinho (clicando em Checkout, inserindo informações de pagamento e depois clicando em Pay).
	* Remover alguns serviços da agenda (clicando no botão "Details" ao lado do serviço desejado e depois em "Delete").
	* Remover alguns animais (clicando no botão "Details" ao lado do animal desejado e depois em "Delete").
	* Deslogar (clicando no botão Logout no canto superior direito).
* Logar com a conta Username: admin / Password: admin.
	* Ver os usuários cadastrados e transformá-los em admin/não-admin pela checkbox dentro de Details (na aba Management, sub-aba Users).
	* Adicionar novos produtos no banco de dados (na aba Management, sub-aba Products, "New Product").
	* Editar e/ou deletar produtos criados.
	* Adicionar novos serviços no banco de dados (na aba Management, sub-aba Services, "New Service").
	* Editar e/ou deletar serviços criados.
	* Verificar as transações efetuadas (na aba Management, sub-aba Sales).
