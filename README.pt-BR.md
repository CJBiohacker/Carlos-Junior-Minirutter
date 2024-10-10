# Mini-Rutter-with-Shopify

Desenvolvido para um Teste Técnico de Seleção para a posição de Software Engineer (Remote, Brazil). Este projeto é um serviço de backend responsável por buscar os produtos e pedidos da plataforma simulada Rutter Shopify e salvá-los em um banco de dados de minha escolha (Banco de Dados NoSQL Firestore), seguindo estes [requisitos](https://rutterapi.notion.site/Public-Technical-Takehome-Question-aff80c5fa340451f99627d4f3ddab767).

# Tecnologias

| Tecnologia | Versão  |
| ---------- | ------- |
| Typescript | ^5.6.2  |
| NodeJS     | ^20.x.x |
| Express    | ^4.21.0 |
| Firebase   | ^10.9.0 |

# Pré-requisitos e Instalação

- Baixe ou configure a versão LTS do NodeJS (use o [Node Version Manager](https://github.com/nvm-sh/nvm)) para instalar a versão correta.
- Clone este repositório.
- Abra um terminal bash no repositório e execute o comando `npm i` ou `npm install` para instalar os pacotes.
- Assim que tudo estiver instalado, inicie o servidor local executando o comando `npm start` no nível "root".


## Estrutura de Diretórios

```txt
+---src
|   +---database
|   +---middleware
|   +---routes
|   +---services
|   +---tests
|   +---types
|   +---utils
|   app.ts
|   nodemon.json
.env (file created by the developer)
.gitignore
LICENSE
package.json
package-lock.json
README.md
tsconfig.json
```

# Como o Projeto funciona

O projeto atual adota uma estrutura modular, com configurações e serviços distribuídos em arquivos e pastas separadas. Como o Firestore foi o banco de dados escolhido para armazenar os dados buscados, temos um arquivo neste caminho `src/database/` contendo a conexão com o banco de dados através da [Biblioteca da Firebase API](https://firebase.google.com/docs/reference/node)

Para realizar essa conexão, precisamos criar um projeto no [Firebase Console](https://console.firebase.google.com/), criar um Banco de Dados Firestore via console e, em seguida, gerar uma nova chave privada para preencher as variáveis do arquivo `.env`.

O arquivo `.env` precisa ser criado no caminho raiz do projeto (veja a seção Estrutura de Diretórios acima), onde você preencherá os dados contidos na chave secreta `serviceAccount.json` gerada no console do Firebase. Confira [aqui](https://drive.google.com/file/d/1xvW682dnC873xTPQHdWelTmNTFO6AoMe/view?usp=sharing).

Este projeto utiliza Typescript para atender aos [requisitos](https://rutterapi.notion.site/Public-Technical-Takehome-Question-aff80c5fa340451f99627d4f3ddab767) de tipagem e para melhorar o tratamento de erros e a confiabilidade do código. Para melhorar a manutenção e a escalabilidade, a API é acessada por meio de rotas em `src/routes`, com uma rota para buscar os dados do Shopify e outra para buscar esses dados salvos no Firebase.

Como há uma conexão entre nossa API e o Banco de Dados Firestore, um middleware foi criado para lidar com a solicitação de dados armazenados. Isso adiciona uma camada extra de segurança e a possibilidade de escalar e/ou conectar com outros microsserviços.

Quando o projeto for executado, ele começará a buscar todos os Produtos e Pedidos (respeitando as restrições dos [requirements](https://rutterapi.notion.site/Public-Technical-Takehome-Question-aff80c5fa340451f99627d4f3ddab767)), verificando se já estão armazenados no Firestore e, caso não estejam, irá armazená-los. Após isso, haverá 2 rotas preparadas para buscar esses dados diretamente do Firestore, conforme mostrado na seção <a href='#restApi'>Instruções da API Rest</a>, onde você pode testar via [Postman](https://www.postman.com/) or [Inmsonia](https://insomnia.rest/download).

### Defining the .env file

O arquivo `.env` precisa respeitar este formato com as variáveis correspondentes, como mostrado abaixo:

```js
PORT=<value of the localhost port (node default is 3000)>

SHOPIFY_STORE_URL=<value of shopify store url>
SHOPIFY_ACCESS_TOKEN=<value of the shopify admin access token>
SHOPIFY_API_VERSION=<value of the api version in the YYYY-MM format>

FIREBASE_TYPE= <value of the type from your generated secret key>
FIREBASE_PROJECT_ID= <value of the project_id from your generated secret key>
FIREBASE_PRIVATE_KEY_ID=<value of the private_key_id from your generated secret key>
FIREBASE_PRIVATE_KEY= <value of the private_key from your generated secret key>
FIREBASE_CLIENT_EMAIL= <value of the client_email from your generated secret key>
FIREBASE_CLIENT_ID=<value of the client_id from your generated secret key>
FIREBASE_AUTH_URI=<value of the auth_uri from your generated secret key>
FIREBASE_TOKEN_URI=<value of the token_uri from your generated secret key>
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<value of the auth_provider_x509_cert_url from your generated secret key>
FIREBASE_CLIENT_X509_CERT_URL=<value of the client_x509_cert_url from your generated secret key>
FIREBASE_UNIVERSE_DOMAIN=<value of the universe_domain from your generated secret key>
FIREBASE_COLLECTION_1=<name of the collection to store Products created in the Firestore>
FIREBASE_COLLECTION_2=<name of the collection to store Orders created in the Firestore>
```

<h1 id="restApi" >Instruções da REST API</h1>

|  Metódo HTTP | Endpoint          | Parâmetros | Descrição                                                 |
| ----------- | ----------------- | ---------- | ----------------------------------------------------------- |
| `GET`     | `/api/products` | `Nenhum`   | Solicitação para buscar os Produtos armazenados no banco de dado. |
| `GET`     | `/api/orders`   | `Nenhum`   | Solicitação para buscar os Pedidos armazenados no banco de dado.   |
