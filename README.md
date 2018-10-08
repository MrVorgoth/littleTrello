"Little Trello" - for people who wants to have their own personal tasklist!

To run Little Trello you need to:
1) Make new project on FireBase
2) Create file called "firebase.config.js" under src/js/firebase.config.js
3) Copy all configuration info from FireBase project into file mentioned above. Example of file content:
// Initialize Firebase
  var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  };
  firebase.initializeApp(config);

4) In FireBase Console under Database create 3 collections called: todo, doing and done
5) In FireBase Console enable Email/Password, Google and Facebook Sing-in providers under "Authentication/Sign-in-method"
6) Next just run npm install, npm run build and npm start

Description:
Little Trello project comes with login and registration and creating tasklists. To make this project I used WebPack bundler, FireBase, SCSS with BEM methodology, React and Redux libraries

Note: This app is still under construction (it's usable, but I'm still adding some new features)