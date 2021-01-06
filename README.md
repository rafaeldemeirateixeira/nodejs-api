# NodeJS API
A small API written in NodeJS and TypeScript


## Setup
### 1 - Configure your dotenv file:
```
$ cp .env.example .env

Edit the .env file:

   DOCKER_SERVER_PORT=3000
   DB_CONNECTION=mysql
   DB_HOST=app_mysql
   DB_PORT=3306
   DB_USERNAME=root
   DB_DATABASE=<database name>
   DB_PASSWORD=secret
   DB_SHOW_SQL=false
   DB_VERSION=5.7
   JWT_SECRET=<your secret>
```

### 2 - Start Docker containers
```
$ docker-compose up -d --build
```

### 3 - Install the dependencies
```
$ docker-compose exec nodejs npm install
```

### 4 - Provisioning the database
```
//Migrations
$ docker-compose exec nodejs npx knex migrate:latest

//Seeders
$ docker-compose exec nodejs npx knex seed:run
```

### 5 - Run application
```
$ docker-compose exec nodejs npm run dev
```

### 6 - Use collection Postman to test the API
Import the collection into the Postman client [Collection](https://www.getpostman.com/collections/36825d4962e67c5e9c8f)

Test credentials:
```json
{
    "grant_type": "password",
    "email": "test@test.com",
    "password": "password"
}
```

### 7 - Reset database
To restart the database run:
```
$ docker-compose exec nodejs npm run reset
```

### 8 - Tests
In development!!! :)
