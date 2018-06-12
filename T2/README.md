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
	- Admin.jsx - Página de adminstrador, onde é possivel ver e editar os usuários, produtos, serviços e as vendas.

	- DB.js - Implementação das funções do banco de dados utilizando Dexie (IndexedDB).

	- ForgotPassword.jsx - Página esqueceu a senha.

	- Header.jsx - Componente do Header da página.

	- Login.jsx - Página de Login (utilizada na navbar em mobile).

	- Main.jsx - Componente principal, realiza as chamadas para os outros componentes.

	- Products.jsx - Página para exibição dos produtos.

	- Profile.jsx - Página principal do usuário, onde é possivel ver o profile, editar os pets, ver o carrinho e os horários agendados.

	- Services.jsx - Página para exibição dos serviços.

	- Signup.jsx - Página para criar novo usuário.

Roteiro para teste do site:

- Tentar comprar um produto na aba Products (notar que aparecerá um aviso pedindo para logar antes)
- Tentar agendar um serviço na aba Services (notar que aparecerá um aviso pedindo para logar antes)
- Criar usuário (opção signup logo embaixo do campo "nome de usuário" no topo superior direito da página)
- Logar com o usuário criado (canto superior direito da página)
- Adicionar produtos ao carrinho, mudando as quantidades do mesmo produto adicionadas de uma vez (ir na aba products e clicar no botão "Buy" do produto desejado e escolher a quantidade desejada)
- Cadastrar animais (aba profile, sub-aba pets, clicar em "new pet")
- Agendar serviços para os animais cadastrados (aba Services, clicar no botão "Schedule" do serviço desejado, escolher data e hora)
- Ir para a aba Profile e vizualizar o carrinho de produtos e os serviços agendados
- Remover alguns produtos do carrinho (clicando no botão delete ao lado do produto desejado)
- Remover alguns serviços da agenda (clicando no botão "Details" ao lado do serviço desejado e depois em "Delete")
- Remover alguns animais (clicando no botão "Details" ao lado do animal desejado e depois em "Delete")
