# STEP 2

Here we are going to setup our API with an express server that is going to run in port 3000.

### Initialize our NPM project

First of all we are going to need to create a folder with the name **games-api** and run the command on your terminal:
```
npm init
```
Your are going to be prompt to enter some information and then you are going to be able to install your depencies.

### Installing dependencies and dev-depencies

You can run the following commands on your terminal, being inside the **games-api** folder:
```
npm i --save body-parser chalk cors debug dialogflow express express-asyncify node-mailer
npm i --save-dev nodemon
```

### Creating a sym-link for our database module

To create a sym-link, you need to open the **package.json** file, go to the **dependencies** section and add the following line:

 ```
...
"dependencies": {
    ...
    "games-db": "file:../games-db",
},
...
```
After this, you need to run the following command in your terminal:

```
npm install
```

### Package.json scripts

In scripts section inside package.json, we need to put the necessary scripts for start our server in development and production mode
 ```
...
"scripts": {
  "start": "NODE_ENV=production node server.js",
  "dev": "nodemon server.js"
},
...
```

### Make our server run

We need to create 2 files:
* **server.js:** This file is going to be responsible of turning on our server in the port 3000
* **v1/api.js:** This file defines all the express routes that we are going to see later

You can see the code we have in this files in this branch.
After setting up this 2 files, we can run the following command to test our server:

```
npm run dev
```

And with this we are done with **step 2** :D

# [GO TO STEP 3](https://github.com/jegarcia28/gapgent/tree/step/3)