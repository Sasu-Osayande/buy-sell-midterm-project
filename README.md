SASANIJEWLS MIDTERM PROJECT 
===========================

## SASANIJEWLS Buy/Sell App
SASANIJEWLS is a multi-page application built with Node, Express, JQuery, SASS and socket.io API. It allows users to shop for items, post an item for sale, mark as sold and delete their own item, favourite an item and message seller.   

## Final Project Screenshots 

### Featured page 
!["Screenshot of featured page"]()

### Shop all page 
!["Screenshot of shop all page"]()

### My shop page 
!["Screenshot of my shop page"]()

### Messaging feature
!["Screenshot of messaging feature"]()

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/users/login`
9. Use names 'Stefani' or 'Sasu' to log in

## Database

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds. 

## Dependencies

- NODE 10.x or above
- NPM 5.x or above
- PG 6.x
- CHALK 2.4.2
- COOKIE-SESSION 2.0.0
- DOTENV 2.0.0
- EJS 2.6.2
- EXPRESS 4.17.1
- JQUERY 3.6.0
- MORGAN 1.9.1
- SASS 1.35.1
- SOCKET.IO 4.4.1

## Authors

[Stefani Chhor] (https://github.com/scee10)
[Sasu Osayande] (https://github.com/Sasu-Osayande)

