## Introduction
Welcome to Cinema SEA, the rising star in the movie theater industry! With our app, you can effortlessly browse through an extensive collection of movies at your fingertips. Enjoy the convenience of selecting showtimes, choosing your preferred seats, and securing your reservations in a matter of seconds. Say goodbye to waiting in line and hello to a seamless moviegoing experience!

## Configuration for environment variables
If you need it fast, you can follow my installation steps (after this section) and just copy it, I put the source-code of the `.env` files there. Or you just can copy the `.env.example` file to your new `.env` file, there is two `.env.example` file, that is located in the root folder, and on the react folder, just copy it and paste it in your `.env` file.

## BEFORE CONTINUING
It is recommended to ensure that you have PHP, Composer, and Laravel properly installed and set up before proceeding with the project. There are various resources available that provide detailed instructions on installing these dependencies. One common approach is to use XAMPP, which simplifies the installation process.

Please note that setting up the development environment may vary depending on your operating system and personal preferences. It is important to choose a method that aligns with your requirements and follow the appropriate installation instructions.

## Installation
1. Clone Repository
```
git clone https://github.com/gibranfsh/cinema-sea-fullstack.git
```

2. Move to the folder
```
cd cinema-sea-fullstack
```

3. Open a new terminal
```
start cmd
```

### Terminal 1 (root)
4. Before continuing, configure the environment variables (.env) file, you can copy and paste it
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=main
# DB_USERNAME=root
# DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

5. Back to the terminal, install the node_modules and stuff
```
npm run dev
```

6. Then run the migration
```
php artisan migrate
```

7. Back to the terminal, Run the Laravel backend service
```
php artisan serve
```

### Terminal 2 (react folder)
8. Move to the react folder
```
cd react
```

9. Configure the environment variables (.env) file, you can copy and paste it
```
VITE_API_BASE_URL=http://localhost:8000
```

10. Install the dependencies
```
npm install
```

11. Run the client application
```
npm run dev
```

12. The application is ready to be used.

## Database
I use sqlite for the database, if you want to look inside the database you can use something like DB Browser for sqlite or DB Viewer, but I recommend to use DB Browser if you want to look inside the database (you can see tables, etc). You can open the database.sqlite (located inside the root database folder) file with it. But make sure you have configure your environment variables

# API Documentation
## Table of Contents

- [Authentication](#authentication)
  - [Register a User](#register-a-user)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
- [Users](#users)
  - [Get User Details](#get-user-details)
  - [Create a User](#create-a-user)
- [Seats](#seats)
  - [Create a Seat](#create-a-seat)
  - [Get Seats by Movie ID](#get-seats-by-movie-id)
  - [Update a Seat](#update-a-seat)
- [Tickets](#tickets)
  - [Create a Ticket](#create-a-ticket)
  - [Get Tickets by User ID](#get-tickets-by-user-id)
  - [Delete a Ticket](#delete-a-ticket)

## Authentication

### Register a User

- URL: `/register`
- Method: `POST`
- Description: Register a new user.
- Request Body:
  - `name` (string): The name of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password for the user.

### User Login

- URL: `/login`
- Method: `POST`
- Description: Authenticate user and generate an access token.
- Request Body:
  - `email` (string): The email address of the user.
  - `password` (string): The password for the user.

### User Logout

- URL: `/logout`
- Method: `POST`
- Description: Invalidate the user's access token and log them out.

## Users

### Get User Details

- URL: `/users/{id}`
- Method: `GET`
- Description: Get details of a specific user.
- Request Parameters:
  - `id` (integer): The ID of the user.

### Create a User

- URL: `/users`
- Method: `POST`
- Description: Create a new user.
- Request Body:
  - `name` (string): The name of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password for the user.

## Seats

### Create a Seat

- URL: `/seats`
- Method: `POST`
- Description: Create a new seat.
- Request Body:
  - `movie_id` (integer): The ID of the movie associated with the seat.
  - `seat_number` (string): The seat number.

### Get Seats by Movie ID

- URL: `/seats/{movie_id}`
- Method: `GET`
- Description: Get all seats for a specific movie.
- Request Parameters:
  - `movie_id` (integer): The ID of the movie.

### Update a Seat

- URL: `/seats/{movie_id}`
- Method: `PUT`
- Description: Update the details of a seat.
- Request Parameters:
  - `movie_id` (integer): The ID of the movie associated with the seat.
- Request Body:
  - `seat_number` (string): The updated seat number.

## Tickets

### Create a Ticket

- URL: `/tickets`
- Method: `POST`
- Description: Create a new ticket.
- Request Body:
  - `user_id` (integer): The ID of the user who ordered the ticket.
  - `movie_id` (integer): The ID of the movie associated with the ticket.
  - `date` (string): The date of the ticket.
  - `time` (string): The time of the ticket.
  - `seats` (array): An array of seat numbers.
  - `total_price` (numeric): The total price of the ticket.

### Get Tickets by User ID

- URL: `/tickets/{user_id}`
- Method: `GET`
- Description: Get all tickets for a specific user.
- Request Parameters:
  - `user_id` (integer): The ID of the user.

### Delete a Ticket

- URL: `/tickets/{id}`
- Method: `DELETE`
- Description: Delete a specific ticket.
- Request Parameters:
  - `id` (integer): The ID of the ticket.

