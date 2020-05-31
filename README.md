# STEP 3

Here we are going to setup our express routes to receive messages from the front end, send those to dialogflow, handle the webhook request, and return a response.

### Setup Dialogflow

First of all we need to setup our dialogflow module to access our bot. You can go to your dialogflow Agent, and click on the services account to generate a JSON file that you are going to need to provice to the module like this (You can see the code on **v1/api.js**): 

```
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./keyFileName.json"
})
```

### Setup database connection

We need to create a middleware that is going to initialize our database service (You can see the code on **v1/api.js**):
```
let services, Game, Site, Tournament, User, TournamentSite, TournamentUser
api.use('*', async (req, res, next) => {
    if (!services) {
        console.log('Connecting to database')
        try {
            services = await db(config.db)
        } catch (e) {
            return next(e)
        }
        console.log('Done connecting to database')
        Game = services.Game
        Site = services.Site
        Tournament= services.Tournament
        User = services.User
        TournamentSite = services.TournamentSite
        TournamentUser = services.TournamentUser
    }
    next()
})
```

### Setup our routes

We are going to create our routes inside the **v1/api.js** file:

```
Route: v1/api/donkeyKong
Method: POST
Params: <Dialogflow payload>
Description: This route is for handle all the webhook calls from dialogflow
```
```
Route: v1/api/sendMessage
Method: POST
Params: {
    sessionId: String,
    msg: String,
    lang: String
}
returns: <Dialogflow payload>
Description: This route is being called by the front end to send our messages to Dialogflow.
```

### Importing our webhook logic

We are going to create a folder called **flows/**. Here we are going to put all of our actions from dialogflow and do our custom logic. The files we are going to create for this project are:
* createTournament.js: This is the logic to create a tournament.
* getGames.js: Validates if the site written exists and return a list of games.
* tournamentList.js: Returns a list of tournaments where people can register.
* validateEmail.js: Checks if email written is correct and has the gorillalogic.com domain.
* validateTournament.js: Checks if the tournament name written exists in the database.

All these functions are going to be executed inside the webhook method (**v1/api/donkeyKong**). You can see the code in **v1/api.js**

### Creating an utility file

We are going to need some utility functions for some actions. We need to create a folder called **utils** with an **index.js** file inside. You can see the code on this branch. The function there are:
* sendMail: Sends an email using nodemailer module.
* validateSite: Returns a site by his name.
* parseDates: Returns dates in forma YYYY-MM-DD.
* validateMail: Validate that the given mail has the gorillalogic.com domain and has a correct email format.


### Creating our "internacionalization" script (i18n)

Since we can have our bot in English or Spanish, we need to have the texts in both languages. For that we need to create a file inse **utils/** called **i18n.js**.
This function is going to return our texts and its going to be used for the webhook actions. You can see the code in this branch


### Run our server

Remember to safe all your files ( ͡° ͜ʖ ͡°). Run the following script:

```
npm run dev
```

### Using NGROK to expose our server

Dialogflow needs to acces our webhook via HTTPS. We are not going to deploy our code, but we ca use NGROK to expose our services. You can download NGROK clicking [here](https://ngrok.com/download).
After downloading, you can open a terminal, navigate where you save the ngrok file and run the following command:
```
ngrok http 3000
```
Copy the HTTPS route (no the http one), go to the dialogflow console and paste it inside the fulfillment tab. (remember to save again ( ͡° ͜ʖ ͡°))


And with this we are done with **step 2** :D

# [GO TO STEP 4](https://github.com/jegarcia28/gapgent/tree/step/4)