# Introdução ao desenvolvimento WEB
## Hypertext Transfer Protocol
O HTTP é o protocolo da camada de aplicação do modelo OSI utilizado para transferencia de documentos de hipermidia, como o HTML. Foi desenvolvido para a comunicação de web browser e servidores, segue o modelo clássico cliente-servidor. É um protocolo *connectionless* e *stateless* (que não mantém nenhum dado entre os requests) e baseado na conecção (quando uma mensagem http é enviada e recebida por completo, *request* e *response*, a conecção **TCP/IP** é fechada).

O tipo de dados é definido pelo campo *content-type* no Header, cujo propósito é descrever os dados contidos no corpo da resposta ou requisição.

## Tipos de requisições HTML
* **GET**: Requisita um representação do recurso especificado (O mesmo recurso pode ter várias representações, ao exemplo de serviços que retornam XML e JSON).
* **HEAD**: Retorna os cabeçalhos de uma resposta (sem o corpo contendo o recurso)
* **POST**: Envia uma entidade e requisita que o servidor aceita-a como subordinada do recurso identificado pela URI.
* **PUT**: Requisita que um entidade seja armazenada embaixo da URI fornecida. Se a URI se refere a um recurso que já existe, ele é modificado; se a URI não aponta para um recurso existente, então o servidor pode criar o recurso com essa URI.
* **DELETE**: Apaga o recurso especificado.
* **TRACE**: Ecoa de volta a requisição recebida para que o cliente veja se houveram mudanças e adições feitas por servidores intermediários.
* **OPTIONS**: Retorna os métodos HTTP que o servidor suporta para a URL especificada.
* **CONNECT**: Converte a requisição de conexão para um túnel TCP/IP transparente, usualmente para facilitar comunicação criptografada com SSL (HTTPS) através de um proxy HTTP não criptografado.
* **PATCH**: Usado para aplicar modificações parciais a um recurso.
