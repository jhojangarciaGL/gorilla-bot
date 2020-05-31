# STEP 1

Here we are going to create our database module with sequelize.
For that we are going to need to install some dependencies

### Installing dependencies

```
npm i --save chalk debug defaults inquirer minimist mysql2 sequelize
```

### Package.json scripts

In scripts section inside package.json, we need to put the necessary scripts for creating our MySQL database.
 ```
...
"scripts": {
  "setup": "node setup.js --yes"
},
...
```

### Create our tables and the functions to use those.

We are going to create 2 main folder:
* **models:** In this folder we are going to create all the tables needed for our application as JS files. We are going to use sequelize to map the table and field names
* **lib:** In this folder we are going to create the instance of our sequelize module and create all the function realted to all the database tables to CREATE, READ, UPADTE or DELETE.


### Execute the npm script to create our database

Finally you are going to create your database. For this, make sure you have your MySQL (Or whatever database you are going to use) service up, and the run the following script in your terminal:
```
npm run setup
```

And with this we are done with **step 1** :D

# [GO TO STEP 2](https://github.com/jhojangarciaGL/gorilla-bot/tree/step/2)