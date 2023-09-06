# Personal Library
This project allows users to browse and save books to a list. It was made using PostgreSQL, Express, React and Node. It uses the google books API to access a their catalogue of books, and Firebase Authentication to keep track of users. It allows users to browse and save books to a list. My motivation for this project was to learn how to make a fullstack application from scratch, from programming to hosting.

# Running the project
You can check out this project on [personal-library.me](https://www.personal-library.me). If you want to run this project locally, you will need to set the following environment variables
## Firebase
These environment variables are for accessing firebase's authentication service. You can get your own set at https://firebase.google.com/
```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```
## Postrge
These define credentials for accessing a postgreSQL database
```
PGUSER
PGPASSWORD
PGHOST
PGPORT
PGDATABASE
```
## Node Server
These define where the node server is hosted
```
REACT_APP_SERVERHOST
REACT_APP_SERVERPORT
```
After setting the environment variables, you can run the frontend by running
```npm start``` on the Client folder.
And you can run the backend by running ```node index.js``` on the Server folder.
