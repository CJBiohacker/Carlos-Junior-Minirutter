# Mini-Rutter-with-Shopify

Developed for a Technical Take-home Assignment from Rutter's job position of Software Engineer (Remote, Brazil). This project is a backend service responsible to fetch the products and orders from simulated Rutter shopify platform and saved it in a database of my choice (NoSQL Firetore Database) following these [requirements](https://rutterapi.notion.site/Public-Technical-Takehome-Question-aff80c5fa340451f99627d4f3ddab767).

# Technologies

| Technology | Version |
| ---------- | ------- |
| Typescript | ^5.6.2  |
| NodeJS     | ^20.x.x |
| Express    | ^4.21.0 |
| Firebase   | ^10.9.0 |

# Pre-requisites and Installation

- Download or set the LTS version of NodeJS (use the [Node Version Manager](https://github.com/nvm-sh/nvm)) to install the correct version.
- Clone this repository.
- Open a bash terminal in the repository and execute the command `npm i` or `npm install` to install the packages.
- Once everything is installed, start the local server by executing the command `npm start` in the "root" level.

## Directory Structure

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

# How the Project Works

The current project adopts a modular structure, with configuration and services spreaded in separate files and folders.
Since the Firestore was the chosen database to store the fetched data, we have a file in this path `src/database/` containing the connection to the database through the [Firebase API library](https://firebase.google.com/docs/reference/node).

To achieve this connection we need to create a project in [Firebase Console](https://console.firebase.google.com/), create a Firestore Database via console and then generate a new private key to fill the `.env` file variables.

The `.env` file needs to be created in the root path of the project (see the Directory Structure section above), where you will fill the data contained in the secret key `serviceAccount.json` generated in the Firebase console. Check [here](https://drive.google.com/file/d/1xvW682dnC873xTPQHdWelTmNTFO6AoMe/view?usp=sharing).

This project uses Typescript to achieve the type [requirements](https://rutterapi.notion.site/Public-Technical-Takehome-Question-aff80c5fa340451f99627d4f3ddab767) and for improved error treament plus coding reliability. To improve maintenance and scalability, the API is accessed via routes in `src/routes`, with one route to fetch the data from Shopify and another to fetch this date saved in Firebase.

Since there's a connection between our API and the Firestore Database, a middleware was created to handle the request of stored data. Adding another security layer and the possibility to scale and/or connect with another microservices.

When the project runs it will begin fetching all the Products and Orders (respecting the constraints of the [requirements](https://rutterapi.notion.site/Public-Technical-Takehome-Question-aff80c5fa340451f99627d4f3ddab767)), checking if it's already stored in Firestore and if not, will do it. After that there will be 2 routes prepared to fetch this data directly from Firestore as shown in the section `<a href='#restApi'>`Rest API Instructions`</a>` where you can test via [Postman](https://www.postman.com/) or [Inmsonia](https://insomnia.rest/download).

#### Defining the .env file

The .env file needs to respect this format with the correspondent variables, as it is below:

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

<h1 id="restApi" >REST API Instructions</h1>

| HTTP Method | Endpoint          | Parameters | Description                                                 |
| ----------- | ----------------- | ---------- | ----------------------------------------------------------- |
| `GET`     | `/api/products` | `None`   | Request to fetch the products stored in the database. |
| `GET`     | `/api/orders`   | `None`   | Request to fetch the orders stored in the database.   |
