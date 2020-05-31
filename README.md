# FINAL STEP

Here we are going to create our front end project with vue.js

### Installing vue CLI

We need to download the CLI to create an empty project for vue.js. You can installit it following the steps [here](https://cli.vuejs.org/).
After download it, you can run the following script, being in the root of the project structure:
```
vue create games-web
```


### Installing our dependencies

Vue CLI is going to start an empty project with only the vue CORE module. In this project we are going to use:
* Vuex: This is for handle centralized states
* Bulma: This is not Veggeta's wife.. Is just a CSS framework we are going to use
* Vue-router: This is for handle routes
* Axios: This is to do http requests to our API server

To install these dependencies just run the following script:
```
npm i --save axios bulma vue-router vuex
```

### Creating our frot end loyout and configuring vuex

First of all we need to delete the generated file on the **components/** folder, so we can start creating our custom components.
We are going to have 1 folder and multiple files inside **components/** folder:
* **layout/:** In this folder we are going to have the Header of our app.
* **Chat.vue:** This is our main file, the requiered by the router file. Here we are going to define the logic to send messages to our Vuex storage
* **Message.vue:** This the layout to define the bubble messages
* **User.vue:** This is the layour where we are going to show the user that is chatting with out bot
You can see the code for this components in this branch.

After that, we are going to modify our **main.js** so it can use our router and storage. To do this we need to create 2 files in the root of our vue project:
* **store.js:** File to use our vuex storage
* **routes.js:** FIle to handle our routes
 After creating those you need to include the files in **main.js** and go to the instance of vue at the end of the file and modify it like this:

```
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
```
Note the **router** and **Store** keys. You can see the code of these files in this branch.

### Running our project

After creating our store, routes and layout we are now able to run our server. To do this just open a terminal, navigate to the **games-web** folder and execute the following command:
```
npm run dev
```
This is going to start a server on the 8080 port, you can access it via web browser typing **http://localhost:8080**.



If you have run all the steps in order and you have the API server running, the ngrok up, the HTTPS URL that ngrok provides in the dialogflow fulfillment section and the vue.js app running in the 8080 port, you are now able to start chatting with the agent.


# This is the END