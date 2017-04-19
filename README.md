<<<<<<< HEAD
# Articles App

This app provides the following API's to get the articles info stored in the database.

GET Articles

  * JSON - list all the documents in articlesdb
`http://localhost:3000/api/articles`

GET Coauthors

  * Matrix - shows the html view of the matrix of coauthors matrix
`http://localhost:3000/api/coauthors/matrix`

  * JSON - shows the JSON object of the coauthors matrix
`http://localhost:3000/api/coauthors/json`

## Dependencies

Run `npm install` to install the dependencies in the local node_modules folder.

## Development server

Run `node server.js` for a server. Navigate to `http://localhost:3000/`. 

Run `npm run dev` for a dev server. The app will automatically reload if you change any of the source files.

## Database

Run `./setup/import.sh ./data/articles.json` to create and initialize the mongodb collection for the project.
=======
# apps
>>>>>>> 8c4e28bf04a71485ee9bd3e7f9564dd5c8ccab23
