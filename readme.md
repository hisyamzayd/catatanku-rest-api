# Catatanku (Rest API)
REST API for 'Catatanku' android app [catatanku-android](https://github.com/hisyamzayd/catatanku-android).
Try now at https://catatanku-zayd.herokuapp.com/ or get along with this setup for local use.

## Getting Started
Explaining each step from get a copy of project and running on your local machine. 

### Prerequisites
You should familiar with :
* Basic programming knowledge.
* Basic Javascript.
* SQL command for Create, Insert, Update, & Delete (CRUD) data ([SQL Tutorial](https://www.w3schools.com/sql/)).
* Basic Node.js command.

### Installing Tools
Tools you need to install :
* [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [PostgreSQL](https://www.postgresql.org/download/) - free and open-source relational DBMS (without any extension).
* [Postman](https://www.postman.com/) or any other API client for testing tools.

Check if already installed
```sh
$ node -v
$ npm -v
$ psql -V #if this command not emerge, set psql on OS environment first
```

### Set Up Database with PostgreSQL
1. Set up password, and port used for PostgreSQL (include in install of PostgreSQL).
2. Enter PostgreSQL CLI command.
    ```sh
    $ psql -U postgres #then enter your password
    ```
3. Create a new user.
    ```sh
    $postgres=# CREATE ROLE user_name WITH LOGIN PASSWORD 'user_password';
    ```
4. Set up roll for user so it can create database.
    ```sh
    $postgres=# ALTER ROLE user_name CREATEDB; #dont forget the semicolon
    ```
5. Login with the user you just created.
    ```sh
    $postgres=# \q #quit
    $ psql -d postgres -U user_name #then enter user_password
    ```
6. Create a database 'catatanku'.
    ```sh
    $postgres=> CREATE DATABASE catatanku; #database_name
    ```
7. Lets connect into database.
    ```sh
    $postgres=> \c catatanku
    You are now connected to database "catatanku" as user "user_name".
    ```
8. Create 'catatan' table with 4 column = ID* (Int), judul (String), isi (String), waktu (Timestamp).
    ```sh
    $catatanku=> CREATE TABLE catatan (
    $catatanku)> ID SERIAL PRIMARY KEY,
    $catatanku)> judul VARCHAR(30),
    $catatanku)> isi VARCHAR(200),
    $catatanku)> waktu TIMESTAMP DEFAULT NOW()
    $catatanku)> );
    ```
9. Insert example data into 'catatan' table.
    ```sh
    $catatanku=> INSERT INTO catatan (judul, isi) VALUES ('title example', 'this is my first note in PostgreSQL');
    ```
10. Read example data from table.
    ```sh
    $catatanku=> SELECT * FROM catatan;
    ```
    and you will see data already inserted into database. Database set DONE 😛.

### Installing Node Packages
1. Clone or download this app.
2. Install all dependencies packages ([package.json](package.json)) :
[Express](https://expressjs.com/) - Node.js web framework,
[Nodemon](https://www.npmjs.com/package/nodemon) - Automatically restart node app after certain changes, &
[node-postgres](https://www.npmjs.com/package/pg) - Non-blocking PostgreSQL client for Node.js.
    ```sh
    $ npm install
    ```

### Connecting to Database
Open [catatan_routes.js](catatan_routes.js) and uncomment and comment these code. User based on your own configuration.
```js
//uncomment this for local use
user: 'your_name',
host: 'localhost',
database: 'catatanku',
password: 'your_password',
port: your_port

// //comment this if use local instead
// connectionString: process.env.DATABASE_URL,
// ssl: {
//     rejectUnauthorized: false
// }
```
Now you're all set 🔥.

## Running the Program
1. Start node with command 'npm start'.
    ```sh
    $ npm start
    ```
2. Open match your url : localhost:your_port/.
3. Follow along the instruction for each endpoint on welcome screen. 👍

## Contributing
Feel free to contributing with pull requests.

## Special Thanks to..
* [Tania Rascia](https://github.com/taniarascia) for awesome simple Node.js, Express, and Postgres [tutorial](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/).
* [Musliadi](https://medium.com/@musliadi) for brief explanation about [request in node.js](https://medium.com/@musliadi/apa-perbedaan-req-body-req-params-req-query-pada-nodejs-eb3450914447).
* [Stackoverflow](https://stackoverflow.com) for always be there.. 

## Furthermore Read
* Deploy this project into [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true).
* Using middleware in [Express](https://expressjs.com/en/guide/using-middleware.html).
* PostgreSQL tutorial [postgresqltutorial.com](https://www.postgresqltutorial.com/).